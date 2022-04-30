export class Utilisateur{
    _id!:string;
    id!:number;
    nom!:String; 
    prenom!:String;
    nomUtilisateur!:String;
    motDePasse!:String;
    admin!:boolean;
    prof!:boolean;
    photo?:string;
}