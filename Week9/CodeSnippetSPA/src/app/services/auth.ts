import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";


@Injectable({
  providedIn: 'root',
})
export class Auth {

  uid = signal<string | null>(null);
  private auth = getAuth();

  constructor(private router: Router) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 2. Set the signal value using .set()
        this.uid.set(user.uid); 
        console.log("Logged In:", user.email);
      } else {
        this.uid.set(null);
        console.log("Logged Out");
      }
    });
  }

  isAuthenticated() {
    return this.uid() !== null; // Use () to read a signal
  }

  registerUser(email: string, password: string){  
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
        this.router.navigate(['/'])
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("Something went wrong while signup")
      });
  }

  loginUser(email: string, password: string)
  {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        this.router.navigate(['/'])
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("Something went wrong while signin")
      });
  }

  logout()
  {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      // An error happened.
    });
  }
}
