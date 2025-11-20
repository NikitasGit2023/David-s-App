import { Component, signal } from '@angular/core';
import { MenuComponent } from './components/menu/menu';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent],    
  templateUrl: './app.html',
  styleUrls: ['./app.css'],      
})
export class App {
  protected readonly title = signal('davids-app');
}
