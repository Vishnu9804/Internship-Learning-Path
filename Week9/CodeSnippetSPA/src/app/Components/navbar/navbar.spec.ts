import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { Auth } from '../../services/auth';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let authSpy: any;

  beforeEach(async () => {
    authSpy = {
      isAuthenticated: vi.fn().mockReturnValue(false),
      logout: vi.fn().mockResolvedValue(undefined)
    };

    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        { provide: Auth, useValue: authSpy },
        provideRouter([]) // Fixes missing Router error
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the navbar', () => {
    expect(component).toBeTruthy();
  });

  it('should check if the user is authenticated on load', () => {
    expect(authSpy.isAuthenticated).toHaveBeenCalled();
  });
});