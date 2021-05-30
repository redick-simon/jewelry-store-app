import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Jewelry } from '../jewelry/jewelry.model';

import { JewelryService } from './jewelry.service';

describe('JewelryService', () => {
  let service: JewelryService;
  let jewelry: Jewelry;
  let httpTestingController: HttpTestingController
  let mockBlob = new Blob();
  let mockResponse = { totalPrice: 24500 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(JewelryService);
    jewelry = new Jewelry(1000, 25, 2);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate price', () => {    
    service.calculateTotal(jewelry).subscribe(res => {
      expect(res.totalPrice).toEqual(24500);
    });

    const request = httpTestingController.expectOne('https://localhost:44368/jewelry/calculate');

    request.flush(mockResponse);
  })

  it('should print pdf bill', () => {
    let actual = service.printToFile(jewelry).subscribe(res => {
      expect(res.body).toEqual(mockBlob);
    });
    
    const request = httpTestingController.expectOne('https://localhost:44368/jewelry/downloadpdf');

    request.flush(mockBlob);
  })
});
