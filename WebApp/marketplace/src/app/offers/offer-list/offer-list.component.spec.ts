import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Page } from './offer-list.component.ts';

import { OfferListComponent } from './offer-list.component';

describe('OfferListComponent', () => {
  let component: OfferListComponent;
  let fixture: ComponentFixture<OfferListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Page<T>', () => {
  let items: number[];
  let pageIndex: number;
  let pageCount: number;

  beforeEach(() => {
    items = [1, 2, 3, 4, 5];
    pageIndex = 0;
    pageCount = 1;
  });

  it('should be on the first page when only one page is available', () => {
    const page = new Page(items, pageIndex, pageCount);
    expect(page.isFirstPage).toBe(true);
    expect(page.isLastPage).toBe(true);
    expect(page.hasNextPage).toBe(false);
    expect(page.hasPreviousPage).toBe(false);
  });

  it('should be on the first page when there are many pages', () => {
    pageCount = 10;
    const page = new Page(items, pageIndex, pageCount);
    expect(page.isFirstPage).toBe(true);
    expect(page.isLastPage).toBe(false);
    expect(page.hasNextPage).toBe(true);
    expect(page.hasPreviousPage).toBe(false);
  });

  it('should be on a middle page when there are many pages', () => {
    pageCount = 10;
    pageIndex = 4;
    const page = new Page(items, pageIndex, pageCount);
    expect(page.isFirstPage).toBe(false);
    expect(page.isLastPage).toBe(false);
    expect(page.hasNextPage).toBe(true);
    expect(page.hasPreviousPage).toBe(true);
  });

  it('should be on the last page when there are many pages', () => {
    pageCount = 10;
    pageIndex = 9;
    const page = new Page(items, pageIndex, pageCount);
    expect(page.isFirstPage).toBe(false);
    expect(page.isLastPage).toBe(true);
    expect(page.hasNextPage).toBe(false);
    expect(page.hasPreviousPage).toBe(true);
  });
});
