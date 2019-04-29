import { TuringService } from "../services/TuringService";
import { Observable } from "rxjs";
import { Department } from "../services/client/TuringClient";

export class DepartmentBLoc{
  departments$ : Observable<Department[]>;
  constructor(private turingService: TuringService){
    this.departments$ = this.turingService.getDepartments();
  }
}
