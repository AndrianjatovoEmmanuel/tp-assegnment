import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignments.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { MatieresService } from 'src/app/shared/matieres.service';
import { Matiere } from 'src/app/model/matiere.model';


@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nom!: String;
  dateDeRendu!: Date;
  idMatiere!:number;
  remarque!:string;

  isEditable = true;
  matiere?: Matiere[] = [];

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private matiereservice: MatieresService,
  ) { }

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.getAssignment();
    this.getMatiere();

  }

  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignmentById(id).subscribe((assignment) => {
      if (!assignment) return;
      this.assignment = assignment;
      // Pour pré-remplir le formulaire

      this.nom = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.idMatiere=assignment.idMatiere;
      this.remarque=assignment.remarque;

    });
  }

  getMatiere() {
    this.matiereservice.getMatieres()
      .subscribe(matieres => {
        this.matiere = matieres
      })
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nom;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.idMatiere = this.idMatiere;
    this.assignment.remarque= this.remarque;
    console.log(this.assignment)
    this.assignmentsService.updateAssignments(this.assignment)
      .subscribe((message) => {
        console.log(message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }
}
