var enteringName = document.querySelector('#enteringName')
var password = document.querySelector('#password')
var addName = document.querySelector('#addName')
var name = document.querySelector('#name')
var enter = document.querySelector('#enter')

var mesage1 = document.querySelector('#mesage1')
var mesage2 = document.querySelector('#mesage2')
var sendMesage1 = document.querySelector('#sendMesage1')
var sendMesage2 = document.querySelector('#sendMesage2')


var sender = ""

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase, ref, set, get, child} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdA6aeQq6g-DXeBRo_UXuPf5gsvefy_Qk",
  authDomain: "chatbot-3410b.firebaseapp.com",
  projectId: "chatbot-3410b",
  storageBucket: "chatbot-3410b.appspot.com",
  messagingSenderId: "918085028143",
  appId: "1:918085028143:web:cf530fa8d4053b005539da",
  measurementId: "G-XF1MWZ2PXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

addName.addEventListener('click', function(){
    if(name.value.trim() && password.value.trim()){
        set(ref(db, "users/" + `${name.value.trim()}`),{
            password: password.value.trim(),
            ad: name.value.trim()
        })
    }else{
        alert('add yaz')
    }
})

enter.addEventListener('click', function(){
    if(enteringName.value.trim()){

        get(child(ref(db), "users/" + `${enteringName.value.trim()}`)).then(meselen => {
            if(meselen.exists){
                if(meselen.val().ad == enteringName.value.trim()){
                    alert('gir')
                    sender = `${enteringName.value.trim()}`
                    document.querySelector('main').style.display = "none"
                    document.querySelector('footer').style.display = "flex"
                }
            }
        }).catch(error => {
            alert('This user is not in database')
        })
    }
})








var chat = document.querySelector('#chat')


sendMesage1.addEventListener('click', function(){
    chat.innerHTML += `${sender} <p>${mesage1.value.trim()}</p>`
    set(ref(db, 'users/' + `${sender}/` + 'chat'), {
        mesaj: `<p>${mesage1.value.trim()}</p>`,
        wholeMessage: `${chat.innerHTML}`
    })
    .then(
        set(ref(db, 'users/' + 'chat'), {
            wholeMessage: `${chat.innerHTML}`
        })
    )
    .then(
        get(child(ref(db), 'users/' + 'chat')).then(cavab => {
            if(cavab.exists){
                chat.innerHTML = `${cavab.val().wholeMessage}`
            }
        })
    )
})



window.onload = setInterval(function(){
    get(child(ref(db), "users/"+"chat")).then(cavab => {
        if(cavab.exists){
            chat.innerHTML = `${cavab.val().wholeMessage}`
        }
    })
}, 1000)
