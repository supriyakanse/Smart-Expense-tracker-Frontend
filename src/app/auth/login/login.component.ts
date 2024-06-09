import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}


  onSubmit() {
   this.authService.login(this.email,this.password).subscribe(
    (res)=>{
      this.router.navigate(['/dashboard']);
      localStorage.setItem('jwtToken',res.token);
    },
    (err)=>{
console.log(err);
    }
   )
  }
}
