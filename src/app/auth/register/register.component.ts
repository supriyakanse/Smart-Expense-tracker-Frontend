import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username!: string;
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.username, this.email, this.password).subscribe(
      (res)=>{
        this.router.navigate(['/dashboard'])
        localStorage.setItem('jwtToken',res.token)
      },
      (error)=>{
        console.error('Registration failed', error)
      }
     
    );
  }
}
