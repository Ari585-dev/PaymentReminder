import { Routes } from '@angular/router';
import { DatesManagementComponent } from './dates-management/dates-management.component';
import { MainComponent } from './main/main.component';


export const routes: Routes = [
    {path: "", component: MainComponent},
    {path: "dates", component: DatesManagementComponent}
];

