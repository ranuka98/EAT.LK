import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'login/:type', component: LoginComponent },
  { path: 'register/:type', component: RegisterComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'user-type', component: UserTypeComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
