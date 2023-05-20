import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable()

export class UtilsService {

  constructor() { }

  public getFriendlyLocation(): Promise<string> {
    return new Promise((res, req) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(((pos: GeolocationPosition) => {
          const { latitude, longitude } = pos.coords;
          const geocodingAPI = getURL(latitude, longitude);

          fetch(geocodingAPI)
           .then((res) => res.json() as Promise<GeocodingResponse>)
            .then(data => {
            if (data.status.code !== 200) {
              req(data.status.message);
            }
            const country = data.results[0].components.country;
            const region = data.results[0].components.state || data.results[0].components.region;
            res(`${country} - ${region}`);
          });
        }), (err) => req(err));
      } else {
        req('Geolocalización no soportada en este navegador');
      }
    });
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
