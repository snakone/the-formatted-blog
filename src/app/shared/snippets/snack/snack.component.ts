import { 
  Component, 
  ViewChild, 
  ElementRef, 
  DestroyRef
} from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { FADE_IN_LEFT_CLASS, FADE_OUT_LEFT_CLASS } from '@shared/data/constants';
import { Snack } from '@shared/types/interface.app';
import { debounceTime } from 'rxjs';

const delay = 800;

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss']
})

export class SnackOverlayComponent {

  @ViewChild('snack', {static: false}) el!: ElementRef<any>;
  data!: Snack | null;
  count = 0;

  constructor(private crafter: CrafterService, private destroyRef: DestroyRef) { }

  ngAfterViewInit(): void {
    this.crafter.snack$
    .pipe(
      takeUntilDestroyed(this.destroyRef), 
      debounceTime(100)
    )
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

}
