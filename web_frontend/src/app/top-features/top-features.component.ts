import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-features.component.html',
  styleUrl: './top-features.component.scss'
})
export class TopFeaturesComponent {
  usersIcon: String = "./assets/img/users.png"
  messagesIcon: String = "./assets/img/smartphone.png"
  mailIcon: String = "./assets/img/envelope.png"
}
