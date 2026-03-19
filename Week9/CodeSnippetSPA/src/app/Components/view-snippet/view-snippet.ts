import { Component, OnInit, signal } from '@angular/core'; // 1. Import OnInit & signal
import { Db } from '../../services/db';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-snippet',
  imports: [],
  templateUrl: './view-snippet.html',
  styleUrl: './view-snippet.css',
})
export class ViewSnippet implements OnInit { 
  codeSnippet = signal({
    title : "",
    code : ""
  });

  constructor(private route: ActivatedRoute, private dbService: Db){}

  ngOnInit(){
    const docId = this.route.snapshot.paramMap.get('id');
    
    this.dbService.getSnippetById(docId!).then((data:any)=> {
      this.codeSnippet.set(data);
      console.log("Firebase Data Arrived:", this.codeSnippet());
    });
  }
}