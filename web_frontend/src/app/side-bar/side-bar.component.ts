import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {faHouse} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  items: string[] = ['Analytics', 'Messages', 'DB Management'];
  faHouse = faHouse;
}
