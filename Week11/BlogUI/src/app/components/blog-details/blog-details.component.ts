import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // <-- Added Router
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [RouterModule, CommonModule], 
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css',
})
export class BlogDetailComponent implements OnInit {
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // <-- Injected Router
    private blogService: BlogService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getPostById(id).subscribe(data => this.post = data);
  }

  deletePost() {
    if (this.post && confirm(`Are you sure you want to delete "${this.post.title}"?`)) {
      this.blogService.deletePost(this.post.id);
      this.router.navigate(['/']); // Go back home after deleting
    }
  }
}