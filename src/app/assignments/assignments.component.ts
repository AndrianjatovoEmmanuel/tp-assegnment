import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignments.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  //Champ formulaire 
  nomAssignement!:string;
  dateRendu!:Date;
  assignmentselectionne?: Assignment;
  assignments:Assignment[]=[];
  //pagination
  page:number=1;
  limit:number=10;

  constructor(private assignmentservice:AssignmentsService) {}

  /*ngOnInit(): void {
    this.assignmentservice.getAssignments()
    .subscribe(assignments => {
      this.assignments=assignments
    })
  }*/

  ngOnInit(): void {
    this.getAssignment()
  }

  getAssignment(){
    console.log("page"+this.page)
    this.assignmentservice.getAssignments(this.page,this.limit)
    .subscribe(reponse=> {
      this.assignments=reponse.docs;
    })
  }

  pageSuivante(){
    console.log("suiv")
    this.page++;
    this.getAssignment();
  }

  pagePrecedente(){
    console.log("prec")
    this.page--;
    this.getAssignment();
  }
}
