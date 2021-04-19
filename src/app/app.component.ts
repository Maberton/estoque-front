import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  links = ['Estoque', 'Produto', 'Vendas'];
  activeLink = this.links[0];
  title = 'estoque-front';
}
