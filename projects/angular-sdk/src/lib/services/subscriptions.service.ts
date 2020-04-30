import { Injectable, Inject } from '@angular/core'
import { BASE_URL } from '../angular-sdk.module'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import {
    PaymentMethodListModel,
    PaymentMethodRetriveModel
} from '../models/subscription.model'

@Injectable({
    providedIn: 'root'
})
export class SubscriptionsService {
    public BASE_URL: string

    API_STRIPE_SUBSCRIPTION = environment.STRIPE_SUBSCRIPTION
    API_SUBSCRIPTION_PAYMENT_METHOD = environment.SUBSCRIPTION_PAYMENT_METHOD

    constructor(
        @Inject(BASE_URL) base_url_injected: string,
        private httpClient: HttpClient
    ) {
        this.BASE_URL = base_url_injected
    }

    cancelSubscription(id: string): Observable<String> {
        return this.httpClient.delete<String>(
            this.BASE_URL + this.API_STRIPE_SUBSCRIPTION + '/' + id
        )
    }

    uncancelSubscription(id: string): Observable<String> {
        return this.httpClient.post<String>(
            this.BASE_URL + this.API_STRIPE_SUBSCRIPTION + '/' + id + '/revive',
            null
        )
    }

    createPaymentMethod(
        tokenId: string
    ): Observable<PaymentMethodRetriveModel> {
        return this.httpClient.post<PaymentMethodRetriveModel>(
            this.BASE_URL + this.API_SUBSCRIPTION_PAYMENT_METHOD,
            {
                token_id: tokenId
            }
        )
    }

    attachPaymentMethod(
        paymentId: string
    ): Observable<PaymentMethodRetriveModel> {
        return this.httpClient.post<PaymentMethodRetriveModel>(
            this.BASE_URL + this.API_SUBSCRIPTION_PAYMENT_METHOD,
            {
                payment_method_id: paymentId
            }
        )
    }

    listAllPaymentMethods(): Observable<PaymentMethodListModel> {
        return this.httpClient.get<PaymentMethodListModel>(
            `${this.BASE_URL + this.API_SUBSCRIPTION_PAYMENT_METHOD}s`
        )
    }

    deletePaymentMethod(
        paymentId: string
    ): Observable<PaymentMethodRetriveModel> {
        return this.httpClient.delete<PaymentMethodRetriveModel>(
            `${this.BASE_URL +
                this.API_SUBSCRIPTION_PAYMENT_METHOD}/${paymentId}`
        )
    }

    doSubscription(stripe_plan: string, coupon: string): Observable<any> {
        return this.httpClient.post<any>(
            `${this.BASE_URL +
                this.API_STRIPE_SUBSCRIPTION}/${stripe_plan}/${coupon}`,
            null
        )
    }
}
