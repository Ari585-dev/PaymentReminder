import { Component, OnInit} from '@angular/core';
import { DatesService } from '../core/services/dates.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dates-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dates-management.component.html',
  styleUrl: './dates-management.component.scss'
})
export class DatesManagementComponent implements OnInit {
  dates: any[] = [];

  constructor(private datesService: DatesService){}

  ngOnInit(){
   this.fetchDates();
  }

  fetchDates() {
    this.datesService.getDates()
      .subscribe(
        (data: any) => {
          console.log('Datos obtenidos:', data);
          this.dates = [data];
        },
        error => {
          console.error('Error al obtener las fechas', error);
        }
      );
  }
  
  
}
