import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // first_name: any;
  // last_name: any;
  // restaurant_name: any;
  // phone: any;
  // address: any;
  username: any;
  password: any;
  conf_password: any;
  type: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private validateService: ValidateService,
    private authService: AuthService
  ) {
    activatedRoute.paramMap.subscribe(params => {
      this.type = params.get("type");
    });
  }

  handleRegister() {
    let user = {
      // first_name: this.first_name,
      // last_name: this.last_name,
      // restaurant_name: this.restaurant_name,
      // phone: this.phone,
      // address: this.address,
      username: this.username,
      password: this.password,
      conf_password: this.conf_password,
      type: this.type,
      active: 0
    }

    if(!this.validateService.customerRegister(user)) {
      console.log("Something went wrong");
      return false;
    }

    this.authService.register(user)
      .subscribe(data => {
        console.log(data);
      });
    
    return '';
  }

  ngOnInit(): void {
  }

}
