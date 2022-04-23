import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { LogBox } from 'react-native';


// Your app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAJfUj2OXhJvdt_6bg9rDmkP3uEMB6B1Vw",
    authDomain: "timetable-2c963.firebaseapp.com",
    projectId: "timetable-2c963",
    storageBucket: "timetable-2c963.appspot.com",
    messagingSenderId: "309100714582",
    appId: "1:309100714582:web:2349321e78368d4c5bb9f7",
    measurementId: "G-Z2TC69JWKP"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

LogBox.ignoreLogs(['Setting a timer']);

/**
 * @summary Logs the user into their account.
 * 
 * @param {String} email - The users email.
 * @param {String} password - The users password.
 * 
 * @description Takes the inputted email and password and passes it to the Firebase Auth which
 * checks to see if the credentials are valid. Based on that the user will either be logged in
 * or an error message will be displayed.
 */
export const login = async (email, password) => {

    const auth = firebase.auth();

    global.UID = null
    global.loginError = null

    await auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

            const user = userCredential.user;

            global.UID = user['uid']

        })
        .catch((error) => {

            const errorMessage = error.message;
            global.loginError = errorMessage

        });
}

/**
 * @summary Checks to see if the users password is valid.
 * 
 * @param {String} password - The users password.
 * 
 * @description Checks to see if the password the user entered matches the account currently logged in.
 */
export const checkPassword = async (password) => {

    const auth = firebase.auth();
    global.loginError = null

    await auth.signInWithEmailAndPassword(global.email, password)
        .then((userCredential) => {
        })
        .catch((error) => {
            console.log(error.message)
            const errorMessage = error.message;
            global.loginError = errorMessage

        });
}

/** 
 * @summary Creates an account using the entered details.
 * 
 * @param {string} email - The user inputted email address they want to use.
 * @param {string} password -  The user inputted password they want to use.
 * 
 * @description Takes in an email and password and generates a user account from it, then logs the user into the system.
*/

export const signup = async (email, password) => {

    if (email != "" && password != "") {

        const auth = firebase.auth();

        await auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {

            global.loginError = null

        })
        .catch((error) => {

            const errorMessage = error.message;
            global.loginError = errorMessage

        });

    }

}

/** 
 * @summary Logs the user out of the system and resets the pages cookies for the user.
*/
export async function logout() {

    const auth = firebase.auth()
    auth.signOut();
    global.UID = null

}

/**
 * @summary Sends a reset password link to the user.
 * 
 * @param {String} email - The users email.
 * 
 * @description Takes the email the user has submitted and uses Firebase Auth to send a reset email
 * to the user which contains a link to reset their password.
 */
export async function sendPasswordReset(email) {

    const auth = firebase.auth()

    await auth.sendPasswordResetEmail(email)
        .then(() => {

            global.reset = true

        })
        .catch((error) => {

            const errorMessage = error.message
            global.loginError = errorMessage
            console.log(errorMessage)
            global.reset = false

        })

}

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

/**
 * @summary Creates a new task for the user.
 * 
 * @param {String} selectedColour - The selected colour of the task.
 * @param {String} taskName - The selected name of the task.
 * @param {String} taskDesc - The selected description of the task.
 * @param {String} days - The selected repeating days of the task.
 * @param {String} date - The selected date of the task.
 * @param {String} timeStart - The selected start time of the task.
 * @param {String} timeEnd - The selected end time of the task.
 * 
 * @description Takes the user submitted details for the tasks and generates a new object on Firebase
 * using them.
 */
export async function createTask(selectedColour, taskName, taskDesc, days, date, timeStart, timeEnd){

    const db = firebase.firestore()

    if(JSON.stringify(days) == "[]"){

        db.collection("Timetable").add({
            SelectedColour:selectedColour,
            Date:date,
            DayOfWeek:daysOfWeek[date.getDay()],
            Repeating:false,
            TaskDesc:taskDesc,
            TaskName:taskName,
            TimeEnd:timeEnd,
            TimeStart:timeStart,
            _UID:global.UID
        })

    }else{

        db.collection("Timetable").add({
            SelectedColour:selectedColour,
            Days:days,
            Repeating:true,
            TaskDesc:taskDesc,
            TaskName:taskName,
            TimeEnd:timeEnd,
            TimeStart:timeStart,
            _UID:global.UID
        })

    }

}

/**
 * @summary Creates a new task for the user.
 * 
 * @param {String} selectedColour - The selected colour of the task.
 * @param {String} taskName - The selected name of the task.
 * @param {String} taskDesc - The selected description of the task.
 * @param {String} days - The selected repeating days of the task.
 * @param {String} date - The selected date of the task.
 * @param {String} timeStart - The selected start time of the task.
 * @param {String} timeEnd - The selected end time of the task.
 * @param {String} docID -  The ID of the document on Firebase being updated.
 * 
 * @description Takes the user submitted details for the tasks and updates the task connected to the docID.
 */
export async function updateTask(selectedColour, taskName, taskDesc, days, date, timeStart, timeEnd, docID){

    const db = firebase.firestore()

    if(JSON.stringify(days) == "[]"){

        db.collection("Timetable").doc(docID).update({
            SelectedColour:selectedColour,
            Date:date,
            DayOfWeek:daysOfWeek[date.getDay()],
            Repeating:false,
            TaskDesc:taskDesc,
            TaskName:taskName,
            TimeEnd:timeEnd,
            TimeStart:timeStart,
            _UID:global.UID
        })

    }else{

        db.collection("Timetable").doc(docID).update({
            SelectedColour:selectedColour,
            Days:days,
            Repeating:true,
            TaskDesc:taskDesc,
            TaskName:taskName,
            TimeEnd:timeEnd,
            TimeStart:timeStart,
            _UID:global.UID
        })

    }

    global.rnd = Math.floor(Math.random() * 10)

}

/**
 * @summary Deletes a selected task from Firestore.
 * 
 * @param {String} docID -  The ID of the document on Firebase being deleted.
 * 
 * @description Takes the docID and deletes that specific document from Firestore.
 */
export async function deleteTask(docID){

    const db = firebase.firestore()

    db.collection("Timetable").doc(docID).delete().then(() => {

    }).catch((error) => {
        console.error("Error removing document: ", error);
    });

}

/**
 * @summary Saves the notes of the user to Firestore.
 * 
 * @param {String} notes - Notes data submitted by the user. 
 *
 * @description Takes the notes the user has submitted and saves it to Firestore against the
 * UID of the user.
 */
export async function updateNotes(notes){

    const db = firebase.firestore()

    db.collection("Notes").doc(global.UID).set({
        NoteText:notes,
        _UID:global.UID
    })

}

