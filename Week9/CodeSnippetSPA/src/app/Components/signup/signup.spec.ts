import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Signup } from './signup';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { vi } from 'vitest';

describe('Signup', () => {
  let component: Signup;
  let fixture: ComponentFixture<Signup>;
  let authSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    authSpy = { registerUser: vi.fn().mockResolvedValue(undefined) };
    routerSpy = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, Signup],
      providers: [
        { provide: Auth, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Signup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the signup component', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger registration when valid', () => {
    component.email.setValue('newuser@example.com');
    component.password.setValue('securepassword');
    component.register();
    expect(authSpy.registerUser).toHaveBeenCalledWith('newuser@example.com', 'securepassword');
  });

  it('should reset inputs when reset() is triggered', () => {
    component.email.setValue('newuser@example.com');
    component.reset();
    expect(component.password.value).toBeFalsy();
  });
});