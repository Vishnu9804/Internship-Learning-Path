import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule], 
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent implements OnInit {
  posts: Post[] = [];
  searchTerm: string = '';

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getPosts().subscribe(data => this.posts = data);
  }

  // Real-time search filter
  get filteredPosts() {
    if (!this.searchTerm) return this.posts;
    const term = this.searchTerm.toLowerCase();
    return this.posts.filter(p => 
      p.title.toLowerCase().includes(term) || 
      p.summary.toLowerCase().includes(term)
    );
  }

  deletePost(id: number, title: string) {
    // Simple browser confirmation dialogue
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      this.blogService.deletePost(id);
    }
  }
}