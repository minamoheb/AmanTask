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
import { AddressData } from 'src/app/Models/models.model';
import { ConfirmationDialogComponent } from 'src/app/components/widgets/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, OnDestroy, AfterViewInit  {

  //#region variables
  displayedColumns: string[] = ['code', 'name', 'Action'];
  dataSource: MatTableDataSource<AddressData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('frame', { static: false }) public modal: any;
  compNativeElement: any;
  formitem: FormGroup;


  submitted = false;
  edit = false;
  Address: AddressData[] = [];
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

  BtnAddSaveClick(): void { }
  BtnDeleteClick(): void {


  }


  addnew() {
    this.edit = false;
    this.formitem.reset();
    this.showModal();
  }
  showModal() {
    this.modal.show();
  }

  getaddressdatabyid(id: any) {

    this.getDataById(id).subscribe((res: any) => {
      if (res) {
        this.formitem.patchValue({
          id: res.id,
          addressName: res.addressName,


        });
      }
    });
    this.edit = true;
    this.showModal();
  }

  getalladdressdata() {
    this.dataSource.data = [] as AddressData[];
    this.getData().subscribe((res: any) => {
      if (res) {
        this.dataSource.data = res;
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
                this.FaildProcess();
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


  SuccessProcess() {
    this.gfs.openShowMessageDialog((this.translate.instant('MSGSuccess')), '');
    this.formitem.reset();
    this.getalladdressdata();
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
    this.getalladdressdata();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.compNativeElement = this.el.nativeElement;
    this.formitem = this.fb.group({
      id: [],
      addressName: ['', Validators.required],
    });

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //#endregion

  //#region Private Functions


  getData(): Observable<any> {
    return this.ds.get('AddressData');
  }
  getDataById(id): Observable<any> {
    const result = this.ds.get('AddressData/' + id);
    return result;
  }
  postData(data): Observable<any> {
    return this.ds.post('AddressData', data);
  }
  putData(data): Observable<any> {
    return this.ds.put('AddressData', data);
  }
  deleteData(id): Observable<any> {
    return this.ds.delete('AddressData/', id);
  }
  //#endregion

}
