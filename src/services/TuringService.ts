import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TuringClient, Category, Product, ProductComplete, Review, Department } from './client/TuringClient';

export class TuringService {
  constructor(private client: TuringClient){
  }

  getCategories = ():Observable<Category[]> => {
    return from(this.client.categories())
            .pipe(map((response)=> response.rows!))
  }

  getCategoriesByDepartmet = (department_id:number): Observable<Category[]>=> {
    return from(this.client.inDepartmentAll(department_id))
  }

  getProducts = (category_id:number):Observable<Product[]> => {
    return from(this.client.inCategory(category_id))
            .pipe(map((response)=> response.rows!))
  }

  searchProducts = (term: string): Observable<Product[]> => {
    return from(this.client.search(term))
            .pipe(map((response)=> response.rows!))
  }

  getProduct = (product_id:number): Observable<ProductComplete> => {
    return from(this.client.products2(product_id))
  }

  getReviews = (product_id:number): Observable<Review[]> => {
    return from(this.client.reviewsAll(product_id))
  }

  getDepartments = ():Observable<Department[]> => {
    return from(this.client.departmentsAll())
  }
}

