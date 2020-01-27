function signIn() {

    var emailInput = document.getElementById("inputEmail").value;
    var passInput = document.getElementById("inputPassword").value;
    var email=emailInput.toLowerCase()+"@gust.edu.kw";
    var pass= passInput.toLowerCase();

    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        alert(error.message);
    });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        if (user.email.substring(0,4)== "gust"){
            console.log(user);
            window.location.href = "student.html"; 
        }else {
            window.location.href = "head.html";
        }
        
        // User is signed in.
        username=user.email.toLowerCase();
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log(email);
        // ...
    } else {
        // User is signed out.
        // ...
    }
});