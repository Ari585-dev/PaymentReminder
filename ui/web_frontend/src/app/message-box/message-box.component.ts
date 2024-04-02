import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NotifyService } from '../core/services/notify.service';
@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [FormsModule, MatInputModule],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.scss'
})
export class MessageBoxComponent {
  message: string="";
  title: string="";
  sendIcon="./assets/img/paper.png"
  

  constructor(private notifyService: NotifyService){}

  sendMessageToAll(){
    this.notifyService.sendMessageToAll(this.title, this.message)
      .subscribe({
        next: () => {
          console.log('Mensaje enviado correctamente');
          
        },
        error: (error) => {
          console.error('Error al enviar el mensaje:', error);
        }
      });
      this.title="";
      this.message="";
  }
}
