import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Assignment } from '../assignments/assignments.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor() { }
  
  assignments:Assignment[] = [
    {
      id:1,
      nom:"TP1,creer une application pour gerer les stocks du magasin ABM", 
      dateDeRendu : new Date("2022-11-17"),
      rendu:true
    },
    {
      id:2,
      nom:"Installation des environnements pour Mopolo", 
      dateDeRendu : new Date('2022-03-18'),
      rendu:false
    },
    {
      id:3,
      nom:"Classification des produits", 
      dateDeRendu : new Date("2022-07-20"),
      rendu:false
    }
  ]

  getAssignments():Observable<Assignment[]>{
    return of(this.assignments);
  }

  getAssignmentById(id:number):Observable<Assignment|undefined>{
    let result=this.assignments.find(a=> a.id == id);
    console.log(result?.id)
    return of(result);
  }

  addAssignments(assignment:Assignment):Observable<string>{
    this.assignments.push(assignment);
    return of("Assignment ajouter");
  }

  updateAssignments(assignment:Assignment):Observable<string>{
    const index = this.assignments.indexOf(assignment)
    this.assignments[index]=assignment;
    return of("Assignment Modifier");
  }

  deleteAssignments(assignment:Assignment):Observable<string>{
    const index = this.assignments.indexOf(assignment)
    this.assignments.splice(index, 1);
    return of("Assignment Supprimer");
  }

}
