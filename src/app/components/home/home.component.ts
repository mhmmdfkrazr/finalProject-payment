import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Output() newTaskEvent = new EventEmitter<boolean>();

  constructor(public service: PaymentService, private modalService: NgbModal) { }

  form = {
    inputData: new FormGroup ({
      cardOwnerName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(16)]),
      securityCode: new FormControl('', [Validators.required]),
      expirationDate: new FormControl('', [Validators.required]),
    })
  }

  get cardOwnerName() {
    return (this.form.inputData.get('cardOwnerName'));
  }
  get cardNumber() {
    return (this.form.inputData.get('cardNumber'));
  }
  get securityCode() {
    return (this.form.inputData.get('securityCode'));
  }
  get expirationDate() {
    return (this.form.inputData.get('expirationDate'));
  }

  addNewPayment() {
    this.service.addNewPayment(this.form.inputData.value).subscribe((res) => {
      alert('Payment Added Successfully');
      this.form.inputData.reset();
      this.newTaskEvent.emit(true);
    },
    (err) => {
      alert('Something Went Wrong');
    });
  }

  open(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

}
