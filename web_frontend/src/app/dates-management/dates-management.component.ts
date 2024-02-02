import { Component, OnInit} from '@angular/core';
import { DatesService } from '../core/services/dates.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-dates-management',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  templateUrl: './dates-management.component.html',
  styleUrl: './dates-management.component.scss',
  providers: [DatePipe]
})
export class DatesManagementComponent implements OnInit {
  dates: any[] = [];
  selecteDate: Date | null = null;
  formattedDate: string | null = null;

  constructor(
    private datesService: DatesService, 
    private datePipe: DatePipe,
    private router:Router,
    private route:ActivatedRoute
    ){}

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.selecteDate = event.value;
    this.formatDate();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.route.snapshot.url]);
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


  private formatDate(){
  
    if (this.selecteDate) {
      this.formattedDate = this.datePipe.transform(this.selecteDate, 'yyyy-MM-dd');
    } else {
      this.formattedDate = null;
    }
  }
  
  
}
