import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: any;
  password: any;
  conf_password: any;
  type: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  handleLogin(e:any) {
    e.preventDefault();
    let credentials = {
      username: this.username,
      password: this.password,
      conf_password: this.password,
      type: this.type,
      active: 0
    }

    this.authService.register(credentials)
      .subscribe((data:any) => {
        if(data.success) {
          this.router.navigate([`/login/${this.type}`]);
        }
      });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async(params) => {
      this.type = params.get("type");
    })
  }

}
