import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Matiere } from 'src/app/model/matiere.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatieresService } from 'src/app/shared/matieres.service';
import { Assignment } from '../assignments.model';


@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  nomAssignement!:string;
  dateRendu!:Date;
  idMatiere!:number;
  idAuteur!:number;
  remarque!:string;  
  matiere?:Matiere[]=[];
  datecreation?:Date;

  constructor(private assignementservice:AssignmentsService,
              private matiereservice:MatieresService, 
              private router:Router) {


  }

  
  ngOnInit(): void {
    this.getMatiere();
  }

  getMatiere(){
    this.matiereservice.getMatieres()
    .subscribe(matieres => {
      this.matiere=matieres
    })
  }
  
  onSubmit(){
    
    let newassignment=new Assignment();
    
    newassignment.id=Math.round(Math.random()*10000000);
    newassignment.nom=this.nomAssignement;
    newassignment.dateDeRendu=this.dateRendu;
    newassignment.rendu=false;
    newassignment.idAuteur=1;
    newassignment.idMatiere=this.idMatiere;
    newassignment.remarque=this.remarque;
    newassignment.note=0;
    newassignment.datecreation=new Date();
    
    this.assignementservice.addAssignments(newassignment)
    .subscribe(reponse => {
      console.log(reponse.message);
      this.router.navigate(["/home"]);
    })
  }

}
