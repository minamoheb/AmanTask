import { Component,OnInit} from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  dir: string;
  currentLang = 'EN';
  constructor(public translate: TranslateService) 
    { 
    translate.addLangs(['EN', 'AR']);
    if (localStorage.getItem('currentLang')) {
      const browserLang = localStorage.getItem('currentLang');
      translate.use(browserLang.match(/EN|AR/) ? browserLang : 'EN');
    } else {
      localStorage.setItem('currentLang', 'EN');
      translate.setDefaultLang('EN');
    }


    document.dir = this.dir = 'ltr';
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang === 'AR') {
        this.translate.use('EN');
        document.dir = this.dir = 'ltr';
      } else {
        this.translate.use('EN');
        document.dir = this.dir = 'ltr';
      }
    }); 
  }

  ngOnInit() {
 }


 

  }  
 
