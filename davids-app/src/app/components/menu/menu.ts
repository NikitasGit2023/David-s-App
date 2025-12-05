import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SafeUrlPipe } from '../../pipes/pdfpipe';






type MenuKeys =  
  "breakfast" | "sandwiches" | "croissants" | "pizzas" |
  "desserts" | "coffe" | "tea" | "milkshakes" | "cold-beverages";

interface Category {
  key: MenuKeys;
  name: string;
  image: string;
  pdf: string; 
}

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
  imports: [CommonModule, SafeUrlPipe]
})
export class MenuComponent {

  activeCategory: Category | null = null;  
  categories: Category[] = [
    { key: 'breakfast', name: 'Завтрак', image: '/images/breakfast.jpg', pdf: '/pdf_files/breakfast.pdf' },
    { key: 'pizzas', name: 'Пицца', image: '/images/pizza.jpg', pdf: '/pdf/pizzas.pdf' },
    { key: 'sandwiches', name: 'Сэндвичи', image: '/images/sandwich.jpg', pdf: '/pdf/sandwiches.pdf' },
    { key: 'croissants', name: 'Круассаны', image: '/images/croissant.jpg', pdf: '/pdf/croissants.pdf' },
    { key: 'desserts', name: 'Десерты', image: '/images/desserts.jpg', pdf: '/pdf/desserts.pdf' },
    { key: 'coffe', name: 'Кофе', image: '/images/coffe-tea.jpg', pdf: '/pdf/coffe.pdf' },
    { key: 'tea', name: 'Чай', image: '/images/coffe-tea.jpg', pdf: '/pdf/tea.pdf' },
    { key: 'milkshakes', name: 'милкшейк', image: '/images/milkshakes.jpg', pdf: '/pdf/milkshakes.pdf' },
    { key: 'cold-beverages', name: 'Холодные напитки', image: '/images/cold-beverages.jpg', pdf: '/pdf/cold-beverages.pdf' },
  ];

  constructor(private router: Router, private ngLocation: Location) {
    history.pushState(null, '');
  }

  openCategory(category: Category) {
    this.activeCategory = category;
  }

  goBack() {
    this.activeCategory = null;
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    event.preventDefault();
    if (this.activeCategory) {
      this.activeCategory = null;
      return history.pushState(null, '');
    }
    history.pushState(null, '');
  }
}
