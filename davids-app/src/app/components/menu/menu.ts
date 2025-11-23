import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../../services/menu';
import { HostListener } from '@angular/core';
import { Location } from '@angular/common';

type MenuKeys =  "breakfast" |'sandwiches' | 'croissants' | 'pizzas' | 'desserts' | 'coffe' |'tea' |'milkshakes' |'cold-beverages';

interface Category {
  key: MenuKeys;
  name: string;
  image: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
  imports: [CommonModule]
})
export class MenuComponent implements OnInit {



  @ViewChild('navContainer') navContainer!: ElementRef;

  activeCategory: MenuKeys | null = null;
  selectedItem: MenuItem | null = null;
  menuItems: Partial<Record<MenuKeys, MenuItem[]>> = {};

  categories: Category[] = [
    { key: 'breakfast', name: 'Завтрак', image: '/images/breakfast.jpg' },
    { key: 'pizzas', name: 'Пицца', image: '/images/pizza.jpg' },
    { key: 'sandwiches', name: 'Сэндвичи', image: '/images/sandwich.jpg' },
    { key: 'croissants', name: 'Круассаны', image: '/images/croissant.jpg' },
    { key: 'desserts', name: 'Десерты', image: '/images/desserts.jpg' },
    { key: 'coffe', name: 'Кофе', image: '/images/coffe-tea.jpg' },
    { key: 'tea', name: 'Чай', image: '/images/coffe-tea.jpg' },
    { key: 'milkshakes', name: 'милкшейк', image: '/images/milkshakes.jpg' }, 
    { key: 'cold-beverages', name: 'Холодные напитки', image: '/images/cold-beverages.jpg' }, 
   
  ];

 constructor(
    private http: HttpClient,
    private location: Location
  ) {
    // Push extra state so mobile back button stays inside the app
    history.pushState(null, '');
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    event.preventDefault();

    // Prevent exiting the app — return inside Angular navigation
    this.location.back();

    // Optional: re-push the state so the next back press still works
    history.pushState(null, '');
  }


  ngOnInit(): void {
    this.loadMenuFromJson();
  }

  loadMenuFromJson() {
    this.http.get<Partial<Record<MenuKeys, MenuItem[]>>>('/menu.json')
      .subscribe({
        next: (data) => {
          Object.keys(data).forEach(key => {
            const items = data[key as MenuKeys];
            items?.forEach((item: MenuItem) => {
              if (typeof item.ingredients === 'string') {
                item.ingredients = (item.ingredients as string)
                  .split(',')
                  .map(i => i.trim());
              }
            });
          });
          this.menuItems = data;
        },
        error: (err) => console.error('Error loading menu.json:', err)
      });
  }

  openCategory(key: MenuKeys) {
    this.activeCategory = key;
  }

  goBack() {
    this.activeCategory = null;
    this.selectedItem = null;
  }

  openItem(item: MenuItem) {
    this.selectedItem = item;
  }

  closeItem() {
    this.selectedItem = null;
  }
}
