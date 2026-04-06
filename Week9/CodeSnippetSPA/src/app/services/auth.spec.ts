import { TestBed } from '@angular/core/testing';
import { Auth } from './auth';
import { Router } from '@angular/router';
import { vi, Mock } from 'vitest';
import * as firebaseAuth from 'firebase/auth';

// Intercept all Firebase Auth functions
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  onAuthStateChanged: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn()
}));

// Helper to wait for internal promise chains to finish
const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

describe('Auth Service', () => {
  let service: Auth;
  let routerSpy: any;

  beforeEach(() => {
    routerSpy = { navigate: vi.fn() };
    
    // Suppress console logs and alerts during testing
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    TestBed.configureTestingModule({
      providers: [
        Auth, 
        { provide: Router, useValue: routerSpy }
      ]
    });
    service = TestBed.inject(Auth);
  });

  it('should be created', () => { 
    expect(service).toBeTruthy(); 
  });

  it('should return correct authentication state', () => {
    expect(service.isAuthenticated()).toBe(false);
    expect(service.getUid()).toBeNull();

    // Manually set signal to simulate being logged in
    service.uid.set('fake-user-id');
    
    expect(service.isAuthenticated()).toBe(true);
    expect(service.getUid()).toBe('fake-user-id');
  });

  describe('Registration', () => {
    it('should register a user, sign them out, and navigate to login', async () => {
      const createMock = firebaseAuth.createUserWithEmailAndPassword as Mock;
      const signOutMock = firebaseAuth.signOut as Mock;
      
      createMock.mockResolvedValue({ user: { uid: '123' } });
      signOutMock.mockResolvedValue(undefined);

      service.registerUser('test@test.com', 'password');
      await flushPromises();

      expect(createMock).toHaveBeenCalled();
      expect(signOutMock).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should handle registration errors and trigger an alert', async () => {
      const createMock = firebaseAuth.createUserWithEmailAndPassword as Mock;
      createMock.mockRejectedValue(new Error('Email already in use'));

      service.registerUser('test@test.com', 'password');
      await flushPromises();

      expect(window.alert).toHaveBeenCalled();
    });
  });

  describe('Login', () => {
    it('should login a user and navigate to home', async () => {
      const signInMock = firebaseAuth.signInWithEmailAndPassword as Mock;
      signInMock.mockResolvedValue({ user: { uid: '123' } });

      service.loginUser('test@test.com', 'password');
      await flushPromises();

      expect(signInMock).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should handle login errors and trigger an alert', async () => {
      const signInMock = firebaseAuth.signInWithEmailAndPassword as Mock;
      signInMock.mockRejectedValue({ code: 'auth/wrong-password', message: 'Wrong password' });

      service.loginUser('test@test.com', 'password');
      await flushPromises();

      expect(window.alert).toHaveBeenCalled();
    });
  });

  describe('Logout', () => {
    it('should log the user out and navigate to login', async () => {
      const signOutMock = firebaseAuth.signOut as Mock;
      signOutMock.mockResolvedValue(undefined);

      service.logout();
      await flushPromises();

      expect(signOutMock).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
    
    it('should handle logout errors silently', async () => {
      const signOutMock = firebaseAuth.signOut as Mock;
      signOutMock.mockRejectedValue(new Error('Logout failed'));

      service.logout();
      await flushPromises();
      // Test passes if it handles the rejection without crashing
      expect(signOutMock).toHaveBeenCalled();
    });
  });
});