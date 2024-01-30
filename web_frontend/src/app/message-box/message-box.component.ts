import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [FormsModule, MatInputModule],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.scss'
})
export class MessageBoxComponent {
  catchedText: String="";
  whIcon="./assets/img/whatsapp.png"
}
