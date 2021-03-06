import { Injectable } from '@angular/core';

declare const StickySidebar: any;

@Injectable({providedIn: 'root'})

export class StickyService {

  // tslint:disable-next-line: variable-name
  private _sticked = false;
  stickyElement: any | undefined;

  constructor() { }

  public get sticky(): boolean {
    return this._sticked;
  }

  public setSticky(v: boolean): void {
    this._sticked = v;
  }

  public startSticky(selector: string): void {
    if (!this.sticky) {
      this.stickyElement =  new StickySidebar('.sidebar', {
        topSpacing: 72,
        bottomSpacing: 20,
        resizeSensor: false,
        containerSelector: `.${selector}`,
        innerWrapperSelector: '.sidebar__inner'
      });

      this.setSticky(true);
    }
  }

  public destroy(): void {
    if (this.stickyElement) {
      this.stickyElement.destroy();
      this.stickyElement = null;
      this.setSticky(false);
    }
  }

}
