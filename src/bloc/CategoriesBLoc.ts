import { Observable, Subject} from "rxjs";
import { switchMap, tap} from "rxjs/operators";
import { merge} from "rxjs";

import { TuringService } from "../services/TuringService";
import { Category, Product } from "../services/client/TuringClient";

export class CategoryBLoc {
  categories$: Observable<Category[]>
  selectedCategory$: Subject<Category> = new Subject<Category>();
  products$: Observable<Product[]>
  selectedDepartment$: Subject<number> = new Subject<number>()
  search$: Subject<string> = new Subject<string>()

  constructor(private turingService: TuringService){
    this.categories$ = this.selectedDepartment$
    .pipe(
      switchMap((department_id)=> this.turingService.getCategoriesByDepartmet(department_id)),
      tap((categories) => {
        this.selectedCategory$.next(categories[0]);
      })
    );

    const productsFromCategory = this.selectedCategory$
      .pipe(switchMap((c: Category) => turingService.getProducts(c.category_id!)));

    const productsFromSearch = this.search$
      .pipe(switchMap((s:string)=> turingService.searchProducts(s)));

    this.products$ = merge(productsFromCategory,productsFromSearch)
  }
}
