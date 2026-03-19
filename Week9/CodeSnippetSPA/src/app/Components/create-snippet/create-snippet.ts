import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Db } from '../../services/db';
import { Snippet } from '../../../models/snippet';

@Component({
  selector: 'app-create-snippet',
  imports: [ReactiveFormsModule],
  templateUrl: './create-snippet.html',
  styleUrl: './create-snippet.css',
})

export class CreateSnippet {

  constructor(private dbService: Db){}

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

  async save(){
    console.log("Here :",this.createForm.value)
    await this.dbService.createSnippet(this.createForm.value as Snippet)
  }
}
