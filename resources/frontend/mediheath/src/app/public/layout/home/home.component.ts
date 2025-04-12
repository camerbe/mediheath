import { join } from 'node:path';
import { Component, HostListener, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HomeDetail } from '../../../core/models/home-detail';
import { HomeService } from '../../../services/home.service';
import { Home } from '../../../core/models/home';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../../services/seo.service';
import { Router } from '@angular/router';

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
    this.seoService.clearMetaTagsOnServerOnly();
  }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)){
      this.isMobile = window.innerWidth < 768;
    }
    this.homeService.getLast()
      .subscribe({
        next:data =>{
          const tempData=data as unknown as Home;
          this.lastHome=tempData["data"] as unknown as HomeDetail
          const tempMedia=this.lastHome.media[0];

          const metaObject=JSON.parse(this.lastHome.meta as unknown as string);
          this.hashtags=metaObject.hashtag.split(',');
          this.seoService.setCanonicalUrl(`${this.router.url}`);
          this.seoService.setTitleAndMeta(metaObject.title,
            [
              {name:'description',content:metaObject.description},
              {name:'keyword',content:metaObject.keywords},
              {property:'og:title',content:metaObject.title},
              {property:'og:description',content:metaObject.description},
              {property:'og:image:alt',content:metaObject.title},
              {property:'og:image',content:tempMedia.original_url},
              {property:'og:image:type',content:tempMedia.mime_type},
              {property:'og:site_name',content:'medihealth.be'},
              {property:'og:type',content:'article'},
              {name:'robots',content:'index, follow'}
            ]
          );

          for (const hashtag of this.hashtags) {

            this.metaService.addTag({ property: 'og:tag', content: hashtag.trim() });
          }
          this.imgUrl=tempMedia.original_url.replace("localhost", "localhost:8000");

        }
      })
  }

}
