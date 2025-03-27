import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  init={
    path_absolute : "/",
    relative_urls: false,
    base_url: '/tinymce',
    suffix: '.min',
    height: 450,
    menubar: 'file edit view insert format tools table tc help',
    toolbar_sticky: false,

    // @ts-ignore
    file_picker_callback : function(callback, value, meta) {
      var x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
      var y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;
      //var cmsURL = `${environment.baseUrl}api/laravel-filemanager?editor=` + meta.fieldname;
      var cmsURL = `${environment.baseUrl}/laravel-filemanager?editor=${meta.fieldname}`;
      //const targetOrigin = "http://localhost:8000";

      if (meta.filetype == 'image') {

        cmsURL = cmsURL + "&type=Images";
        //console.log(`cmsURL: ${cmsURL}`);
      }
      else {
        cmsURL = cmsURL + "&type=Files";
        //console.log(`cmsURL: ${cmsURL}`);
      }

      // @ts-ignore
      // @ts-ignore

      tinymce.activeEditor.windowManager.openUrl({
        url : cmsURL,
        title : 'Camer-Sport',
        width : x * 0.8,
        height : y * 0.8,
        //resizable : 'yes',
        //close_previous : 'no',
        // @ts-ignore
        onMessage: (api, message) => {
          callback(message['content'])
        }

      });
    },
    plugins: [
      'image', 'media', 'tools', 'link', 'advlist',
      'autolink', 'lists', 'table', 'wordcount','code','searchreplace'
    ],
    toolbar:'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table mergetags  blockquote'

  };
}
