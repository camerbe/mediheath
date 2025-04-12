import { title } from 'node:process';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  meta:Meta=inject(Meta);
  title:Title=inject(Title);
  constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(DOCUMENT) private document: Document,) { }
  setTitle(title: string):void {
    this.title.setTitle(title);
  }
  clearAllMetaTags():void {
    const tags = this.meta.getTags('');
    tags.forEach(tag => this.meta.removeTagElement(tag));
  }
  setMetaTags(tags: { name?: string; property?: string; content: string }[]): void {
    this.clearAllMetaTags();
    tags.forEach(tag => this.meta.addTag(tag));
  }
  clearMetaTagsOnServerOnly(): void {
    if (isPlatformServer(this.platformId)) {
      this.clearAllMetaTags();
    }
  }
  setTitleAndMeta(title: string, tags: { name?: string; property?: string; content: string }[]): void {
    this.setTitle(title);
    this.setMetaTags(tags);
  }
  setCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");

    if (link) {
      link.setAttribute('href', url);
    } else {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      this.document.head.appendChild(link);
    }
  }
}
