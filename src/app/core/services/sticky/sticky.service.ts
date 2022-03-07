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
    if (!selector) { return; }

    try {
      this.stickyElement = new StickySidebar('.sidebar', {
        topSpacing: 72,
        bottomSpacing: 20,
        resizeSensor: false,
        containerSelector: `.${selector}`,
        innerWrapperSelector: '.sidebar__inner'
      });
      
      this.setSticky(true);
    } catch (err) { console.log(err); }
  }

  public checkSticky(): void {
    if (
      window.document.body.clientWidth < 992
      && this.sticky
    ) { this.destroy(); }  // Prevent Sticky Sidebar
  }

  public destroy(): void {
    if (this.stickyElement) {
      this.stickyElement.destroy();
      this.setSticky(false);
    }
  }

}
