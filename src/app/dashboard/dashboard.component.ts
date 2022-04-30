import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Chart, registerables } from 'chart.js';
import { Statistique } from '../model/statistique.model';
import { Assignment } from '../assignments/assignments.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  label:String[]=[]
  data:Number[]=[]
  statistique?:[]=[]
  assignments:Assignment[]=[];
  allassignment?:number;
  assrendu?:number;
  assnonrendu?:number;
 
  constructor(private assignmentservice:AssignmentsService) { 
    Chart.register(...registerables);
  }
  
  ngOnInit(): void {
    this.getStatMatiere();
    this.getAssignment();
    this.CountAssignment()
    this.CountRendue();
    this.CountNonRendu();

  }
  getStatMatiere(){
    this.assignmentservice.getStatMatiere()
    .subscribe(reponse=> {
      console.log(reponse)
      this.statistique=reponse;     
      for(var i=0;i<4;i++){
        this.label?.push(""+reponse[i]["_id"])
        this.data?.push(reponse[i]["moyenne"]) 
      }
    })
  }

  getAssignment(){
    this.assignmentservice.getAssignmentsMax()
    .subscribe(reponse=> {
      this.assignments=reponse;
    })
  }

  CountAssignment(){
    this.assignmentservice.CountAssignment()
    .subscribe(reponse=> {
      this.allassignment=reponse.count;
    })
  }
  CountRendue(){
    this.assignmentservice.CountAssignmentRendu()
    .subscribe(reponse=> {
      this.assrendu=reponse.count;
    })
  }
  CountNonRendu(){
    this.assignmentservice.CountAssignmentNonRendu()
    .subscribe(reponse=> {
      this.assnonrendu=reponse.count;
    })
  }

}
