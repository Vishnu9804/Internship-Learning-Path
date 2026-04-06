import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSnippet } from './create-snippet';
import { Db } from '../../services/db';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { vi } from 'vitest';

describe('CreateSnippet', () => {
  let component: CreateSnippet;
  let fixture: ComponentFixture<CreateSnippet>;
  let dbSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    dbSpy = { createSnippet: vi.fn().mockResolvedValue(undefined) };
    routerSpy = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CreateSnippet],
      providers: [
        { provide: Db, useValue: dbSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSnippet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ... keep imports and beforeEach exactly the same ...

  it('should create the snippet component', () => {
    expect(component).toBeTruthy();
  });

  it('should require a title and code snippet', () => {
    expect(component.createForm.valid).toBe(false); // Fixed
    component.title.setValue('My Test Snippet');
    component.code.setValue('console.log("Hello World!");');
    expect(component.createForm.valid).toBe(true); // Fixed
  });

  it('should attempt to save to the database when form is valid', async () => {
    component.title.setValue('My Test Snippet');
    component.code.setValue('console.log("Hello");');
    await component.save();
    expect(dbSpy.createSnippet).toHaveBeenCalled();
  });
});