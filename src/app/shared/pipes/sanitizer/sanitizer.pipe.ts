import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';

@Pipe({name: 'Sanitizer'})

export class SanitizerPipe implements PipeTransform {

  switchType: {[key: string]: (value: string) => SafeHtml | SafeStyle} = {
    html: (value) => this.sanitizer.bypassSecurityTrustHtml(value),
    style: (value) => this.sanitizer.bypassSecurityTrustStyle(value)
  }

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string, args?: string): any {
    if (args && this.switchType[args]) {
      return this.switchType[args](value);
    } else {
      return value;
    }
  }

}
