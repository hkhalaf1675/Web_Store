import { Ireview } from './../Interfaces/ireview';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iwritereview } from '../Interfaces/iwritereview';
import { Ireviewreturn } from '../Interfaces/review/Ireviewreturn';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  AllReviewsUrl: string = "https://localhost:7003/api/Review/GetAllReviews";
  AddReviewUrl: string = "https://localhost:7003/api/Review";
  baseURL: string = 'https://localhost:7003/api/Review'; // Tasneem
  ProductReviewUrl = 'https://localhost:7003/api/Review/GetReviewsByProductId/'

  constructor(private httpclient: HttpClient) { }

  reviewList = new BehaviorSubject<Ireview[]>([])


  // ------------------- [ Get All Reviews]
  GetAll(): Observable<Ireview[]> {
    return this.httpclient.get<Ireview[]>(this.AllReviewsUrl);
  }

  // -------------------- [ Get Product Review ]
  GetProductReview(id :number): Observable<Ireview []>{
    return this.httpclient.get<Ireview[]>(this.ProductReviewUrl + id)
  }

  // ------------------- [ Add New Review ]
  AddReview(data: Iwritereview): Observable<Iwritereview> {
    return this.httpclient.post<Iwritereview>(this.AddReviewUrl, data)
  }

  // ------------------------------- [ ADMIN ]


  // ------------------- [ Get All Reviews For Admin ]
  getAllAdmin(PageIndex?: number): Observable<Ireviewreturn[]> {
    const url = PageIndex ? `${this.baseURL}/GetAllReviewsAdmin?pageIndex=${PageIndex}` : `${this.baseURL}/GetAllReviewsAdmin`;
    return this.httpclient.get<Ireviewreturn[]>(url);
  }

  // ------------------- [ delete Review ]
  deleteAdmin(id: number) {
    return this.httpclient.delete(`${this.baseURL}/${id}`);
  }
}
