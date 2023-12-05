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
import { StorageService } from '../storage/storage.service';
import { REFRESH_TOKEN_KEY } from '@shared/data/constants';

@Injectable({providedIn: 'root'})

export class ErrorHandlerService implements ErrorHandler {

  chunkFailedMessage = /Loading chunk [\d]+ failed/;

  constructor(private crafter: CrafterService, private ls: StorageService) { }

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
    const showErrorOnTokenRefresh = this.ls.getSettings(REFRESH_TOKEN_KEY);
    switch (err.status) {
      case 406: this.crafter.setSnack(WRONG_INFO_SENTENCE,  SnackTypeEnum.WARNING)
        break;
      case 401: showErrorOnTokenRefresh ? this.crafter.setSnack(TOKEN_REFRESH_SENTENCE,  SnackTypeEnum.INFO) : null;
        break;
      case 0: case 500: this.crafter.setSnack(ERROR_SERVER_SENTENCE,  SnackTypeEnum.ERROR);
        break;
      default: this.crafter.setSnack(UNKWON_ERROR_SENTENCE,  SnackTypeEnum.ERROR);
    }
  }

}