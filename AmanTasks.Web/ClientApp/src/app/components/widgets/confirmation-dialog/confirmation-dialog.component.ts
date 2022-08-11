import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConfirmDialogType, IConfirmDialogObj } from 'src/app/models/global';
import { GlobalApiService } from 'src/app/services/global/global-api.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent implements OnInit {
  Form: FormGroup;
  isDelete = false;
  isAction = false;
  isInfo = false;
  htmlMsg: string;
  done = true;
  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmDialogObj, public formBuilder: FormBuilder, public globalApiService: GlobalApiService,
  ) {
    this.initialize();
  }
  ngOnInit(): void {
  }
  btnOkClicked(): void {
    //if (this.isDelete) {
    //  if (this.Form.controls.password.value !== null && this.Form.controls.password.value !== '') {
    //    this.checkConfirmPass(this.Form.controls.password.value);
    //  } else { this.Form.controls.password.setErrors({ required: true }); }
    //} else {
      this.dialogRef.close(true);
   // }
  }
  btnCancelClicked(): void {
    this.dialogRef.close(false);
  }
  get password(): AbstractControl { return this.Form.get('password'); }
  initialize(): void {
    if (this.data.type === ConfirmDialogType.Delete) {
      this.isDelete = true;
      ////////////////////
      this.Form = this.formBuilder.group({
        password: [''],
      });
      //////////////////////////
    } else if (this.data.type === ConfirmDialogType.Action) { this.isAction = true; } else {
      this.isInfo = true;
      this.bindMsg();
    }
  }
  checkConfirmPass(pass): void {
    this.globalApiService.CheckConfirmDeletePass(pass).subscribe((res: { status: any }) => {
      if (res) {
        // this code for add mode
        console.log(res);
        if (res.status === 1) {
          this.dialogRef.close(true);
        } else { this.Form.controls.password.setErrors({ invalidPass: true }); }
      } else {
        this.Form.controls.password.setErrors({ invalidPass: true });
      }
    }, (err) => {
      console.log(err);
      this.Form.controls.password.setErrors({ invalidPass: true });
    });
  }
  bindMsg(): void {
    if (this.data.msg.indexOf('MSG-Fail') > -1) {
      // error msg
      this.done = false;
      this.htmlMsg = '<p><span class="redMsg">' + this.data.msg + '</span></p>';
    } else {
      this.done = true;
      this.htmlMsg = '<p>' + this.data.msg + '</p>';
    }
  }
}

