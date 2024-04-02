import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private apiUrl='http://localhost:3000/api';

  constructor(private http:HttpClient) { }

  getCountStudents(): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/countStudents');
  }
}
