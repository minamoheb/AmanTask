import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private SpinnerService: NgxSpinnerService) { }
  show() {
    setTimeout(() => this.SpinnerService.show(), 0);
  }

  hide() {
    setTimeout(() => this.SpinnerService.hide(), 0);
  }
}
