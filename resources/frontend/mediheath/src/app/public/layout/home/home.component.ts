import { join } from 'node:path';
import { Component, HostListener, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HomeDetail } from '../../../core/models/home-detail';
import { HomeService } from '../../../services/home.service';
import { Home } from '../../../core/models/home';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

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
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


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
          //console.log(this.hashtags);
          this.metaService.updateTag({name:'description',content:metaObject.description});
          this.metaService.updateTag({name:'keyword',content:metaObject.keywords});
          this.metaService.updateTag({property:'og:title',content:this.title});
          this.titleService.setTitle(this.title)
          this.metaService.updateTag({property:'og:description',content:metaObject.description});
          this.metaService.updateTag({property:'og:image:alt',content:this.title});
          this.metaService.updateTag({property:'og:image',content:tempMedia.original_url});
          this.metaService.updateTag({property:'og:image:type',content:tempMedia.mime_type});
          this.metaService.updateTag({property:'og:site_name',content:'medihealth.be'});
          this.metaService.updateTag({property:'og:type',content:'article'});
          for (const hashtag of this.hashtags) {

            this.metaService.addTag({ property: 'og:tag', content: hashtag.trim() });
          }
          // this.hashtags.forEach(element => {
          //   this.metaService.updateTag({property:'og:tag',content:element})
          // });
          this.metaService.updateTag({name:'robots',content:'index, follow'});

          this.imgUrl=tempMedia.original_url.replace("localhost", "localhost:8000");

        }
      })
  }

}
