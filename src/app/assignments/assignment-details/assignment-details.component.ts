import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Matiere } from 'src/app/model/matiere.model';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { MatieresService } from 'src/app/shared/matieres.service';
import { UtilisateursService } from 'src/app/shared/utilisateurs.service';
import { Assignment } from '../assignments.model';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.css']
})
export class AssignmentDetailsComponent implements OnInit {

  
  
  constructor(private assignmentservice:AssignmentsService,
              private authservice:AuthenticationService,
              private matiereservice:MatieresService,
              private utilisateurservice:UtilisateursService,
              private route:ActivatedRoute,
              private router:Router) { }
  
  assignmenTransmis?:Assignment
  isAdmin=this.authservice.loggedIn;
  matiereassignment?:Matiere
  auteurassignment?:Utilisateur
  notesoumis:number=0;

  ngOnInit(): void {
    const id=this.route.snapshot.params["id"];
    this.getAssignment(id);

  }

  getAssignment(id:number){
    this.assignmentservice.getAssignmentById(id)
    .subscribe(result =>{
      this.assignmenTransmis=result;
      if(this.assignmenTransmis){
        this.getMatiere(this.assignmenTransmis?.idMatiere);
        this.getAuteur(this.assignmenTransmis?.idAuteur)
      }
        
    })
  }

  getMatiere(id:number){
    this.matiereservice.getMatieresById(id)
    .subscribe(result =>{
      console.log("id : " + id);
      this.matiereassignment=result;
    })
  }

  getAuteur(id:number){
    this.utilisateurservice.getUtilisateurById(id)
    .subscribe(result =>{
      console.log("id : " + id);
      this.auteurassignment=result;
    })
  }

  onAssingmentRendu(){
    if(this.assignmenTransmis){
      this.assignmenTransmis.rendu=true;
      this.assignmentservice.updateAssignments(this.assignmenTransmis)
      .subscribe(message =>{
        console.log(message);
        this.router.navigate(["/home"]);
      })
    }
  }

  onAssingmentNote(){
    if(this.assignmenTransmis){
      this.assignmenTransmis.note=this.notesoumis;
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