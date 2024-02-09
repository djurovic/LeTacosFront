import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Porudzbina } from '../models/Porudzbina';
import {catchError} from "rxjs/operators";
import {apiUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class PorudzbinaService {
  private porudzbinaUrl = `${apiUrl}/porudzbina`; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getAllPorudzbine(page = 1, size = 10): Observable<Porudzbina[]> {
    const url = `${this.porudzbinaUrl}?page=${page}&size=${size}`;
    return this.http.get<Porudzbina[]>(url);
  }

  getPorudzbinaById(id: number): Observable<Porudzbina> {
    const url = `${this.porudzbinaUrl}/${id}`;
    return this.http.get<Porudzbina>(url);
  }

  createPorudzbina(porudzbina: Porudzbina): Observable<Porudzbina> {
    return this.http.post<Porudzbina>(this.porudzbinaUrl, porudzbina);
  }

  updatePorudzbina(id: number, porudzbina: Porudzbina): Observable<Porudzbina> {
    const url = `${this.porudzbinaUrl}/${id}`;
    return this.http.put<Porudzbina>(url, porudzbina);
  }

  deletePorudzbina(id: number): Observable<void> {
    const url = `${this.porudzbinaUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  cancel(orderId: number): Observable<Porudzbina> {
    return this.http.patch<Porudzbina>(`${this.porudzbinaUrl}/cancel/${orderId}`, null).pipe(
      catchError((error: any) => {
        // Handle errors (e.g., log, show a notification, etc.)
        console.error('Error cancelling order', error);
        // Return an observable with an appropriate default value or rethrow the error
        return of(null);
      })
    );
  }
  finish(orderId: number, vreme: string): Observable<Porudzbina> {
    return this.http.patch<Porudzbina>(`${this.porudzbinaUrl}/finish/${orderId}`, { vreme }).pipe(
      catchError(error => {
        console.error('Error finishing order', error);
        return of(null);
      })
    );
  }
  
}
