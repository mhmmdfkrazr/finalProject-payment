import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Payment } from 'src/app/models/payment';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-payment',
  templateUrl: './table-payment.component.html',
  styleUrls: ['./table-payment.component.css']
})
export class TablePaymentComponent implements OnInit {
  payments: Payment[] = [];

  closeResult = '';

  currentPayment: Payment = {} as Payment;


  constructor(public service: PaymentService, private modalService: NgbModal, private router: Router) { }

  getPayments() {
    this.service.getPayments().subscribe((dataSource: Payment[]) => {
      this.payments = dataSource
    });
  };

  form = {
    updateData: new FormGroup ({
      paymentDetailId: new FormControl(),
      cardOwnerName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(16)]),
      securityCode: new FormControl('', [Validators.required]),
      expirationDate: new FormControl('', [Validators.required]),
    })
  }

  get paymentDetailId() {
    return (this.form.updateData.get('paymentDetailId'));
  }
  get cardOwnerName() {
    return (this.form.updateData.get('cardOwnerName'));
  }
  get cardNumber() {
    return (this.form.updateData.get('cardNumber'));
  }
  get securityCode() {
    return (this.form.updateData.get('securityCode'));
  }
  get expirationDate() {
    return (this.form.updateData.get('expirationDate'));
  }

  ngOnInit(): void {
    this.getPayments()
  }

  refreshTable() {
    this.getPayments()
  }

  updatePayment() {
    this.service.updatePayment(this.form.updateData.value, this.currentPayment).subscribe((res) => {
      this.getPayments();
      this.form.updateData.reset();
    });
  }

  deletePayment(id: number) {
    this.service.deletePayment(id).subscribe((res) => {
      this.getPayments();
      this.router.navigate(['home']);
    });
  }

  open(content: any, payment: Payment) {
    this.modalService.open(content, { size: 'xl' });

    this.form.updateData.patchValue ({
      paymentDetailId: payment.paymentDetailId,
      cardOwnerName: payment.cardOwnerName,
      cardNumber: payment.cardNumber,
      securityCode: payment.securityCode,
      expirationDate: payment.expirationDate
    });

    this.currentPayment = payment;
  }

}
