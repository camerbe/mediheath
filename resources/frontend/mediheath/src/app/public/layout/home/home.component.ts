import { join } from 'node:path';
import { Component, HostListener, Inject, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { HomeDetail } from '../../../core/models/home-detail';
import { HomeService } from '../../../services/home.service';
import { Home } from '../../../core/models/home';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../../services/seo.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)){
      this.isMobile = window.innerWidth < 768;
    }
  }
  /***************SIGNAL *************/
  readonly isBrowser = signal(false);

  lastHome!:HomeDetail;
  imgUrl!:string;
  title:string="MediHealth Clinic : Expertise en Santé Générale et Cardiovasculaire pour une Prise en Charge Optimale";
  hashtags: string[] = [];
  isMobile!: boolean

  homeService:HomeService=inject(HomeService);
  metaService:Meta=inject(Meta);
  titleService:Title=inject(Title);
  sanitizer:DomSanitizer=inject(DomSanitizer);
  seoService:SeoService=inject(SeoService);
  router:Router=inject(Router);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
    this.seoService.clearMetaTagsOnServerOnly();
  }


  ngOnInit(): void {
    if(!this.isBrowser()) return;
    this.isMobile = window.innerWidth < 768;

    this.homeService.getLast()
      .subscribe({
        next:data =>{
          const tempData=data as unknown as Home;
          this.lastHome=tempData["data"] as unknown as HomeDetail
          const tempMedia=this.lastHome.media[0];

          const metaObject=JSON.parse(this.lastHome.meta as unknown as string);
          this.hashtags=metaObject.hashtag.split(',');
          if(this.isBrowser()){
            this.seoService.setCanonicalUrl(`${window.location.protocol}//${window.location.host}${this.router.url}`);
          }

          this.seoService.setTitleAndMeta(metaObject.title,
            [
              {name:'description',content:metaObject.description},
              {name:'keyword',content:metaObject.keywords},
              {property:'og:title',content:metaObject.title},
              {property:'og:description',content:metaObject.description},
              {property:'og:image:alt',content:metaObject.title},
              {property:'og:image',content:tempMedia.original_url},
              {property:'og:image:type',content:tempMedia.mime_type},
              {property:'og:site_name',content:'medihealth-clinic.org'},
              {property:'og:type',content:'article'},
              {name:'robots',content:'index, follow'}
            ]
          );

          for (const hashtag of this.hashtags) {

            this.metaService.addTag({ property: 'og:tag', content: hashtag.trim() });
          }
          this.imgUrl= `${environment.serverUrl}${new URL(tempMedia.original_url).pathname}`;

        }
      })
  }

}
