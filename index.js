//Info from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage

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
openRequest.addEventListener("error",  () => 
    console.error("Database failed to open")
);

//Success handler
openRequest.addEventListener("success", () => {
    console.log("Database opened successfully");

    //Object representing opened database is stored in db variable. Allows us to manipulate the database.
    db = openRequest.result;

    //Display the data already in the IndexDB inside the <ul>
    displayData();
});

//Most important handler (ugradeneeded)
//runs if databse has not already been set up, or if db is opened with a bigger version number than thexisting stored database

//Set up db tables if this has not already been done
openRequest.addEventListener("upgradeneeded", (e) => {
    //grab reference to the opened database
    db = e.target.result;

    //create an objectStore in our databse to store notes and an auto-incrementing key
    //An objectStore is similar to a 'table' in a relational database
    const objectStore = db.createObjectStore("notes_os", {keyPath: "id", autoIncrement: true,});

    //Define what data items the objectStore will contain
    
})