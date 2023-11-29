import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable()

export class UtilsService {

  constructor() { }

  public getFriendlyLocation(): Promise<string> {
    return new Promise((res, req) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((async (pos: GeolocationPosition) => {
          const { latitude, longitude } = pos.coords;
          const geocodingAPI = getURL(latitude, longitude);
          const response = await fetch(geocodingAPI);
          const data: GeocodingResponse = await response.json();

          if (data && data.status.code !== 200) {
            req(data.status.message);
          }

          res(this.setLocation(data.results[0]));
        }), (err) => req(err));
      } else {
        req('Geolocalización no soportada en este navegador');
      }
    });
  }

  private setLocation(result: GeocodingResult): string | null {
    if (!result) { return null; }
    const country = result.components.country;
    const region = result.components.state || result.components.region;
    return (!country || !region) ? null : `${country} - ${region}`;
  }
}

interface GeocodingResponse {
  results: GeocodingResult[];
  status?: {code: number, message: string}
}

interface GeocodingResult {
  components: {
    country: string;
    state?: string;
    region?: string;
  };
}

function getURL(lat: number, long: number): string {
  const URI = 'https://api.opencagedata.com/geocode/v1/json?key';
  return `${URI}=${environment.keys.geo}&language=es&no_annotations=1&q=${lat}+${long}`
}
