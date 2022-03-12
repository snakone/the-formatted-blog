import { Inject, Injectable } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { filter, Observable, of, switchMap } from 'rxjs';
import { DOCUMENT } from '@angular/common';

import { HttpService } from '../http/http.service';
import { StorageService } from '../storage/storage.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from '@env/environment';
import { SWResponse, NotificationPayload } from '@shared/types/interface.types';
import { WELCOME_PUSH } from '@shared/data/notifications';
import { SnackService } from '../snack/snack.service';
import { SUB_UPDATED_SENTENCE } from '@shared/data/sentences';
import { CrafterService } from '../crafter/crafter.service';
import { PushDeniedOverlayComponent } from '@shared/layout/overlays/push-denied/push-denied.component';

@Injectable({providedIn: 'root'})

export class PWAService {

  readonly API_SUBSCRIPTION = environment.api + 'subscription';
  readonly API_NOTIFICATION = environment.api + 'notification';
  readonly pushKey = environment.keys.push;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpService,
    private ls: StorageService,
    private swUpdate: SwUpdate,
    private swPush: SwPush,
    private deviceDetector: DeviceDetectorService,
    private snackSrv: SnackService,
    private crafter: CrafterService
  ) { }

  public updateSW(): void {
    this.swUpdate.versionUpdates
     .pipe(
       filter(event => event && !!event)
      )
      .subscribe(_ => {
        this.swUpdate.activateUpdate()
        .then(() => this.document.location.reload());
    });
  }

  public showPrompt(timer = 10000): void {
    setTimeout(() => {
      this.swPush.requestSubscription({
        serverPublicKey: this.pushKey
      }).then((sub: PushSubscription) => {
        if (sub) {
          this.save(sub)
            .pipe(
              switchMap(_ => !_.updated ? 
                this.send(
                  this.set(Object.assign({}, WELCOME_PUSH)
              )) : of(null))
            )
          .subscribe(_ => !_ ?? 
            this.snackSrv.setSnack(SUB_UPDATED_SENTENCE));
        }
      })
      .catch(err => console.error(err));
    }, timer);
  }

  public async requestNotification(): Promise<void> {
    const permission = await Notification.requestPermission();
    this.showPrompt(1000);
    permission !== 'granted' ?? this.openPushModal();
  }

  public save(
    sub: PushSubscription
  ): Observable<SWResponse> {
    return this.http
      .post<SWResponse>(
        this.API_SUBSCRIPTION,
        { sub, device: this.setDevice() }
      ).pipe(
        filter(res => res && !!res.ok)
      );
  }

  public send(
    payload: NotificationPayload
  ): Observable<SWResponse> {
    return this.http
      .post<SWResponse>(this.API_NOTIFICATION, { payload })
      .pipe(
        filter(res => res && !!res.ok)
      );
  }

  private set(
    payload: NotificationPayload
  ): NotificationPayload {
    payload.user = this.ls.get('id');
    return payload;
  }

  private setDevice(): string {
    return this.deviceDetector.isDesktop() ? 'Desktop' : 'Mobile';
  }

  private openPushModal(): void {
    setTimeout(() => {
      this.crafter.dialog(PushDeniedOverlayComponent);
    }, 333);
  }

}