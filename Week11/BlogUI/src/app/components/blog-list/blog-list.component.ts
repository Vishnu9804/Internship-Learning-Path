import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-blog-list',
  imports: [RouterModule, CommonModule], 
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getPosts().subscribe(data => this.posts = data);
  }
}