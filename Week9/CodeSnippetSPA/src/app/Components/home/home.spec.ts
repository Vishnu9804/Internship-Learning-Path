import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { Db } from '../../services/db';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let dbSpy: any;

  beforeEach(async () => {
    // Provide fake initial data so the component loads properly
    dbSpy = {
      getAllSnippet: vi.fn().mockResolvedValue([{ id: '1', title: 'Test Snippet' }])
    };

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        { provide: Db, useValue: dbSpy },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should load snippets on init', async () => {
    await fixture.whenStable();
    expect(dbSpy.getAllSnippet).toHaveBeenCalled();
    expect(component.items().length).toBe(1);
    expect(component.isLoading()).toBe(false); // Fixed
  });
});