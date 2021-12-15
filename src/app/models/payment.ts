import { PaymentService } from "../services/payment.service";

export interface Payment {
    paymentDetailId: number
    cardOwnerName: string
    cardNumber: string
    securityCode: string
    expirationDate: Date
}