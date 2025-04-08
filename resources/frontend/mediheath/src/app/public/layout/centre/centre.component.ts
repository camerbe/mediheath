import { Component, HostListener, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CentreDetail } from '../../../core/models/centre-detail';
import { CentreService } from '../../../services/centre.service';
import { Meta, Title } from '@angular/platform-browser';
import { Centre } from '../../../core/models/centre';
import { Media } from '../../../core/models/media';
import { isPlatformBrowser } from '@angular/common';

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

    centreService:CentreService=inject(CentreService);
    metaService:Meta=inject(Meta);
    titleService:Title=inject(Title);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}




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
          this.metaService.addTag({name:'description',content:metaObject.description});
          this.metaService.addTag({name:'keyword',content:metaObject.keywords});
          this.metaService.addTag({property:'og:title',content:this.title});
          this.titleService.setTitle(this.title)
          this.metaService.addTag({property:'og:description',content:metaObject.description});
          this.metaService.addTag({property:'og:image:alt',content:this.title});
          this.metaService.addTag({property:'og:image',content:this.images[0].original_url});
          this.metaService.addTag({property:'og:image:type',content:this.images[0].mime_type});
          this.metaService.addTag({property:'og:site_name',content:'medihealth.be'});
          this.metaService.addTag({property:'og:type',content:'article'});
          for (const hashtag of this.hashtags) {
            this.metaService.addTag({ property: 'og:tag', content: hashtag.trim() });
          }
          this.metaService.addTag({name:'robots',content:'index, follow'});
        }
      })
  }

}
