import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignments.model';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.css']
})
export class AssignmentDetailsComponent implements OnInit {

  assignmenTransmis?:Assignment  
  constructor(private assignmentservice:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    const id=this.route.snapshot.params["id"];
    console.log("id : " + id);
    this.getAssignment(id)
  }

  getAssignment(id:number){
    this.assignmentservice.getAssignmentById(id)
    .subscribe(result =>{
      console.log("id : " + id);
      this.assignmenTransmis=result;
    })
  }

  onAssingmentRendu(){
    console.log("nom=")
    if(this.assignmenTransmis){
      this.assignmenTransmis.rendu=true;
      this.assignmentservice.updateAssignments(this.assignmenTransmis)
      .subscribe(message =>{
        console.log(message);
        this.router.navigate(["/home"]);
      })
    }
  }

  onAssignmentDelete(){
    if(this.assignmenTransmis){
      this.assignmentservice.deleteAssignments(this.assignmenTransmis)
      .subscribe(message =>{
        console.log(message);
        this.router.navigate(["/home"]);
    })
    }
    
  }
}