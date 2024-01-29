import { Routes } from '@angular/router';
import { DatesManagementComponent } from './dates-management/dates-management.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    {path: "main", component: MainComponent},
    {path: "dates", component: DatesManagementComponent}
];
