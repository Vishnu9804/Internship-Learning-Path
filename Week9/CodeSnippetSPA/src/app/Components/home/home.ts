import { Component, OnInit, signal } from '@angular/core'; // Import signal and OnInit
import { Db } from '../../services/db';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(private dbService: Db){}
  items = signal<{id: string, title: string}[]>([]);
  isLoading = signal(true); 

  ngOnInit() {
    this.dbService.getAllSnippet().then((data: any) => {
      console.log(data);
      this.items.set(data);       
      this.isLoading.set(false);  
    });
  }
}