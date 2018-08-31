
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface MMCDataInterface {
  id: number;
  title: string;
  imagePath: string;
  images: any;
    value: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})

export class MasonModalCarouselDataService {

  private _url = '../../assets/data/mason-modal-carousel.json';

  constructor(private _httpClient: HttpClient) { }

  public mmcData (): Observable<MMCDataInterface[]> {
    return this._httpClient.get<MMCDataInterface[]>(this._url);
  }
}
