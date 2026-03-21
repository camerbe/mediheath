import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "../../../environments/environment.development";


@Pipe({ name: 'replaceHost' })
export class ReplaceHostPipe implements PipeTransform {
  transform(url: string): string {
    if (!url) {
      return '';
    }
    return url.replace('http://localhost', environment.serverUrl);
  }
}
