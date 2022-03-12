import { 
  Component, 
  AfterViewInit, 
  ViewChild, 
  ElementRef 
} from '@angular/core';

import { SnackService } from '@core/services/snack/snack.service';
import { Snack } from '@shared/types/interface.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss']
})

export class SnackComponent implements AfterViewInit {

  @ViewChild('snack') el!: ElementRef<any>;
  data!: Snack | null;
  $unsubscribe = new Subject<void>();
  count = 0;

  constructor(private snackSrv: SnackService) { }

  ngAfterViewInit(): void {
    this.snackSrv.snack$
    .pipe(takeUntil(this.$unsubscribe))
     .subscribe((res: Snack) => this.removeCSS(res));
  }

  private removeCSS(res: Snack): void {
    if (!this.count) {
      this.data = res;
      this.count++;
      return;
    }

    const css: DOMTokenList = this.el?.nativeElement.classList || null;
    css?.remove('fadeInLeft');
    css?.add('fadeOutLeft');

    setTimeout(() => this.data = null, 800); // Animation Delay
    !res.message ? this.count = 0 : 
    setTimeout(() => (this.data = res, this.count++), 800)
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

}
