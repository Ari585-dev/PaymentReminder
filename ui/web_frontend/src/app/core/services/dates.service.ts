import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatesService {
  private apiUrl='http://localhost:3000/api';

  constructor(private http:HttpClient) { }

  getDates(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+"/getDates");
  }

  getAllDates(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+"/getAllDates");
  }

  modifyOpeningDate(newOpeningDate: string){
    return this.http.put<any>(this.apiUrl+"/updateOpening",{openingDate:newOpeningDate});
  }

  modifyClosingDate(newClosingDate: string){
    return this.http.put<any>(this.apiUrl+"/updateClosing", {closingDate:newClosingDate})
  }

  modifyExtraordinaryDate(newExtraordinaryDate: string){
    return this.http.put<any>(this.apiUrl+"/updateExtraordinary", {extraordinaryDate:newExtraordinaryDate})
  }
}
