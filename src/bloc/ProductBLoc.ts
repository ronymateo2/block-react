import { Observable, Subject, forkJoin, EMPTY} from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";

import { TuringService } from "../services/TuringService";
import { ProductViewModel } from "../model/ProductViewModel";

export class ProductBLoc {
  selectedProducId$: Subject<number> = new Subject();
  product$: Observable<ProductViewModel>

  constructor(private turingService: TuringService){
    this.product$ = this.selectedProducId$.pipe(
      switchMap((id)=> forkJoin(
        this.turingService.getProduct(id),
        this.turingService.getReviews(id))
      ),
      map(([product,reviews])=>{
        const productViewModel: ProductViewModel= {
              product: product,
              reviews: reviews,
        }
        return productViewModel
      }),catchError(error =>{
          console.error(error)
          return EMPTY
      }))
  }
}
