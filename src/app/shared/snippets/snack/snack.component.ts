import { 
  Component, 
  AfterViewInit, 
  ViewChild, 
  ElementRef 
} from '@angular/core';

import { CrafterService } from '@core/services/crafter/crafter.service';
import { Snack } from '@shared/types/interface.app';
import { Subject, debounceTime, takeUntil } from 'rxjs';

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
  animationDelay = 800;
  classIn = 'fadeInLeft';
  classOut = 'fadeOutLeft';

  constructor(private crafter: CrafterService) { }

  ngAfterViewInit(): void {
    this.crafter.snack$
    .pipe(takeUntil(this.$unsubscribe), debounceTime(100))
     .subscribe((res: Snack) => this.removeCSS(res));
  }

  private removeCSS(res: Snack): void {
    if (!this.count) {
      this.data = res;
      this.count++;
      return;
    }

    this.el?.nativeElement.classList?.remove(this.classIn);
    this.el?.nativeElement.classList?.add(this.classOut);
    this.waitAndSetSnack(res);
  }

  private waitAndSetSnack(res: Snack): void {
    setTimeout(() => this.data = null, this.animationDelay);

    if (!res.message) {
      this.count = 0;
      return;
    }

    setTimeout(() => (this.data = res, this.count++), this.animationDelay * 2); 
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

}
