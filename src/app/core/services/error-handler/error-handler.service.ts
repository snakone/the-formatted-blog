import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackService } from '../snack/snack.service';

@Injectable()

export class ErrorHandlerService implements ErrorHandler {

  chunkFailedMessage = /Loading chunk [\d]+ failed/;

  constructor(private snackSrv: SnackService) { }

  handleError(error: Error | HttpErrorResponse): void {
    switch (error.constructor) {
      case TypeError: { console.error('Type Error! ', error);
        break;
      }
      case Error: { console.error('General Error! ', error);
        break;
      }
    }

    if (this.chunkFailedMessage
       .test(error?.message)) { 
         window.location.reload(); 
    }

    throw error;
  }

  public showError(err: HttpErrorResponse): void {
    switch (err.status) {
      case 406: this.snackSrv.setSnack('No Válido!', 'warning')
        break;
      case 401: this.snackSrv.setSnack('Token Actualizado', 'info');
        break;
      case 0: this.snackSrv.setSnack('Server Error!', 'error');
        break;
      default: console.log(err);
    }
  }

}