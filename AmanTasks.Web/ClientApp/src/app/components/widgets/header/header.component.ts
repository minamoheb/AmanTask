import { Component, OnInit} from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { DataService } from './../../../services/data.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { GlobalFunctionsService } from './../../../services/global/global-functions.service';
declare function offcanvasInit(): any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  formItem: FormGroup;
  formModeChange;
  subscription: Subscription;


  constructor(public translate: TranslateService, public ds: DataService,
    public gfs: GlobalFunctionsService,
    private fb: FormBuilder) {
  }



  ngOnInit() {
  }
  ngAfterViewInit(): void {

    offcanvasInit();
  }




}
