import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
uDistritalLogo= "https://seeklogo.com/images/U/Universidad_distrital_Francisco_Jose_de_Caldas-logo-D1988258C8-seeklogo.com.png"
managementIcon= '../assets/img/settings.png'
houseIcon= '../assets/img/home.png'
}
