// Get a reference to the database service
var database = firebase.database();
var userID;

document.addEventListener('DOMContentLoaded', async function (event) {
    console.log("Page loaded");


});


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        userEmail = email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        userID = uid;
        var providerData = user.providerData;
        username=user.email.toLowerCase();
        console.log(user);
        console.log(email);
        console.log(uid);
        //var header = document.getElementById("header").innerHTML;
        //header = header + " " + email + "!";
        //document.getElementById("header").innerHTML = header;


    } else {
        window.location.href = "login.html";
    }
});

function getCourses(){
    console.log("HIIIIIIIIIIIII");
    var root=document.getElementById("root");
    root.innerHTML="";
    var pageTitle = document.createElement("h4");
    pageTitle.innerHTML="Courses";
    root.appendChild(pageTitle);




    $.getJSON("http://localhost:3000/course/",function (data) {
        data.forEach(function (item) {
            var card =document.createElement("div");
            card.className="card";
            var cardBody=document.createElement("div");
            cardBody.className="card-body"
            var title = document.createElement("h5");
            title.innerHTML=item.courseName;
            title.className="card-title"
            var text= document.createElement("p");
            text.className="card-text"
            text.innerHTML=item.description;
            cardBody.appendChild(title);
            cardBody.appendChild(text);
            card.appendChild(cardBody);
            root.appendChild(card);
        })
    });


    };




function signout() {
    firebase.auth().signOut().then(function () {
        console.log("Sign-Out Successful");
    }).catch(function (error) {
        console.log(error);
    });
}


