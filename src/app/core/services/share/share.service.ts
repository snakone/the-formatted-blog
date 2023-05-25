import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Post } from '@shared/types/interface.types';

@Injectable()

export class ShareService {

  constructor() { }

  public async share(value: Post): Promise<void> {
    return new Promise((res, req) => {
      try {
        const canShare = navigator.canShare(value);
        if (!canShare) { req(false); }

        res(navigator.share(this.convertValueToData(value)));
      } catch (err) {
        req(err);
      }
    });
  }

  private convertValueToData(value: Post): ShareData {
    return {
      text: value.intro,
      title: value.title,
      url: environment.url + 'post/' + value.slug
    } satisfies ShareData
  }

}