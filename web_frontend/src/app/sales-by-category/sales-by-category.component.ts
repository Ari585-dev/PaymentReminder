import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-sales-by-category',
  standalone: true,
  imports: [FormsModule, MatInputModule],
  templateUrl: './sales-by-category.component.html',
  styleUrl: './sales-by-category.component.scss'
})
export class SalesByCategoryComponent {
  catchedText: String="";
  whIcon="./assets/img/whatsapp.png"
}
