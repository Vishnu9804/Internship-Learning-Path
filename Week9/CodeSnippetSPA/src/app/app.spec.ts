import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { Auth } from './services/auth';
import { Db } from './services/db';
import { vi } from 'vitest';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        // Stop Firebase from booting up in the main app wrapper
        { provide: Auth, useValue: { isAuthenticated: vi.fn().mockReturnValue(false), getUid: vi.fn() } },
        { provide: Db, useValue: {} }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});