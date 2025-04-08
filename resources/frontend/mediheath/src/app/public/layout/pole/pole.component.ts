import { Pole } from './../../../core/models/pole';
import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PoleDetail } from '../../../core/models/pole-detail';
import { PoleService } from '../../../services/pole.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pole',
  templateUrl: './pole.component.html',
  styleUrl: './pole.component.css'
})
export class PoleComponent implements OnInit{

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)){
        this.isMobile = window.innerWidth < 768;
    }
  }
  lastPole!:PoleDetail;
  imgUrl!:string;
  title:string="MediHealth Clinic : Prévention Cardiaque & Gastro-Entérologie - Diagnostic, Traitement et Médecine Générale";
  hashtags: string[] = [];
  isMobile!: boolean

  PoleService:PoleService=inject(PoleService);
  metaService:Meta=inject(Meta);
  titleService:Title=inject(Title);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)){
      this.isMobile = window.innerWidth < 768;
    }
    this.PoleService.getLast()
          .subscribe({
            next:data =>{
              const tempData=data as unknown as Pole;
              this.lastPole=tempData["data"] as unknown as PoleDetail
              const tempMedia=this.lastPole.media[0];

              const metaObject=JSON.parse(this.lastPole.meta as unknown as string);
              this.hashtags=metaObject.hashtag.split(',');
              //console.log(this.hashtags);
              this.metaService.addTag({name:'description',content:metaObject.description});
              this.metaService.addTag({name:'keyword',content:metaObject.keywords});
              this.metaService.addTag({property:'og:title',content:this.title});
              this.titleService.setTitle(this.title)
              this.metaService.addTag({property:'og:description',content:metaObject.description});
              this.metaService.addTag({property:'og:image:alt',content:this.title});
              this.metaService.addTag({property:'og:image',content:tempMedia.original_url});
              this.metaService.addTag({property:'og:image:type',content:tempMedia.mime_type});
              this.metaService.addTag({property:'og:site_name',content:'medihealth.be'});
              this.metaService.addTag({property:'og:type',content:'article'});
              for (const hashtag of this.hashtags) {

                this.metaService.addTag({ property: 'og:tag', content: hashtag.trim() });
              }
              // this.hashtags.forEach(element => {
              //   this.metaService.updateTag({property:'og:tag',content:element})
              // });
              this.metaService.addTag({name:'robots',content:'index, follow'});

              this.imgUrl=tempMedia.original_url.replace("localhost", "localhost:8000");

            }
          })
  }

}
