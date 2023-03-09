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
//Therefore database operations happen asychronous, meaning you get notified when they're done in the future

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

//Most important handler (upgradeneeded)
//runs if database has not already been set up, or if db is opened with a bigger version number than the existing stored database

//Set up db tables if this has not already been done
openRequest.addEventListener("upgradeneeded", (e) => {
    //grab reference to the opened database
    db = e.target.result;

    //create an objectStore in our database to store notes and an auto-incrementing key
    //An objectStore is similar to a 'table' in a relational database
    const objectStore = db.createObjectStore("notes_os", {keyPath: "id", autoIncrement: true,});

    //Define what data items the objectStore will contain
    objectStore.createIndex("title", "title", {unique: false});
    objectStore.createIndex("body", "body", {unique: false});
    console.log("Database setup complete");
    //So whe adding a record to the database, each one will be represented as an object that has title, body and id.
    
});

//create a submit event handler so when form is submitted, addData() function will run
form.addEventListener("submit", addData);

//Define the addData() function
function addData(e){
    //prevent default, we don't want the for to submit in conventional way (this would cause page refresh and spoil the experience)
    e.preventDefault();
    //grab values entered into the form fields and store them in an object (representing a record) ready for being inserted into the DB
    const newItem = {title: titleInput.value, body: bodyInput.value};

    //open a read/write db transaction on the notes_os object store, ready for adding the data
    //This transaction object allows us to access the object store, so we can do something to it (like add a record)
    const transaction = db.transaction(["notes_os"], "readwrite");

    //call an object store that's already been added to the database (access object store using objectStore() method, save result in objectStore variable)
    const objectStore = transaction.objectStore("notes_os");

    //Make a request to add our newItem object to the object store. (Add new record to db using .add() method. This creates a request object, in the same fashion we've seen before.)
    const addRequest = objectStore.add(newItem);


    //Event handlers to run at critical points in the lifecycle
    addRequest.addEventListener("success", () => {
        //when the request has succeeded, clear the form, ready for adding the next entry, 
        titleInput.value = "";
        bodyInput.value = "";
    });
    //Report on success of the transaction completing, when everything is done
    transaction.addEventListener("complete", () => {
        console.log("Transaction completed: database modification finished.");

        //update the display of data to show the newly added item, by running displayData() again.
        displayData();
    });

    transaction.addEventListener("error", () => 
        console.log("Transaction not opened due to error")
    );
}

//Function to display the data in the db
function displayData(){
    //WE empty the contents of the list element each time the display is updated
    //if we didnt do this, we'd get duplicates listed each time a new note is added
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }

    //Open our object store and then get a cursor - which iterates through all the different data items in the store
    const objectStore = db.transaction("notes_os").objectStore("notes_os");
}