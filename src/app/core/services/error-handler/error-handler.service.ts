import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()

export class ErrorHandlerService implements ErrorHandler {

  chunkFailedMessage = /Loading chunk [\d]+ failed/;

  constructor() { }

  handleError(error: Error | HttpErrorResponse): void {

    switch (error.constructor) {
      case TypeError: {
        console.error('Type Error! ', error);
        break;
      }
      case Error: {
        console.error('General Error! ', error);
        break;
      }
    }

    if (error instanceof HttpErrorResponse) {
      console.error('HTTP Error! ', error);
    }

    if (this.chunkFailedMessage.test(error?.message)) {
      window.location.reload();
    }

    throw error;
  }

}