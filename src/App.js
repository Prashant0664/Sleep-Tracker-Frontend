import './App.css';
import firebaseConfig from "./config"
import { initializeApp } from "firebase/app";
import { useState, React, useEffect } from 'react';
import Sleep from "./Sleep";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { signInWithRedirect, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import Start from './Start';
import Logo from './Assets/login.webp'
function Bubble() {
  const array = Array(40) // array size is 10
    .fill()
    .map(() => (19 * Math.random() + 7)); // numbers from 0-19+7 (exclusive)
  return (
    array.map((i) => <span key={i} style={{ '--i': i }}></span>)
  )
}

function App() {
  localStorage.setItem("status", false)
  if (!localStorage.getItem("cstart")) {
    localStorage.setItem("cstart", false)
  }
  var [cname, ccname] = useState("")
  var [cmail, ccmail] = useState("")
  var [cmail, ccmail] = useState(false)
  var [ctoken, cctoken] = useState("")
  var email = ""
  var token = "";
  var user = "";
  var [isSleep, setSleep] = useState(false)
  var [isnewSleep, setnewSleep] = useState(false)
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const check = () => {
    if (localStorage.getItem("token") && localStorage.getItem("token") != "") {
      setnewSleep(isnewSleep = true)
      cctoken(localStorage.getItem("token"))
      ccname(localStorage.getItem("cname"))
      ccmail(localStorage.getItem("cmail"))
    }
  }
  const signouthandle = () => {
    signOut(auth).then(() => {
      console.log("SIGNED OUT SUCCESSFULLY")
      setnewSleep(isSleep = false)

      localStorage.clear();
      ccname("")
      cctoken("")
      ccmail("")
    }).catch((error) => {
      console.log(error)
    });
  }
  const HandleSubmit = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setSleep(!isSleep)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        token = credential.accessToken;
        const rr = result.user

        email = rr.email
        user = result.user.displayName;
        localStorage.setItem("token", token);
        localStorage.setItem("cname", user);
        localStorage.setItem("cmail", email);

        cctoken(localStorage.getItem("token"))
        ccname(localStorage.getItem("cname"))
        ccmail(localStorage.getItem("cmail"))
        Change()
        setSleep(isSleep = false)
      }).catch((error) => {
        console.log(error)
      });
  }

  var i = 9;
  useEffect(() => {
    if (localStorage.getItem("token") != "") { check() }
  }, [i])
  const Change = () => {
    setnewSleep(isnewSleep = true)
  }
  try {
    const data = localStorage.getItem("token")
    if (data) {
    }
  }
  catch (err) {
    setnewSleep(isnewSleep = false)
    console.log(err)
  }
  return (
    <>
      <div className={isnewSleep ? "hidden" : "App"}>
        <div className={isSleep ? "hidden" : "App cent"}>
          <div>
            <button className='signbut' onClick={HandleSubmit}><img src={Logo} alt='login' className='imglogo' /> <br /> <p>Sign in using Google</p></button>
          </div>
        </div>
        <Sleep isSleep={isSleep} />
      </div>
      <div className='container'>
        <div className='bubbles'>
          <Bubble />
        </div>
      </div>
      <div className={isnewSleep ? "cont App dgrid" : "hidden"}>
        <span className='fwhite g1 g21'>Welcome <span className='ppppname'>{cname}</span> &nbsp; &nbsp; <button className='sbut' onClick={() => signouthandle()}>Sign Out</button></span>
        <Start token={ctoken} name={cname} mail={cmail} />
      </div>
    </>
  );
}
export default App;






