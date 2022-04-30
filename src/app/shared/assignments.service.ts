import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Assignment } from '../assignments/assignments.model';
import { Statistique } from '../model/statistique.model';
import { dataAssignment } from './data_assignments';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private http:HttpClient) { }
  
  //uri="http://localhost:8010/api/"
  uri="https://backitumbdsemmanul.herokuapp.com/api/"

  //getAssignments():Observable<Assignment[]>{
    //return this.http.get<Assignment[]>(this.uri+"assignments");
  //}
  getAssignments(page:number,limit:number):Observable<any>{
    console.log(this.uri+"assignments?pages="+page+"&limit="+limit)
    return this.http.get<Assignment[]>(this.uri+"assignments?page="+page+"&limit="+limit);
  }

  getAssignmentsMax():Observable<any>{
    return this.http.get<Assignment[]>(this.uri+"assignmentsmax");
  }

  getAssignmentById(id:number):Observable<Assignment|undefined>{
    return this.http.get<Assignment>(this.uri+"assignments/"+id);
  }

  addAssignments(assignment:Assignment):Observable<any>{
    return this.http.post<Assignment>(this.uri+"assignments/",assignment);
  }

  updateAssignments(assignment:Assignment):Observable<any>{
    return this.http.put<Assignment>(this.uri+"assignments/",assignment);
  }

  deleteAssignments(assignment:Assignment):Observable<any>{
    return this.http.delete(this.uri+"assignments/"+assignment._id);
  }

  getStatMatiere():Observable<any>{
    console.log(this.uri+"statmatiere");
    return this.http.get<Statistique>(this.uri+"statmatiere");
  }

  CountAssignment():Observable<any>{
    console.log(this.uri+"statmatiere");
    return this.http.get<number>(this.uri+"countAssignments");
  }

  CountAssignmentRendu():Observable<any>{
    console.log(this.uri+"statmatiere");
    return this.http.get<number>(this.uri+"countAssignmentsRendu");
  }

  CountAssignmentNonRendu():Observable<any>{
    console.log(this.uri+"statmatiere");
    return this.http.get<number>(this.uri+"countAssignmentsNonRendu");
  }

  peuplerBd(){
    dataAssignment.forEach(a => { 
      let newassignment=new Assignment();
      newassignment.id=a.id;
      newassignment.nom=a.nom;
      newassignment.dateDeRendu=new Date(a.dateDeRendu);
      newassignment.rendu=a.rendu;
      newassignment.idAuteur=a.idAuteur;
      newassignment.idMatiere=a.idMatiere;
      newassignment.remarque=a.remarque;
      newassignment.note=a.note;
      this.addAssignments(newassignment)
      .subscribe(reponse => {
        console.log(reponse.message)
      })
    });
  }

}
