import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {

    constructor(private snackBar: MatSnackBar) {
    }

    notifySuccess(message: string) {
        this.snackBar.open(message, 'close', this.configSucces);
    }

    notifyError(message: string) {
    this.snackBar.open(message, 'close', this.configError);
    }

    private configSucces: MatSnackBarConfig = {
        duration: 5000,
        panelClass: ['style-succes'], 
        verticalPosition: 'top'   
      };
    
      private configError: MatSnackBarConfig = {
        duration: 5000,
        panelClass: ['style-error'], 
        verticalPosition: 'top'
      }
}