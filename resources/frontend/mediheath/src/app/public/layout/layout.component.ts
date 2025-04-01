import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  useSplitter:boolean=false;
  items: MenuItem[] = [
    {
      label: 'Accueil',
      icon: 'pi pi-home',
      routerLink: ['/home'],
      routerLinkActiveOptions: { exact: true },
      command: () => {}
    },
    {
      label: 'Le Centre',
      icon: 'pi pi-palette',
      routerLink: ['/centre'],
      routerLinkActiveOptions: { exact: true },
      command: () => {}
    },
    { label: "Pôle D'excellence", icon: 'pi pi-building-columns', command: () => {} },
    { label: "Notre Équipe", icon: 'pi pi-users', command: () => {} },
  ];
}
