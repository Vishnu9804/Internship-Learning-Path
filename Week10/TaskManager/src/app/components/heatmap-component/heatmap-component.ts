import { NgStyle } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';

@Component({
  selector: 'app-heatmap',
  imports: [NgStyle],
  templateUrl: './heatmap-component.html',
  styleUrl: './heatmap-component.css',
})
export class HeatmapComponent {
  @Input() set history(val: Record<string, number>) {
    this._history.set(val);
  }
  
  private _history = signal<Record<string, number>>({});

  days = computed(() => {
    const result = [];
    const hist = this._history();
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      result.push({ date: dateStr, count: hist[dateStr] || 0 });
    }
    return result;
  });

  getColor(count: number): string {
    if (count === 0) return '#161b22';
    if (count <= 2) return '#0e4429';
    if (count <= 4) return '#006d32';
    if (count <= 6) return '#26a641';
    return '#39d353';
  }
}
