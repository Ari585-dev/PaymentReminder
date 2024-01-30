import { Component } from '@angular/core';
import { TopFeaturesComponent } from '../top-features/top-features.component';
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    TopFeaturesComponent,
    MessageBoxComponent
    ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
