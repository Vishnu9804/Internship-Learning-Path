import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSnippet } from './create-snippet';

describe('CreateSnippet', () => {
  let component: CreateSnippet;
  let fixture: ComponentFixture<CreateSnippet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSnippet],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSnippet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
