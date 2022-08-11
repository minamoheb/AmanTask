import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/components/widgets/confirmation-dialog/confirmation-dialog.component';


import { environment } from '../../../environments/environment';
import { ConfirmDialogType } from 'src/app/models/global';
import { DOCUMENT } from '@angular/common';
@Injectable({
    providedIn: 'root',
})
export class GlobalFunctionsService {
    //#region variables
    myComponent: any;
    pageMode: string;
    confirmationDialogRef: MatDialogRef<ConfirmationDialogComponent>;

    subscriptions: Subscription[] = [];

    constructor(
        private translate: TranslateService,
      private dialog: MatDialog,
      @Inject(DOCUMENT) private document: Document) {

    }
    //#endregion
    //#region  Functions



 
    // ******************************set Global variables  ************************

    disposed(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe);
    }

    // *********************** Show Message Dialog **************************
    //#region Show Message Dialog
    openShowMessageDialog(message: string, actiontype: any): void {
        this.confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: { type: ConfirmDialogType.Info, msg: message },
        });
        this.subscriptions.push(
            this.confirmationDialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    this.myComponent.showMessageOkClicked(actiontype);
                } else {
                    this.myComponent.showMessageCancelClicked(actiontype);
                }
            }));
    }
    //#endregion

    //#endregion


}
