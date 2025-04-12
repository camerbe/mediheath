import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OtherTeamDetail } from '../../../core/models/other-team-detail';
import { Media } from '../../../core/models/media';
import { OtherTeamService } from '../../../services/other-team.service';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../../../services/seo.service';
import { Router } from '@angular/router';
import { OtherTeam } from '../../../core/models/other-team';

@Component({
  selector: 'app-other-team',
  templateUrl: './other-team.component.html',
  styleUrl: './other-team.component.css'
})
export class OtherTeamComponent implements OnInit{

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (isPlatformBrowser(this.platformId)){
            this.isMobile = window.innerWidth < 768;
    }
  }
  lastOtherTeam!:OtherTeamDetail;
  imgUrl!:string;
  title:string="L'équipe paramédicale & administrative";
  hashtags: string[] = [];
  isMobile!: boolean;
  images: Media[] = []
  icone="pi pi-wrench";
  headerTitle=`L'équipe paramédicale & administrative`;
  otherTeamService:OtherTeamService=inject(OtherTeamService);
  metaService:Meta=inject(Meta);
  titleService:Title=inject(Title);
  sanitizer:DomSanitizer=inject(DomSanitizer);
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
    this.otherTeamService.getLast()
          .subscribe({
            next:data =>{
              const tempData=data as unknown as OtherTeam;
              this.lastOtherTeam=tempData["data"] as unknown as OtherTeamDetail
              this.images=this.lastOtherTeam.media;
              const metaObject=JSON.parse(this.lastOtherTeam.meta as unknown as string);
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
              //this.metaService.addTag();

            },error:err=>{}
          });
  }

}
