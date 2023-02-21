const titleInput = document.querySelector("#title");
const list = document.querySelector("ul");
const bodyInput = document.querySelector("#body");
const form = docuement.querySelector("form");
const submitBtn = document.querySelector("form button");

//Create instance of the database object to store the open database in
let db;

//Open our database. It is created if it doesn't already exist.
const openRequest = window.indexedDB.open("notes_db", 1);   //request to open version "1" of database called "notes_db"

//Opening a database takes time, you dont want the browser to hang.
//Therefore database operations happn asychronous, meaning you get notified when there done in the future

//Event handlers
//error handler signifies that database didn't open successfully
openRequest.addEventListener("error",  () => console.error("Database failed to open"));

openRequest.addEventListener("success", () => console.log("Database opened successfully"));

//Store the opened data bases in the db variable
db = openRequest.result;

//Display the data alaready in the IDB
db.displayData();