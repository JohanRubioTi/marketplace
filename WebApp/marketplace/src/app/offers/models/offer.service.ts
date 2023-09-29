// offer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from './offer.model';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = 'API_URL';

  constructor(private http: HttpClient) {}

  getOffersByPage(page: number, pageSize: number): Observable<Offer[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Offer[]>(`${this.apiUrl}/offers`, { params });
  }
}
