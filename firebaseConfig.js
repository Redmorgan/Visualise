import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


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



export const login = async (email, password) => {

    const auth = firebase.auth();

    await auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            
            const user = userCredential.user;

            global.UID = user['uid']

        })
        .catch((error) => {

            const errorMessage = error.message;

        });
}

/** 
 * @summary Takes in an email and password and generates a user account from it, then logs the user into the system.
 * 
 * @param {string} email - The user inputted email address they want to use.
 * @param {string} password -  The user inputted password they want to use.
*/
export const signup = async (email, password) => {

    if (email != "" && password != "") {

        const auth = firebase.auth();

        await auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {

                const user = userCredential.user;

                global.UID = user['uid']
                global.loginError = null

            })
            .catch((error) => {

                const errorMessage = error.message;
                global.loginError = errorMessage
                global.UID = null

            });

    }
    else {


    }

}

// /** 
//  * @summary Logs the user out of the system and resets the pages cookies for the user.
// */
// function logout() {

//     const auth = firebase.auth();
//     auth.signOut();


// }