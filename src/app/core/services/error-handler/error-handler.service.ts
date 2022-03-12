import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackService } from '../snack/snack.service';

import { 
  ERROR_SERVER_SENTENCE, 
  TOKEN_REFRESH_SENTENCE, 
  UNKWON_ERROR_SENTENCE, 
  WRONG_INFO_SENTENCE 
} from '@shared/data/sentences';

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

    if (this.chunkFailedMessage.test(error?.message)) { 
      window.location.reload();
    }
    throw error;
  }

  public showError(err: HttpErrorResponse): void {
    switch (err.status) {
      case 406: this.snackSrv.setSnack(WRONG_INFO_SENTENCE, 'warning')
        break;
      case 401: this.snackSrv.setSnack(TOKEN_REFRESH_SENTENCE, 'info');
        break;
      case 0: case 500: this.snackSrv.setSnack(ERROR_SERVER_SENTENCE, 'error');
        break;
      default: this.snackSrv.setSnack(UNKWON_ERROR_SENTENCE, 'error');
    }
  }

}