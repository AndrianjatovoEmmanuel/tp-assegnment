import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../model/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  uri="https://backitumbdsemmanul.herokuapp.com/api/"
  constructor(private http:HttpClient) { }

  getUtilisateurs():Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(this.uri+"utilisateurs");
  }

  getUtilisateurById(id:number):Observable<Utilisateur|undefined>{
    return this.http.get<Utilisateur>(this.uri+"utilisateurs/"+id);
  }

  checkUtilisateur(nom:string,mdp:string):Observable<any>{
    var obj = {
      "nomUtilisateur":nom,
      "motDePasse":mdp
    };
    console.log(obj)
    console.log("fonction on checkUtilisateur")
    return this.http.post<Utilisateur>(this.uri+"utilisateurs/",obj);
  }
  
}
