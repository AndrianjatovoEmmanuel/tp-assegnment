Application pour la gestion d'assignment : 

Accéssibilité: liens des codes sources et le lien pour accéder a l'application

Lancer l'application en locale :
- Back end
	- cloner l'application sur GitHub :
		- repository back end : https://github.com/AndrianjatovoEmmanuel/tp-assegnment-back
	- aller dans la racine de l'application : ex :"c:/root/assignment-app" 
	- lancer les commande suivantes : 
		- node server.js
		- ouvrir dans le navigateur http://localhost:8010/

- Front end
	- cloner l'application sur GitHub :
		- repository front end : https://github.com/AndrianjatovoEmmanuel/tp-assegnment
	- aller dans la racine de l'application : ex :"c:/root/api" 
	- lancer les commande suivantes : 
		- ng serve
		- ouvrir dans le navigateur http://localhost:4200/

Lancer l'application en ligne :
Copier ce lien dans le navigateur : https://itumbdsemmanuel.herokuapp.com/

utilisateur admin
username : evatanintsoa
mot de passe : mongo

utilisateur utilisateur
username : mmichella
mot de passe : mongo



Fonctionnalité : 
- getsion des utilisateurs:
Admin : 
	- dashboard : 
		- lites des assignments avec les notes élevés
		- nombre d'assignment , assignment rendue, assignment non rendue
		- moyenne des notes pour chaques matière
		
	- Assignments : 
		- ajout d'un assignment
		- modification d'un assignment 
		- noter un assignment
		- supprimer un assignment
		
Utilisateurs :
	- Assignments : 
		- ajout d'un assignment
		- modification d'un assignment (rendu ou non rendu)
		- supprimer un assignment
		
- Pagination pour la liste des assignments 
- Stepper pour la modification des assignments coté Admin
- modification de l'interface : Bootstrap
Base de données :

Ajout de trois collections : 
- assignments
- utilisateurs
- matieres