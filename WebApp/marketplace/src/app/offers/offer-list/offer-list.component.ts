
import { Component, OnInit } from '@angular/core';
import { OfferService } from '../models/offer.service';
import { Offer } from '../models/offer.model';
import { Page } from '../models/page.model';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
  offers: Offer[] = [];
  currentPage = 1; // You can set the initial page
  pageSize = 10; // You can set the page size
  page: Page<Offer[]>; // Define the 'page' property

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.offerService.getOffersByPage(this.currentPage, this.pageSize)
      .subscribe((page) => {// Update the code to receive a 'page' object
        this.pageIndex = page; // Assign the 'page' property
        this.offers = page.items; // Update the 'offers' property with 'page.items'
      });
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.loadOffers();
  }
}
