import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarNavComponent } from './navigation/sidebar-nav/sidebar-nav.component';
import { ContractorListComponent } from './pages/contractor/contractor-list/contractor-list.component';
import { ContractorMapComponent } from './pages/contractor/contractor-map/contractor-map.component';
import { AddContractorComponent } from './pages/contractor/add-contractor/add-contractor.component';
import { EmployeeMapComponent } from './pages/employee/employee-map/employee-map.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { AddEmployeeComponent } from './pages/employee/add-employee/add-employee.component';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard/admin-dashboard.component';
import { ContractorDashboardComponent } from './pages/dashboard/contractor-dashboard/contractor-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';
import {MatExpansionModule} from '@angular/material/expansion';
import { ContractorReportComponent } from './report/contractor-report/contractor-report.component';
import { EmployeeReportComponent } from './report/employee-report/employee-report.component';
import { LoginComponent } from './pages/login/login.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthInterceptor, authInterceptorProviders } from './guard/auth.interceptor';
import { UserService } from './service/user.service';
import {JwtModule} from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    SidebarNavComponent,
    ContractorListComponent,
    ContractorMapComponent,
    AddContractorComponent,
    EmployeeMapComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    AdminDashboardComponent,
    ContractorDashboardComponent,
    HomeComponent,
    ContractorReportComponent,
    EmployeeReportComponent,
    LoginComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    HttpClientModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
    ChartsModule,
    MatExpansionModule,
    // JwtModule.forRoot({config:{tokenGetter:()=>localStorage.getItem("jwtToken")}})

  ],
  providers: [
    // AuthGuard,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi:true
    // },
    // UserService
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
