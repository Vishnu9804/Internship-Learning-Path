import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {

  constructor(private authService:Auth){}

  email = new FormControl("",[
    Validators.required,
    Validators.email
  ])

  password = new FormControl("",[
    Validators.required,
    Validators.minLength(6)
  ])

  loginForm = new FormGroup({
    email:this.email,
    password:this.password
  })

  login(){
    console.log(this.loginForm.value)
    this.authService.loginUser(this.email.value!, this.password.value!)
  }
  reset(){
    this.loginForm.reset()
  }
}
