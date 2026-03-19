import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSnippet } from './view-snippet';

describe('ViewSnippet', () => {
  let component: ViewSnippet;
  let fixture: ComponentFixture<ViewSnippet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSnippet],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSnippet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
