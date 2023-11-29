import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CrafterService } from '../crafter/crafter.service';

import { 
  ERROR_SERVER_SENTENCE, 
  TOKEN_REFRESH_SENTENCE, 
  UNKWON_ERROR_SENTENCE, 
  WRONG_INFO_SENTENCE 
} from '@shared/data/sentences';
import { SnackTypeEnum } from '@shared/types/types.enums';

@Injectable({providedIn: 'root'})

export class ErrorHandlerService implements ErrorHandler {

  chunkFailedMessage = /Loading chunk [\d]+ failed/;

  constructor(private crafter: CrafterService) { }

  handleError(error: Error | HttpErrorResponse): void {
    switch (error.constructor) {
      case TypeError: { console.error('Type Error! ', error);
        break;
      }
      case Error: { console.error('General Error! ', error);
        break;
      }
    }

  }

  public showHttpError(err: HttpErrorResponse): void {
    switch (err.status) {
      case 406: this.crafter.setSnack(WRONG_INFO_SENTENCE,  SnackTypeEnum.WARNING)
        break;
      case 401: this.crafter.setSnack(TOKEN_REFRESH_SENTENCE,  SnackTypeEnum.INFO);
        break;
      case 0: case 500: this.crafter.setSnack(ERROR_SERVER_SENTENCE,  SnackTypeEnum.ERROR);
        break;
      default: this.crafter.setSnack(UNKWON_ERROR_SENTENCE,  SnackTypeEnum.ERROR);
    }
  }

}