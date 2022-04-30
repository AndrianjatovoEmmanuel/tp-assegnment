import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from './model/utilisateur.model';
import { AssignmentsService } from './shared/assignments.service';
import { AuthenticationService } from './shared/authentication.service';
import { UtilisateursService } from './shared/utilisateurs.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'assignment-app';

  nomUtilisateur:string="";
  motDePasse:string="";
  isAdmin?:boolean
  iscurrent?=this.authservice.existcurrent();
  currentUser?:Utilisateur
  message:string="";


  constructor(private authservice:AuthenticationService,
              private assignmentservice:AssignmentsService,
              private route:Router,
              private utilisateurservice:UtilisateursService
              ) { }

  ngOnInit(): void {
    
  }

  SingOUt(){
    this.authservice.logOut();
    this.authservice.userdeconnecter();
    this.iscurrent=this.authservice.existcurrent();
    console.log("Je me connecte ");
    this.route.navigate(["/"]);
  }

  peupler(){
    this.assignmentservice.peuplerBd()
  }

  checkUser(){
    console.log("fonction on submit" +this.nomUtilisateur+" "+this.motDePasse )
    this.utilisateurservice.checkUtilisateur(this.nomUtilisateur,this.motDePasse)
    .subscribe(utilisateur => {

      this.currentUser=utilisateur;

      if(this.currentUser){
        if(this.currentUser.admin){
          console.log("Admin")
          this.authservice.logIn();
          this.isAdmin=this.authservice.loggedIn;
          this.authservice.userconnecter();
          this.iscurrent=this.authservice.existcurrent();
          this.message="";
          this.route.navigate(["/home"]);
        }
        else{
          console.log("Utilisateur");
          this.authservice.logOut();
          this.isAdmin=this.authservice.loggedIn;
          this.authservice.userconnecter();
          this.iscurrent=this.authservice.existcurrent();
          this.message="";
          this.route.navigate(["/home"]);
        }
      }else{
        this.message="Incorrect Identifier,  please check admin to have access"
      }
    })
  }


}

