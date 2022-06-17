import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarNavComponent } from './navigation/sidebar-nav/sidebar-nav.component';
import { AddContractorComponent } from './pages/contractor/add-contractor/add-contractor.component';
import { ContractorListComponent } from './pages/contractor/contractor-list/contractor-list.component';
import { ContractorMapComponent } from './pages/contractor/contractor-map/contractor-map.component';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard/admin-dashboard.component';
import { ContractorDashboardComponent } from './pages/dashboard/contractor-dashboard/contractor-dashboard.component';
import { AddEmployeeComponent } from './pages/employee/add-employee/add-employee.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { EmployeeMapComponent } from './pages/employee/employee-map/employee-map.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '', component: SidebarNavComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'admin-dash', component: AdminDashboardComponent },
      { path: 'contractor-dash', component: ContractorDashboardComponent },
      { path: 'contractor-list', component: ContractorListComponent },
      { path: 'contractor-map', component: ContractorMapComponent },
      { path: 'add-contractor', component: AddContractorComponent },
      { path: 'employee-list', component: EmployeeListComponent },
      { path: 'employee-map', component: EmployeeMapComponent },
      { path: 'add-employee', component: AddEmployeeComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
