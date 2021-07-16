import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  type: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  handleLogin(e:any) {
    e.preventDefault();

    let credentials = {
      username: this.username,
      password: this.password,
      type: this.type
    };

    this.authService.login(credentials)
      .subscribe((result:any) => {
        if(result.success) {
          this.authService.storeUserData(result.token, result.user);
          this.router.navigate(['/']);
        }
      });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.type = params.get("type");
    });
  }

}
