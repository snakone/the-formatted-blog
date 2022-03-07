import { Component, OnInit } from '@angular/core';
import { SnackService } from '@core/services/snack/snack.service';
import { NOTIFICATION_TOOLTIP } from '@shared/data/sentences';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {

  tooltip = NOTIFICATION_TOOLTIP;
  duration = 3000;

  constructor(private snackSrv: SnackService) { }

  ngOnInit(): void {
    this.snackSrv.setSnack('Cargando...', 'default', this.duration);
  }

  public goTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  public notification(): void {
    console.log('home');
  }

}
