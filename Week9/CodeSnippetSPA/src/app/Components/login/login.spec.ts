import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { vi } from 'vitest';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    // Vitest uses vi.fn() instead of jasmine.createSpyObj
    authSpy = { loginUser: vi.fn().mockResolvedValue(undefined) };
    routerSpy = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, Login],
      providers: [
        { provide: Auth, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should start with an invalid form', () => {
    expect(component.loginForm.invalid).toBe(true); // Fixed
  });

  it('should validate email and password properly', () => {
    component.email.setValue('invalid-email');
    component.password.setValue('123');
    expect(component.loginForm.invalid).toBe(true); // Fixed

    component.email.setValue('test@example.com');
    component.password.setValue('password123');
    expect(component.loginForm.valid).toBe(true); // Fixed
  });

  it('should trigger login process when form is filled', () => {
    component.email.setValue('test@example.com');
    component.password.setValue('password123');
    component.login();
    expect(authSpy.loginUser).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should clear form when reset is called', () => {
    component.email.setValue('test@example.com');
    component.reset();
    expect(component.email.value).toBeFalsy();
  });
});