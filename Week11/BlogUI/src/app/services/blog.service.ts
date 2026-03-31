import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Post } from '../models/post.model';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private storageKey = 'blog_posts_db';
  private postsSubject = new BehaviorSubject<Post[]>([]);

  private defaultPosts: Post[] = [
    { id: 1, title: 'Getting Started with Angular', summary: 'Learn the basics of Angular 17+.', content: 'Angular is a platform for building mobile and desktop web applications. In this post, we explore standalone components and signals.', date: '2026-03-25' },
    { id: 2, title: 'Mastering Web Accessibility', summary: 'Why ARIA matters.', content: 'Accessibility ensures your website can be used by everyone. Semantic HTML should always be your first choice, followed by ARIA attributes when native elements fall short.', date: '2026-03-28' },
    { id: 3, title: 'State Management Simplified', summary: 'Global state concepts explained.', content: 'Managing state across an application can be tricky. Using services and RxJS BehaviorSubjects in Angular provides a robust way to share data like user sessions or themes.', date: '2026-03-30' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeDatabase();
  }

  private initializeDatabase() {
    if (isPlatformBrowser(this.platformId)) {
      const savedData = localStorage.getItem(this.storageKey);
      if (savedData) {
        this.postsSubject.next(JSON.parse(savedData));
      } else {
        this.postsSubject.next(this.defaultPosts);
        this.saveToStorage(this.defaultPosts);
      }
    } else {
      this.postsSubject.next(this.defaultPosts);
    }
  }

  private saveToStorage(posts: Post[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(posts));
    }
  }

  // --- READ ---
  getPosts(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  getPostById(id: number): Observable<Post | undefined> {
    const currentPosts = this.postsSubject.value;
    return of(currentPosts.find(p => p.id === id));
  }

  // --- CREATE ---
  addPost(postData: Omit<Post, 'id' | 'date'>) {
    const current = this.postsSubject.value;
    // Generate a new ID based on the highest existing ID
    const newId = current.length > 0 ? Math.max(...current.map(p => p.id)) + 1 : 1;
    // Format today's date
    const today = new Date().toISOString().split('T')[0];
    
    const newPost: Post = { ...postData, id: newId, date: today };
    const updated = [newPost, ...current]; // Add to top of list
    
    this.postsSubject.next(updated);
    this.saveToStorage(updated);
  }

  // --- UPDATE ---
  updatePost(updatedPost: Post) {
    const current = this.postsSubject.value;
    const updated = current.map(p => p.id === updatedPost.id ? updatedPost : p);
    
    this.postsSubject.next(updated);
    this.saveToStorage(updated);
  }

  // --- DELETE ---
  deletePost(id: number) {
    const current = this.postsSubject.value;
    const updated = current.filter(p => p.id !== id);
    
    this.postsSubject.next(updated);
    this.saveToStorage(updated);
  }
}