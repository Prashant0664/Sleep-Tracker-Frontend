
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional\
// const APIKEY=process.env.REACT_APP_APTKEY
const PROJECTID = process.env.REACT_APP_PROJECTID
const STORAGEBUCKET = "project-authsleep.appspot.com"
const MID = process.env.REACT_APP_MID
const AID = process.env.REACT_APP_AID
const MEID = process.env.REACT_APP_MEID
const AUTHDOMAIN = "project-authsleep.firebaseapp.com"
const firebaseConfig = {
    apiKey: "AIzaSyCODgxdOxAHqVgdL-JgfNFB8W2vISJ8r6I",
    authDomain: AUTHDOMAIN,
    projectId: PROJECTID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MID,
    appId: AID,
    measurementId: MEID
};

export default firebaseConfig;