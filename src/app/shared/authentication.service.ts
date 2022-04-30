import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../model/utilisateur.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loggedIn=false;
  currentuser=false;

  constructor(private http:HttpClient) { }

  logIn(){
    this.loggedIn=true;
  }

  logOut(){
    this.loggedIn=false;
  }

  userconnecter(){
    this.currentuser=true;
  }
  userdeconnecter(){
    this.currentuser=false;
  }

  isAdmin(){
    let promise=new Promise((resolve,rejects)=>{
      resolve(this.loggedIn)
    })
    return promise;
  }

  existcurrent(){
    return this.currentuser;
  }
  


}
