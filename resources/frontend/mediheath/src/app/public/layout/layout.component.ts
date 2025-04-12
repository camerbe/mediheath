import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
    }
  }

  isMobile!: boolean
  useSplitter:boolean=false;
  items: MenuItem[] = [
    {
      label: 'Accueil',
      icon: 'pi pi-home',
      routerLink: ['/home'],
      routerLinkActive: "text-rose-500 hover:text-rose-500",
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
    {
      label: "Pôles D'excellence",
      icon: 'pi pi-building-columns',
      routerLink: ['/pole'],
      routerLinkActiveOptions: { exact: true },
      command: () => {}
    },
    {
      label: "Équipe",
       icon: 'pi pi-users', command: () => {},
       items:[
        {
          label: 'Médicale',
          icon: 'pi pi-user',
          routerLink: ['/medical-team'],
          routerLinkActiveOptions: { exact: true },
          command: () => {}
        },
        {
          label: 'Paramédicale',
          icon: 'pi pi-wrench',
          routerLink: ['/paramedical-team'],
          routerLinkActiveOptions: { exact: true },
          command: () => {}
        }
      ],

    },
  ];
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Code dépendant de window
      this.isMobile = window.innerWidth < 768;
    }
  }
}
