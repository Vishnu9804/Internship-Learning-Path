import { TestBed } from '@angular/core/testing';
import { Auth } from './auth';
import { Router } from '@angular/router';
import { vi } from 'vitest';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(), onAuthStateChanged: vi.fn(), createUserWithEmailAndPassword: vi.fn(), signInWithEmailAndPassword: vi.fn(), signOut: vi.fn()
}));

describe('Auth', () => {
  let service: Auth;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ Auth, { provide: Router, useValue: { navigate: vi.fn() } } ]
    });
    service = TestBed.inject(Auth);
  });
  it('should be created', () => { expect(service).toBeTruthy(); });
});