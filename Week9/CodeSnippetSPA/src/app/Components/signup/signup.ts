import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  constructor(private authService: Auth, private router:Router){

  }

  email = new FormControl("",[
    Validators.required,
    Validators.email
  ])

  password = new FormControl("",[
    Validators.required,
    Validators.minLength(6)
  ])

  signupForm = new FormGroup({
    email:this.email,
    password:this.password
  })

  register(){
    console.log(this.signupForm.value)
    // this.router.navigate(['/login'])
    this.authService.registerUser(this.email.value || '',this.password.value || '')
  }
  reset(){
    this.signupForm.reset()
  }
}
