import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  // REGISTER
  customerRegister(user:any) {
    // if(
    //   user.first_name==undefined || user.last_name==undefined || user.phone==undefined ||
    //   user.address==undefined || user.username==undefined || user.password==undefined ||
    //   user.conf_password==undefined || user.password!==user.conf_password
    // ) {
    if(
      user.username==undefined || user.password==undefined ||
      user.conf_password==undefined || user.password!==user.conf_password
    ) {
      return false;
    } else {
      return true;
    }
  }
  restaurantRegister(user:any) {
    if(user.restaurant_name==undefined || user.phone==undefined || user.address==undefined) {
      return false;
    } else {
      return true;
    }
  }
  // adminRegister(user) {

  // }


}
