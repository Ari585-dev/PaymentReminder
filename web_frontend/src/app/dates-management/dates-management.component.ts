import { Component, OnInit, NgModule} from '@angular/core';
import { DatesService } from '../core/services/dates.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dates-management',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './dates-management.component.html',
  styleUrl: './dates-management.component.scss',
  providers: [DatePipe]
})
export class DatesManagementComponent implements OnInit {
  dates: any[] = [];
  selectedOpeningDate: Date | null = null;
  selectedClosingDate: Date | null = null;
  selectedExtraordinaryDate: Date | null = null;
  showDatepicker= false;  
  showDatepicker1=false;
  showDatepicker2=false;

  constructor(
    private datesService: DatesService, 
    private datePipe: DatePipe,
    private router:Router,
    private route:ActivatedRoute
    ){}

    showDatePicker() {
      this.showDatepicker = true;
    }

    showDatePicker1() {
      this.showDatepicker1 = true;
    }

    showDatePicker2() {
      this.showDatepicker2 = true;
    }

  onOpChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedOpeningDate = event.value;
    const newOpeningDate= this.datePipe.transform(this.selectedOpeningDate, 'yyyy-MM-dd')
    this.modifyOpeningDate(newOpeningDate);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.route.snapshot.url]); 
    this.showDatepicker = false;
    this.showDatepicker1 = false;
    this.showDatepicker2 = false;
    
  }

  onClChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedClosingDate = event.value;
    const newClosingDate= this.datePipe.transform(this.selectedClosingDate, 'yyyy-MM-dd')
    this.modifyClosingDate(newClosingDate);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.route.snapshot.url]);
    this.showDatepicker = false;
    this.showDatepicker1 = false;
    this.showDatepicker2 = false;
  }

  onExChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedExtraordinaryDate = event.value;
    const newExtraordinaryDate= this.datePipe.transform(this.selectedExtraordinaryDate, 'yyyy-MM-dd')
    this.modifyExtraordinaryDate(newExtraordinaryDate);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.route.snapshot.url]);
    this.showDatepicker = false;
    this.showDatepicker1 = false;
    this.showDatepicker2 = false;
  }


  ngOnInit(){
  this.fetchDates();
  }

  fetchDates() {
    this.datesService.getDates()
      .subscribe({
        next: (data: any) => {
          this.dates = [data];
        },
        error: (error) => {
          console.error('Error fetching dates', error);
        },
        complete: () => {
          console.info('Fetching dates completed');
        }
      });
  }

  modifyOpeningDate(newOpeningDate:any){
    this.datesService.modifyOpeningDate(newOpeningDate)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error("Error al modificar la fecha:", error);
        }
      });
  }

  modifyClosingDate(newClosingDate:any){
    this.datesService.modifyClosingDate(newClosingDate)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error("Error al modificar la fecha:", error);
        }
      });
  }

  modifyExtraordinaryDate(newExtraordinaryDate:any){
    this.datesService.modifyExtraordinaryDate(newExtraordinaryDate)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error("Error al modificar la fecha:", error);
        }
      });
  }
  
}
