import { Injectable, signal, effect, computed } from '@angular/core';
import { UserProfile, LEVELS } from '../models/types';

@Injectable({ providedIn: 'root' })
export class GamificationService {
  private readonly STORAGE_KEY = 'gamified_profile';

  // State managed via Angular Signals
  profile = signal<UserProfile>(this.loadProfile());

  // Computed values
  currentLevel = computed(() => {
    const pts = this.profile().points;
    return LEVELS.find(l => pts >= l.minPoints)?.title || 'Procrastinator';
  });

  currentMultiplier = computed(() => {
    const streak = this.profile().streak;
    if (streak >= 7) return 2.0;
    if (streak >= 3) return 1.5;
    return 1.0;
  });

  constructor() {
    this.checkStreakOnLoad();

    // Auto-save to localStorage whenever the profile signal changes
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.profile()));
      }
    });
  }

  recordTaskCompletion(priority: 'High' | 'Medium' | 'Low') {
    const basePoints = priority === 'High' ? 50 : priority === 'Medium' ? 30 : 10;
    const today = this.getTodayStr();
    const p = this.profile();
    
    let newStreak = p.streak;
    if (p.lastActiveDate !== today) {
      newStreak++; // First task of the day
    }

    // Recalculate multiplier with new streak
    const multiplier = newStreak >= 7 ? 2 : (newStreak >= 3 ? 1.5 : 1);
    const earnedPoints = Math.round(basePoints * multiplier);

    const updatedHistory = { ...p.history };
    updatedHistory[today] = (updatedHistory[today] || 0) + 1;

    this.profile.update(current => ({
      ...current,
      points: current.points + earnedPoints,
      streak: newStreak,
      lastActiveDate: today,
      history: updatedHistory
    }));
  }

  buyStreakFreeze() {
    const cost = 500;
    if (this.profile().points >= cost) {
      this.profile.update(p => ({
        ...p,
        points: p.points - cost,
        streakFreezes: p.streakFreezes + 1
      }));
    }
  }

  private checkStreakOnLoad() {
    const p = this.profile();
    if (!p.lastActiveDate) return;

    const today = new Date();
    const lastActive = new Date(p.lastActiveDate);
    
    // Calculate difference in days (ignoring time)
    const diffTime = Math.abs(today.setHours(0,0,0,0) - lastActive.setHours(0,0,0,0));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      // User missed at least one day
      if (p.streakFreezes > 0 && diffDays === 2) {
        // Automatically consume a freeze if they missed exactly yesterday
        this.profile.update(curr => ({
          ...curr,
          streakFreezes: curr.streakFreezes - 1,
          lastActiveDate: this.getYesterdayStr() // Bridge the gap
        }));
      } else {
        // Streak broken
        this.profile.update(curr => ({ ...curr, streak: 0 }));
      }
    }
  }

  private loadProfile(): UserProfile {
    // Check if we are running in the browser before accessing localStorage
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    }
    
    // Default return if on the server or no save exists
    return { points: 0, streak: 0, lastActiveDate: null, streakFreezes: 0, history: {} };
  }

  private getTodayStr(): string {
    return new Date().toISOString().split('T')[0];
  }

  private getYesterdayStr(): string {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  }
}