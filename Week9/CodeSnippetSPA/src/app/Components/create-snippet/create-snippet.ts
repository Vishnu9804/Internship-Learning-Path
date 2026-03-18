import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-snippet',
  imports: [ReactiveFormsModule],
  templateUrl: './create-snippet.html',
  styleUrl: './create-snippet.css',
})

export class CreateSnippet {
  title = new FormControl("",[
    Validators.required
  ])

  code = new FormControl("",[
    Validators.required
  ])

  createForm = new FormGroup({
    title:this.title,
    code:this.code
  })

  save(){
    console.log(this.createForm.value)
  }
}
