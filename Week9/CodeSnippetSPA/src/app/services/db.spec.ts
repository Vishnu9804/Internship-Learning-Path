import { TestBed } from '@angular/core/testing';
import { Db } from './db';
import { Auth } from './auth';
import { Router } from '@angular/router';
import { vi, Mock } from 'vitest';
import * as firestore from 'firebase/firestore';

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(), 
  collection: vi.fn(), 
  addDoc: vi.fn(), 
  getDocs: vi.fn(), 
  doc: vi.fn(), 
  getDoc: vi.fn()
}));

describe('Db Service', () => {
  let service: Db;
  let routerSpy: any;
  let authSpy: any;

  beforeEach(() => {
    routerSpy = { navigate: vi.fn() };
    authSpy = { getUid: vi.fn().mockReturnValue('fake-user-id') };
    
    // Suppress console outputs
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    TestBed.configureTestingModule({
      providers: [ 
        Db, 
        { provide: Auth, useValue: authSpy }, 
        { provide: Router, useValue: routerSpy } 
      ]
    });
    service = TestBed.inject(Db);
  });

  it('should be created', () => { 
    expect(service).toBeTruthy(); 
  });

  describe('createSnippet', () => {
    it('should add a document and navigate home', async () => {
      const addDocMock = firestore.addDoc as Mock;
      addDocMock.mockResolvedValue({ id: 'new-doc-id' });

      await service.createSnippet({ title: 'Test', code: 'console.log();' });

      expect(addDocMock).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should catch and log errors during creation', async () => {
      const addDocMock = firestore.addDoc as Mock;
      addDocMock.mockRejectedValue(new Error('Database offline'));

      await service.createSnippet({ title: 'Test', code: 'console.log();' });

      expect(console.error).toHaveBeenCalled();
      // Should not navigate on failure
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
  });

  describe('getAllSnippet', () => {
    it('should retrieve mapped snippets array', async () => {
      const getDocsMock = firestore.getDocs as Mock;
      
      const fakeSnapshot = [
        { id: '1', data: () => ({ title: 'Snippet 1', code: 'Code 1' }) },
        { id: '2', data: () => ({ title: 'Snippet 2', code: 'Code 2' }) }
      ];
      
      getDocsMock.mockResolvedValue({
        forEach: (callback: any) => fakeSnapshot.forEach(callback)
      });

      const result = await service.getAllSnippet();

      expect(getDocsMock).toHaveBeenCalled();
      expect(result.length).toBe(2);
      expect(result[0]['title']).toBe('Snippet 1'); 
    });
  });

  describe('getSnippetById', () => {
    it('should return snippet data if document exists', async () => {
      const getDocMock = firestore.getDoc as Mock;
      
      getDocMock.mockResolvedValue({
        exists: () => true,
        data: () => ({ title: 'Found Snippet', code: 'const x = 1;' })
      });

      const result = await service.getSnippetById('123');

      expect(getDocMock).toHaveBeenCalled();
      expect(result['title']).toBe('Found Snippet'); 
    });

    it('should return a "not found" fallback if document does not exist', async () => {
      const getDocMock = firestore.getDoc as Mock;
      
      getDocMock.mockResolvedValue({
        exists: () => false
      });

      const result = await service.getSnippetById('999');

      expect(getDocMock).toHaveBeenCalled();
      expect(result['title']).toBe('not found'); 
      expect(result['id']).toBe(''); 
    });
  });
});