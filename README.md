# DT162G Project

## REST-API med node.js, Express och mongoDB

Starta ny terminal i project directory och kör:
### `npm install`

Starta backend med:
### `nodemon`
Öppna [http://localhost:5000](http://localhost:5000) för att visa API i din webbläsar


### API beskrivning 

Webbtjänsten är för att hantera information om filmsamling och fälten för varje film är:
* _id: String,
* title: String,
* beenWatched: Boolean,
* description: String,
* filmLength: String,
* filmImage : String

Med Postman eller Thunder Client man kan testa API och CRUD-funktionalitet med nedstående:

       
| Domain | Method    | URI                   | BESKRIVNING  |
| ------------|-----------|--------|--------| 
|        | GET       | http://localhost:5000/films             | Hämta ut all filmer från DB.                |
|        | GET       | http://localhost:5000/films/id          | Hämta ut en film från database med ett givet id. |
|        | POST      | http://localhost:5000/films             | Lägga till data till database                   |
|        | PUT       | http://localhost:5000/films/ID          | Uppdatera data för en film ett givet id.     |      
|        | DELETE    | http://localhost:5000/films/ID          | Radera en film med ett givet id.      |



