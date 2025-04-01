import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CentreDetail } from '../../../core/models/centre-detail';
import { CentreService } from '../../../services/centre.service';
import { Meta, Title } from '@angular/platform-browser';
import { Centre } from '../../../core/models/centre';
import { Media } from '../../../core/models/media';

@Component({
  selector: 'app-centre',
  templateUrl: './centre.component.html',
  styleUrl: './centre.component.css'
})
export class CentreComponent implements OnInit {

    @HostListener('window:resize', ['$event'])

    lastCentre!:CentreDetail;
    imgUrl!:string;
    title:string="MediHealth Clinic : Le Centre";
    hashtags=[];
    isMobile!: boolean
    images: Media[] = []

    centreService:CentreService=inject(CentreService);
    metaService:Meta=inject(Meta);
    titleService:Title=inject(Title);

    onResize(event: Event) {
      this.isMobile = window.innerWidth < 768;
    }



  ngOnInit(): void {
    this.isMobile = window.innerWidth < 768;
    this.centreService.getLast()
      .subscribe({
        next:data =>{
          const tempData=data as unknown as Centre;
          this.lastCentre=tempData["data"] as unknown as CentreDetail
          this.images=this.lastCentre.media;
          const metaObject=JSON.parse(this.lastCentre.meta as unknown as string);
          this.metaService.updateTag({name:'description',content:metaObject.description});
          this.metaService.updateTag({name:'keyword',content:metaObject.keywords});
          this.metaService.updateTag({property:'og:title',content:this.title});
          this.titleService.setTitle(this.title)
          this.metaService.updateTag({property:'og:description',content:metaObject.description});
          this.metaService.updateTag({property:'og:image:alt',content:this.title});
          this.metaService.updateTag({property:'og:image',content:this.images[0].original_url});
          this.metaService.updateTag({property:'og:image:type',content:this.images[0].mime_type});
          this.metaService.updateTag({property:'og:site_name',content:'medihealth.be'});
          this.metaService.updateTag({property:'og:type',content:'article'});
          this.metaService.updateTag({name:'robots',content:'index, follow'});
        }
      })
  }

}
