# annulation_reservation_de_voyage

Pour le projet de réseau, nous allons lié les modules annulations et réservation de voyage
test push

Quelques requetes curl

- Pour creer un compte:
  curl -X POST localhost:8080/api/utilisateur/inscription -H 'content-Type: application/json' -d '{"nom": "Tchassi", "prenom": "Daniel", "email":"tchassidaniel@gmail.com", "password": "azerty", "telNumber": "+237650829890", "role": "USAGER", "address":"Chapelle Obili"}'
- Pour se connecter
  curl -X POST localhost:8080/api/utilisateur/connexion -H 'content-Type: application/json' -d '{"username": "tchassidaniel@gmail.com", "password": "azerty"}'
