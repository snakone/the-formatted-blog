import { 
  Component, 
  AfterViewInit, 
  ViewChild, 
  ElementRef 
} from '@angular/core';

import { SnackService } from '@core/services/snack/snack.service';
import { Snack } from '@shared/types/interface.types';

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss']
})

export class SnackComponent implements AfterViewInit {

  @ViewChild('snack') el!: ElementRef<any>;
  data!: Snack;
  css!: DOMTokenList;

  constructor(private snackSrv: SnackService) { }

  ngAfterViewInit(): void {
    this.snackSrv.snack$
     .subscribe((res: Snack) => !res.message ? 
                                this.removeCSS(res) : 
                                this.data = res);
  }

  private removeCSS(res: Snack): void {
    this.css = this.el?.nativeElement.classList || null;
    this.css?.remove('fadeInLeft');
    this.css?.add('fadeOutLeft');
    setTimeout(() => this.data = res, 800); // Animation Delay
  }

}
