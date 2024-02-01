import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatesService {
  private apiUrl='http://localhost:3000/api/getDates';

  constructor(private http:HttpClient) { }

  getDates(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }
}
