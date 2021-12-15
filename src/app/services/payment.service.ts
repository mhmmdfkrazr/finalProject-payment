import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { errorHandler } from '../helpers/errorHandler';
import { Payment } from '../models/payment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  endpoint: string = `https://finalproject-payment.herokuapp.com/api/paymentdetails`
  
  constructor(private http: HttpClient, private router: Router) { }

  getPayments(): Observable<any> {
    const api = `${this.endpoint}`
    return this.http.get(api)
    .pipe(catchError(errorHandler))
  }

  getPaymentDetail(id: number): Observable<any> {
    return (
      this.http
      .get(this.endpoint, {params: {id}})
      .pipe(catchError(errorHandler))
    )
  }

  addNewPayment(payment: Payment): Observable<any> {
    return (
      this.http
      .post(this.endpoint, payment)
      .pipe(catchError(errorHandler))
    )
  }

  updatePayment(id: number, payment: Payment): Observable<any> {
    payment.paymentDetailId = id
    return (
      this.http
      .put(`${this.endpoint}/${id}`, payment)
      .pipe(catchError(errorHandler))
    )
  }

  deletePayment(id: number): Observable<any> {
    return (
      this.http
      .delete(`${this.endpoint}/${id}`)
      .pipe( catchError(errorHandler) )
    )
  }
}
