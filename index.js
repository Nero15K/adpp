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

function signout() {
    firebase.auth().signOut().then(function () {
        console.log("Sign-Out Successful");
    }).catch(function (error) {
        console.log(error);
    });
}
