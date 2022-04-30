import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Matiere } from '../model/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {

  constructor(private http:HttpClient) { }

  uri="https://backitumbdsemmanul.herokuapp.com/api/"

  getMatieres():Observable<Matiere[]>{  
    return this.http.get<Matiere[]>(this.uri+"matieres");
  }

  getMatieresById(id:number):Observable<Matiere|undefined>{
    console.log("Tafiditra anaty getMatiere,ID : " +id )
    return this.http.get<Matiere>(this.uri+"matieres/"+id);
  }

}
 