import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SafeUrlPipe } from '../../pipes/pdfpipe';



type MenuKeys =  
  "breakfast" | "sandwiches" | "pizzas" | "baked_food" |"desserts" | "coffe" | "tea" |
   "milkshakes" | "cold coffe" | "juice_and_lemonade" | "smoothie_beverages";


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
    { key: 'pizzas', name: 'Пицца', image: '/images/pizza.jpg', pdf: '/pdf_files/pizza.pdf' },
    { key: 'sandwiches', name: 'Сэндвичи', image: '/images/sandwich.jpg', pdf: '/pdf_files/sandwiches.pdf' },
    { key: 'baked_food', name: 'выпечка', image: '/images/baked_food).jpg', pdf: '/pdf_files/baked_food.pdf' },
    { key: 'desserts', name: 'Десерты', image: '/images/desserts.jpg', pdf: '/pdf_files/desserts.pdf' },
    { key: 'coffe', name: 'Кофе', image: '/images/coffe.jpg', pdf: '/pdf_files/coffe.pdf' },
    { key: 'tea', name: 'Чай', image: '/images/tea.jpg', pdf: '/pdf_files/tea.pdf' },
    { key: 'milkshakes', name: 'милкшейк', image: '/images/milkshakes.jpg', pdf: '/pdf_files/milkshakes.pdf' },
    { key: 'cold coffe', name: 'Холодный кофе', image: '/images/cold-coffe.jpg', pdf: '/pdf_files/cold-coffe.pdf' },
    { key: 'juice_and_lemonade', name: 'Свежий сок и лимонад', image: '/images/juice_and_lemonade).jpg', pdf: '/pdf_files/juice_and_lemonade.pdf' },
    { key: 'smoothie_beverages', name: 'Смузи напитки', image: '/images/smoothie_beverages).jpg', pdf: '/pdf_files/smoothie_beverages.pdf' },
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
