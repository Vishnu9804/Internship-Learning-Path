import { Component, inject, signal } from '@angular/core';
import { Db } from '../../services/db';
import { ActivatedRoute } from '@angular/router';
import { SnippetBox } from '../snippet-box/snippet-box';

@Component({
  selector: 'app-view-snippet',
  standalone: true,
  imports: [SnippetBox],
  templateUrl: './view-snippet.html',
  styleUrl: './view-snippet.css'
})
export class ViewSnippet {
  dbService = inject(Db);
  route = inject(ActivatedRoute);
  
  codeSnippet = signal({
    title: "",
    code: ""
  });

  ngOnInit() {
    const docId = this.route.snapshot.paramMap.get('id');
    this.dbService.getSnippetById(docId!).then((data: any) => {
      this.codeSnippet.set(data);
    });
  }
}