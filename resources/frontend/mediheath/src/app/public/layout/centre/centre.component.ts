import { Component, HostListener, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CentreDetail } from '../../../core/models/centre-detail';
import { CentreService } from '../../../services/centre.service';
import { Meta, Title } from '@angular/platform-browser';
import { Centre } from '../../../core/models/centre';
import { Media } from '../../../core/models/media';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../../services/seo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-centre',
  templateUrl: './centre.component.html',
  styleUrl: './centre.component.css'
})
export class CentreComponent implements OnInit {

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
      if (isPlatformBrowser(this.platformId)){
        this.isMobile = window.innerWidth < 768;
      }
    };

    lastCentre!:CentreDetail;
    imgUrl!:string;
    title:string="MediHealth Clinic : Le Centre";
    hashtags: string[] = [];
    isMobile!: boolean
    images: Media[] = []
    icone="pi pi-home";
    headerTitle=`le centre`;
    centreService:CentreService=inject(CentreService);
    metaService:Meta=inject(Meta);
    titleService:Title=inject(Title);
    seoService:SeoService=inject(SeoService);
    router:Router=inject(Router);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
      this.seoService.clearMetaTagsOnServerOnly();
      this.seoService.clearAllMetaTags();
    }




  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)){
      this.isMobile = window.innerWidth < 768;
    }
    this.centreService.getLast()
      .subscribe({
        next:data =>{
          const tempData=data as unknown as Centre;
          this.lastCentre=tempData["data"] as unknown as CentreDetail
          this.images=this.lastCentre.media;
          const metaObject=JSON.parse(this.lastCentre.meta as unknown as string);
          this.hashtags=metaObject.hashtag.split(',');

          this.seoService.setTitleAndMeta(metaObject.title,
            [
              {name:'description',content:metaObject.description},
              {name:'keyword',content:metaObject.keywords},
              {property:'og:title',content:metaObject.title},
              {property:'og:description',content:metaObject.description},
              {property:'og:image:alt',content:metaObject.title},
              {property:'og:image',content:this.images[0].original_url},
              {property:'og:image:type',content:this.images[0].mime_type},
              {property:'og:site_name',content:'medihealth.be'},
              {property:'og:type',content:'article'},
              {name:'robots',content:'index, follow'}

            ]
          );
          this.seoService.setCanonicalUrl(`${this.router.url}`);
          for (const hashtag of this.hashtags) {
            this.metaService.addTag({ property: 'og:tag', content: hashtag.trim() });
          }
          this.metaService.addTag({name:'robots',content:'index, follow'});
        }
      })
  }

}
