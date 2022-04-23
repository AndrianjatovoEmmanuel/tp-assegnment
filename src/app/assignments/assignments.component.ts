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

  constructor(private assignmentservice:AssignmentsService) {}

  ngOnInit(): void {
    //demander les données 
    this.assignmentservice.getAssignments()
    .subscribe(assignments => {
      this.assignments=assignments
    })

  }


  assignmentclick(assignment:Assignment){
    this.assignmentselectionne=assignment
    console.log("nom=" + this.nomAssignement +"a rendre le " + this.dateRendu)
  }

}
