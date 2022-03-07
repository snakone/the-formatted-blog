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

  constructor(private snackSrv: SnackService) { }

  ngAfterViewInit(): void {
    this.snackSrv.snack$
     .subscribe((res: Snack) => {
      if (!res.message) {
        const css = this.el?.nativeElement.classList || null;
        css?.remove('fadeInLeft');
        css?.add('fadeOutLeft');

        setTimeout(() => {
          this.data = res;
        }, 800);
      } else {
        this.data = res;
      }
    });
  }

}
