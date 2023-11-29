import { 
  Component, 
  AfterViewInit, 
  ViewChild, 
  ElementRef 
} from '@angular/core';

import { CrafterService } from '@core/services/crafter/crafter.service';
import { FADE_IN_LEFT_CLASS, FADE_OUT_LEFT_CLASS } from '@shared/data/constants';
import { Snack } from '@shared/types/interface.app';
import { Subject, debounceTime, takeUntil } from 'rxjs';

const delay = 800;

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss']
})

export class SnackOverlayComponent implements AfterViewInit {

  @ViewChild('snack', {static: false}) el!: ElementRef<any>;
  data!: Snack | null;
  $unsubscribe = new Subject<void>();
  count = 0;

  constructor(private crafter: CrafterService) { }

  ngAfterViewInit(): void {
    this.crafter.snack$
    .pipe(takeUntil(this.$unsubscribe), debounceTime(100))
     .subscribe((res: Snack) => this.handleCSS(res));
  }

  private handleCSS(res: Snack): void {
    if (!this.count) {
      this.data = res;
      this.count++;
      return;
    }

    this.el?.nativeElement.classList?.remove(FADE_IN_LEFT_CLASS);
    this.el?.nativeElement.classList?.add(FADE_OUT_LEFT_CLASS);
    this.waitAndSetSnack(res);
  }

  private waitAndSetSnack(res: Snack): void {
    setTimeout(() => this.data = null, delay);

    if (!res.message) {
      this.count = 0;
      return;
    }

    setTimeout(() => (this.data = res, this.count++), delay * 2); 
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

}
