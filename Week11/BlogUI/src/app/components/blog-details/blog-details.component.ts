import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-blog-details',
  imports: [RouterModule, CommonModule], 
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css',
})
export class BlogDetailComponent implements OnInit {
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getPostById(id).subscribe(data => this.post = data);
  }
}