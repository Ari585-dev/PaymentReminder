import { Component, OnInit} from '@angular/core';
import { DatesService } from '../core/services/dates.service';
import { CommonModule, DatePipe} from '@angular/common';


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
  now= new Date()
  open: Date | null = null;
  close: Date | null = null;
  ext: Date | null = null;
  

  constructor(
    private datesService: DatesService, 
    private datePipe: DatePipe,
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
    if(event.value){
      this.selectedOpeningDate = event.value;

      if(this.selectedOpeningDate>this.now){
        const newOpeningDate = this.datePipe.transform(this.selectedOpeningDate, 'yyyy-MM-dd')
        this.modifyOpeningDate(newOpeningDate);
        window.location.reload();
        this.showDatepicker = false;
      }
    } 
   
    
  }

  onClChange(event: MatDatepickerInputEvent<Date>) {
    if(event.value){
      this.selectedClosingDate = event.value;

      if (this.open!== null && this.open !== undefined) {
      if(this.selectedClosingDate > this.open){
        const newClosingDate = this.datePipe.transform(this.selectedClosingDate, 'yyyy-MM-dd');
        this.modifyClosingDate(newClosingDate);
        window.location.reload();
        this.showDatepicker1 = false;
      }
    }
  }
  }
  onExChange(event: MatDatepickerInputEvent<Date>) {
    if(event.value){
      this.selectedExtraordinaryDate = event.value;

      if (this.close!== null && this.close !== undefined) {
        if(this.selectedExtraordinaryDate > this.close){
          const newExtraordinaryDate = this.datePipe.transform(this.selectedExtraordinaryDate, 'yyyy-MM-dd')
          this.modifyExtraordinaryDate(newExtraordinaryDate);
          window.location.reload();
          this.showDatepicker2 = false;
        }
    }
      }
    }


  ngOnInit(){
  this.fetchAllDates();
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

  fetchAllDates() {
    this.datesService.getAllDates()
      .subscribe({
        next: (data: any) => {
          this.dates = [data];
          this.open= new Date(data.openingDate);
          this.close=new Date(data.closingDate);
          this.ext=new Date(data.extraordinaryDate);
          
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
