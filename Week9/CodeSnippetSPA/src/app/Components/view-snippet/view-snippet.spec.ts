import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewSnippet } from './view-snippet';
import { Db } from '../../services/db';
import { ActivatedRoute } from '@angular/router';
import { vi } from 'vitest';

describe('ViewSnippet', () => {
  let component: ViewSnippet;
  let fixture: ComponentFixture<ViewSnippet>;
  let dbSpy: any;

  beforeEach(async () => {
    dbSpy = {
      getSnippetById: vi.fn().mockResolvedValue({ title: 'Test', code: 'console.log("test");' })
    };

    await TestBed.configureTestingModule({
      imports: [ViewSnippet],
      providers: [
        { provide: Db, useValue: dbSpy },
        // Fix for "No provider found for ActivatedRoute"
        { 
          provide: ActivatedRoute, 
          useValue: { snapshot: { paramMap: { get: () => '1' } } } 
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSnippet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});