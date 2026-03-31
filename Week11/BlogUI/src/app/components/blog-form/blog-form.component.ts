import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css'
})
export class BlogFormComponent implements OnInit {
  isEditMode = false;
  currentPostId!: number;
  
  // Data model bound to the form
  postData = {
    title: '',
    summary: '',
    content: ''
  };

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Check if we are editing an existing post by looking for an ID in the URL
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.currentPostId = Number(idParam);
      this.blogService.getPostById(this.currentPostId).subscribe(post => {
        if (post) {
          this.postData = { title: post.title, summary: post.summary, content: post.content };
        }
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      // Create a full Post object for updating
      const updatedPost: Post = {
        id: this.currentPostId,
        title: this.postData.title,
        summary: this.postData.summary,
        content: this.postData.content,
        // Keep existing date (in a real app you'd fetch it, here we mock it for simplicity)
        date: new Date().toISOString().split('T')[0] 
      };
      this.blogService.updatePost(updatedPost);
    } else {
      // Create new
      this.blogService.addPost(this.postData);
    }
    // Go back to home page
    this.router.navigate(['/']);
  }
}