import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private http: HttpClient) { }

  sendMessageToAll(title: string, message: string) {
    return this.http.post<any>('http://localhost:3000/api/sendMessageToAll', { title, message });
  }
}
