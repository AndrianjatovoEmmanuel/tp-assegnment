import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignments.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  nomAssignement!:string;
  dateRendu!:Date;  
  constructor(private assignementservice:AssignmentsService,
              private router:Router) { }

  
  ngOnInit(): void {
  }

  onSubmit(){
    
    let newassignment=new Assignment();
    newassignment.id=Math.round(Math.random()*10000000);
    newassignment.nom=this.nomAssignement;
    newassignment.dateDeRendu=this.dateRendu
    newassignment.rendu=false

    this.assignementservice.addAssignments(newassignment)
    .subscribe(message => {
      console.log(message);
      this.router.navigate(["/home"]);
    })
  }

}
