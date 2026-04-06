import { TestBed } from '@angular/core/testing';
import { Db } from './db';
import { Auth } from './auth';
import { Router } from '@angular/router';
import { vi } from 'vitest';

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(), collection: vi.fn(), addDoc: vi.fn(), getDocs: vi.fn(), doc: vi.fn(), getDoc: vi.fn()
}));

describe('Db', () => {
  let service: Db;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ Db, { provide: Auth, useValue: { getUid: vi.fn() } }, { provide: Router, useValue: { navigate: vi.fn() } } ]
    });
    service = TestBed.inject(Db);
  });
  it('should be created', () => { expect(service).toBeTruthy(); });
});