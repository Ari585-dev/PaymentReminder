import { Component } from '@angular/core';
import { TopFeaturesComponent } from '../top-features/top-features.component';
import { SalesByMonthComponent } from '../sales-by-month/sales-by-month.component';
import { SalesByCategoryComponent } from '../sales-by-category/sales-by-category.component';
import { LastFewTransactionsComponent } from '../last-few-transactions/last-few-transactions.component';
import { TopThreeProductsComponent } from '../top-three-products/top-three-products.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    TopFeaturesComponent,
    SalesByMonthComponent,
    SalesByCategoryComponent,
    LastFewTransactionsComponent,
    TopThreeProductsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
