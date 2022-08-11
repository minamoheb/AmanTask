import { Component, ElementRef, OnDestroy, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';

import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DataService } from './../../../../services/data.service';
import { GlobalFunctionsService } from './../../../../services/global/global-functions.service';
import { ConfirmDialogType } from '../../../../Models/global';
import { PersonData } from 'src/app/Models/models.model';
import { ConfirmationDialogComponent } from 'src/app/components/widgets/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit, OnDestroy, AfterViewInit {

  //#region variables
  displayedColumns: string[] = ['code', 'name', 'address','email', 'Action'];
  dataSource: MatTableDataSource<PersonData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('frame', { static: false }) public modal: any;
  compNativeElement: any;
  formitem: FormGroup;
  addressdata;

  submitted = false;
  edit = false;
  PersonData: PersonData[] = [];
  confirmationDialogRef: MatDialogRef<ConfirmationDialogComponent>;
  //#endregion
  //#region constructor
  constructor(

    private fb: FormBuilder,
    private el: ElementRef,
    public dialog: MatDialog,
    private router: Router,
    public translate: TranslateService,
    public gfs: GlobalFunctionsService,
    public ds: DataService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.dataSource = new MatTableDataSource();
    this.compNativeElement = this.el.nativeElement;
    // create form

  }




  //#endregion
  //#region Actions



  addnew() {
    this.edit = false;
    this.formitem.reset();

    this.showModal();
  }
  showModal() {
    this.modal.show();
  }

  getpersondatabyid(id: any) {

    this.getDataById(id).subscribe((res: any) => {
      if (res) {
        this.formitem.patchValue({
          id: res.id,
          name:res.name,
          addressId: res.addressId,
          email:res.email


        });
      }
    });
    this.edit = true;
    this.showModal();
  }

  getallpersondata() {
    this.dataSource.data = [] as PersonData[];
    this.getData().subscribe((res: any) => {
      if (res) {
        this.dataSource.data = res;
      }

    });

  }
  getalladdressdata() {

    this.getAddressData().subscribe((res: any) => {
      if (res) {
        this.addressdata = res;
      }

    });

  }
  saveaction() {

    this.onSubmit().then((res) => {
      if (res) {
        const saveObj = Object.assign({}, this.formitem.getRawValue());

        if (!this.edit) {
          this.gfs.subscriptions.push(

            this.postData(saveObj).subscribe((response: { success: any, id: any }) => {
              if (response) {
                if (response.success) {
                  this.SuccessProcess();
                } else {
                  this.FaildProcess();
                }
              }
            }, () => {
              this.gfs.openShowMessageDialog((this.translate.instant('MSGFail')), '');
            }));
        }
        else {
          this.gfs.subscriptions.push(

            this.putData(saveObj).subscribe((response: { success: any, id: any }) => {
              if (response) {
                if (response.success) {
                  this.SuccessProcess();

                } else {
                  this.FaildProcess();
                }
              }
            }, () => {
              this.FaildProcess();
            }));
        }
      }
    });

  }
  deleteaction(id: any) {
    this.confirmationDialogRef = (this.dialog.open(ConfirmationDialogComponent, {
      data: { type: ConfirmDialogType.Delete, msg: this.translate.instant('MSGConfirmDelete') },
    })) as MatDialogRef<ConfirmationDialogComponent, any>;
    this.confirmationDialogRef.afterClosed().subscribe((result) => {
      if (result) {


        this.gfs.subscriptions.push(
          this.deleteData(id).subscribe((response: { success: any, id: any }) => {
            if (response) {
              if (response.success) {
                this.SuccessProcess();
              } else {
                this.FaildProcess();
              }
            }
          }, () => {
            this.FaildProcess();
          }));
      }
    });
  }


  SuccessProcess() {
    this.gfs.openShowMessageDialog((this.translate.instant('MSGSuccess')), '');
    this.formitem.reset();
    this.getallpersondata();
    this.modal.hide();
  }
  FaildProcess() {
    this.gfs.openShowMessageDialog((this.translate.instant('MSGFail')), '');
    this.formitem.reset();
    this.modal.hide();

  }

  //#endregion
  // #region  Functions

  async onSubmit(): Promise<boolean> {
    this.submitted = true;
    if (this.formitem.invalid) {
      return;
    }
    const obj = Object.assign({}, this.formitem.getRawValue());
    return obj;
  }
  get f() {
    return this.formitem.controls;
  }
  CancelFunc() {
    this.formitem.reset({});
    this.modal.hide();
  }
  ngOnDestroy(): void {
    // ... Mandatory
    this.gfs.disposed();
  }
  ngOnInit(): void {

    this.getallpersondata();
    this.getalladdressdata();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.compNativeElement = this.el.nativeElement;
    this.formitem = this.fb.group({
      id: [],
      name: ['', Validators.required],
      addressId: ['', Validators.required],
      email: ['', Validators.email]
    });

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //#endregion

  //#region Private Functions

  getAddressData(): Observable<any> {
    return this.ds.get('AddressData');
  }
  getData(): Observable<any> {
    return this.ds.get('PersonData');
  }
  getDataById(id): Observable<any> {
    const result = this.ds.get('PersonData/' + id);
    return result;
  }
  postData(data): Observable<any> {
    return this.ds.post('PersonData', data);
  }
  putData(data): Observable<any> {
    return this.ds.put('PersonData', data);
  }
  deleteData(id): Observable<any> {
    return this.ds.delete('PersonData/', id);
  }
  //#endregion

}
