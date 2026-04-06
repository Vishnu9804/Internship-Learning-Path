import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snippet-box',
  standalone: true,
  templateUrl: './snippet-box.html',
})
export class SnippetBox {
  @Input() title: string = 'Untitled Snippet';
  @Input() code: string = '';
  @Input() isError: boolean = false;
}