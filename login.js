// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getDatabase, ref, set, get, onValue, child, update, remove } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyClvlw2ij0_ET5kPgArRyKE3sooZ3imPXY",
    authDomain: "login-system-9d2a4.firebaseapp.com",
    databaseURL: "https://login-system-9d2a4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "login-system-9d2a4",
    storageBucket: "login-system-9d2a4.appspot.com",
    messagingSenderId: "892579975252",
    appId: "1:892579975252:web:17cf37b87575aa3d1c5dc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();


// add event listener on form
document.querySelector('form').addEventListener("submit", e => {
    e.preventDefault();

    let submitter = e.submitter.value

    switch (submitter) {
        case "Login":
            {
                // TODO check value and login if it's ok
                alert("not availible yet");
                break;
            }

        case "Register":
            {
                let canRegister = checkUser();

                console.log("can register = " + canRegister);

                if (canRegister) {
                    let isLogged = insertData();

                    if (isLogged) {
                        //RedirectionJavascript();
                    }
                    break;
                }
            }
    }
});


// ===================================== GETTER =====================================
function getUsername() {
    const username = document.getElementById("username").value;
    if (username === "") {
        alert("pleas fill in username field")
        return;
    }
    else
        return username;
}

function getUsermail() {
    const email = document.getElementById("email").value;
    if (email === "") {
        alert("pleas fill in email field")
        return;
    }
    else
        return email;
}


// ===================================== helper =====================================
function clearInput() {
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
}

function RedirectionJavascript() {
    //window.location.href = "./logged.html";
    location.replace("./logged.html");
}


let userID = 0;
let username = "";
let email = "";
// ===================================== DB FUNCTION =====================================
function insertData() {

    let logged = false;
    username = getUsername();
    email = getUsermail();

    try {
        set(ref(db, 'User/' + userID), {
            Name: username,
            Email: email
        }).then(() => {
            alert("date inserted succesfully");
        });

        logged = true;

        userID++;
        //clearInput();
    }
    catch (error) {
        console.log(error);
    }

    return logged;
}

function checkUser() {
    const dbRef = ref(db);

    email = getUsermail();
    username = getUsername();
    let registrationAvailible = true;

    var done = get(child(dbRef, "User/")).then((snapshot) => {
        snapshot.forEach(childSnapshot => {

            // stop the foreach is registration is unavailible
            if (registrationAvailible === false)
                return;

            const data = childSnapshot.val();

            if (data.Email === email) {
                console.log("Email already used");
                registrationAvailible = false;
            }
            else {
                console.log("Registration availible");
            }
        })
    }).catch((error) => {
        console.log(error);
    });

    // execute this only after the end of the foreach
    done.then(() => {
        return registrationAvailible;
    });

}