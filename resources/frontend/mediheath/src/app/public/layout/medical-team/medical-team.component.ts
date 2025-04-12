import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MedicalTeamDetail } from '../../../core/models/medical-team-detail';
import { MedicalTeamService } from '../../../services/medical-team.service';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { MedicalTeam } from '../../../core/models/medical-team';
import { Media } from '../../../core/models/media';
import { SeoService } from '../../../services/seo.service';
import { Router } from '@angular/router';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-medical-team',
  templateUrl: './medical-team.component.html',
  styleUrl: './medical-team.component.css'
})
export class MedicalTeamComponent implements OnInit{

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
    if (isPlatformBrowser(this.platformId)){
          this.isMobile = window.innerWidth < 768;
      }
    }
    lastMedicalTeam!:MedicalTeamDetail;
    imgUrl!:string;
    title:string="L'équipe médicale";
    hashtags: string[] = [];
    isMobile!: boolean;
    images: Media[] = []
    icone="pi pi-users";
    headerTitle=`L'équipe médicale`;
    medicalTeamService:MedicalTeamService=inject(MedicalTeamService);
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
    this.medicalTeamService.getLast()
      .subscribe({
        next:data =>{
          const tempData=data as unknown as MedicalTeam;
          this.lastMedicalTeam=tempData["data"] as unknown as MedicalTeamDetail
          this.images=this.lastMedicalTeam.media;
          const metaObject=JSON.parse(this.lastMedicalTeam.meta as unknown as string);
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
