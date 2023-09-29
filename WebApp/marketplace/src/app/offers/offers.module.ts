import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfferItemComponent} from './offer-item/offer-item.component';
import {OfferCreationComponent} from './offer-creation/offer-creation.component';
import {OfferListComponent} from './offer-list/offer-list.component';
import {ReactiveFormsModule} from '@angular/forms';

import { OfferService } from './models/offer.service';



@NgModule({
  declarations: [OfferItemComponent, OfferCreationComponent, OfferListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [OfferService],
})
export class OffersModule { }
