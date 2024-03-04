import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsService } from '../core/services/students.service';

@Component({
  selector: 'app-top-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-features.component.html',
  styleUrl: './top-features.component.scss'
})
export class TopFeaturesComponent implements OnInit {
  usersIcon: String = "./assets/img/users.png"
  messagesIcon: String = "./assets/img/smartphone.png"
  mailIcon: String = "./assets/img/envelope.png"
  studentsAmount:any;

  constructor(private studentService:StudentsService){}

  ngOnInit(): void {
    this.countStudents();
  }

  countStudents(){
    this.studentService.getCountStudents()
    .subscribe({
      next:(data:any)=>{
        this.studentsAmount = data;
      },
      error: (error) => {
        console.error('Error counting students', error);
      },
      complete: () => {
        console.info('Completed');
      }

    })
  }
}
