import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { MedicalTeamDetail } from '../../../core/models/medical-team-detail';
import { MedicalTeamService } from '../../../services/medical-team.service';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { MedicalTeam } from '../../../core/models/medical-team';
import { Media } from '../../../core/models/media';
import { SeoService } from '../../../services/seo.service';
import { Router } from '@angular/router';
import { threadId } from 'worker_threads';
import { MedicalHierarchy } from '../../../core/models/medical-hierarchy';
import { TreeNode } from 'primeng/api';
import { ReplaceHostPipe } from '../../../shared/pipes/replace-host.pipe';
import { environment } from '../../../../environments/environment.development';

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
    /***************SIGNAL *************/
    readonly isBrowser = signal(false);
    medicalHierarchy:MedicalTeamDetail[]=[];
    lastMedicalTeam!:MedicalTeamDetail;
    imgUrl!:string;
    title:string="L'équipe médicale";
    hashtags: string[] = [];
    isMobile!: boolean;
    images: Media[] = []
    photos: TreeNode[] = []
    icone="pi pi-users";
    headerTitle=`L'équipe médicale`;

    protected readonly consultantTitle="Consultants";
    protected flatPhotos: any[] = [];


    medicalTeamService:MedicalTeamService=inject(MedicalTeamService);
    metaService:Meta=inject(Meta);
    titleService:Title=inject(Title);
    sanitizer:DomSanitizer=inject(DomSanitizer);
    seoService:SeoService=inject(SeoService);
    router:Router=inject(Router);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
      this.isBrowser.set(isPlatformBrowser(this.platformId));
      this.seoService.clearMetaTagsOnServerOnly();
      this.seoService.clearAllMetaTags();

    }
    getAllNodes(nodes: any[]): any[] {
      return nodes.reduce((acc, node) => {
        acc.push(node);
        if (node.children?.length) {
          acc.push(...this.getAllNodes(node.children));
        }
        return acc;
      }, []);
    }
  ngOnInit(): void {
    if(!this.isBrowser()) return;
    this.isMobile = window.innerWidth < 768;


    this.medicalTeamService.getLast()
      .subscribe({
        next:data =>{
          const tempData=data as unknown as MedicalTeam;
          this.lastMedicalTeam=tempData["data"] as unknown as MedicalTeamDetail

          this.images=this.lastMedicalTeam.media.filter((image:Media,idx) => idx !== 0 && idx !== 2 && idx !==3);
          //console.log(this.lastMedicalTeam.media);
          const metaObject=JSON.parse(this.lastMedicalTeam.meta as unknown as string);
          if(metaObject && metaObject.hashtag){
            this.hashtags=metaObject.hashtag.split(',');
          }
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
          let tmp: MedicalHierarchy[] = [];
          let tmpMediaHierarchy  : MedicalHierarchy[] = [];
          this.lastMedicalTeam.media.forEach((image:Media,idx) => {
            const url = new URL(image.original_url);
            const path = url.pathname;
            const url_image = `${environment.serverUrl}${path}`;

            const url2 = new URL(this.lastMedicalTeam.media[3].original_url);
            const path2 = url2.pathname;
            const url_image2 = `${environment.serverUrl}${path2}`;

            const url1 = new URL(this.lastMedicalTeam.media[0].original_url);
            const path1 = url1.pathname;
            const url_image1 = `${environment.serverUrl}${path1}`;

            if(idx===2){
              tmpMediaHierarchy.push({
                doctor: this.lastMedicalTeam.doctor_3,
                //image: image.original_url ,
                image: url_image ,
                level: 0,
                children: [
                  {
                    doctor: this.lastMedicalTeam.doctor_1,
                    image: url_image1  ,
                    level: 1,
                    children: []
                  },
                  {
                    doctor: this.lastMedicalTeam.doctor_4,
                    image: url_image2,
                    level: 1,
                    children: []
                  }
                ]
              });
            }
          });
          if(!this.isBrowser()) {
            this.seoService.setCanonicalUrl(`${window.location.protocol}//${window.location.host}${this.router.url}`);
          }

          for (const hashtag of this.hashtags) {
            this.metaService.addTag({ property: 'og:tag', content: hashtag.trim() });
          }
          //this.metaService.addTag();
          this.photos=tmpMediaHierarchy.map(root => this.convertToTreeNode(root));
          this.flatPhotos = this.getAllNodes(this.photos);
        //console.log(this.flatPhotos);
        },error:err=>{}
    });
  }
  convertToTreeNode(root: MedicalHierarchy): TreeNode  {
    return {
      label: root.doctor,
      type: 'person',
      styleClass: 'p-person',
      expanded: true,
      data: {
        name: root.doctor,
        image: root.image
      },
      children: (root.children ?? []).map(child => this.convertToTreeNode(child))
    };
  }

}
