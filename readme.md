# Crud avec Postgresql et nodejs - express   

## installation : 

créer un dossier postgreb  

Monter une base de données dans un containeur docker  

```bash
docker-compose up -d --build 
```   

créer une base de données dans le containeur :
```bash 
docker exec -it nodpsqlCrud psql -U postgres
create database bdd;
exit;
```

Installer les modules  

```bash
npm install  
```  

lancer le serveur et créer la base de données : 

```bash
nodemon index.js
```  

Une erreur va apparaître, faire crtl+s .

Les données sont alors insérées dans la table créée; commenter les lignes suivantes du fichier index.js
```javaScript
const bdd = require('./bddMysql/requetes');
const mysqlc = new bdd();
mysqlc.insertInitialData(); 
``` 

## utilisation :  

aller à l'adresse suivante : 

> http://localhost:8080/


