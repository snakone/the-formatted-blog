import { Inject, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({providedIn: 'root'})

export class PWAService {

  constructor(
      private swUpdate: SwUpdate,
      @Inject(DOCUMENT) private document: Document
  ) { }

  public updateSW(): void {
    this.swUpdate.versionUpdates
     .pipe(
       filter(event => event && !!event)
      )
      .subscribe(_ => {
        this.swUpdate.activateUpdate()
        .then(() => this.document.location.reload());
    });
  }

}