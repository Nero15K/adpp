// Get a reference to the database service
var database = firebase.database();
var userID;
let headID;
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
        let temp = userEmail.indexOf("@");
        headID = userEmail.substring(0, temp);
        console.log(headID);
        var providerData = user.providerData;
        username = user.email.toLowerCase();
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

function coursesPage() {
    let root = document.getElementById("root");
    root.style.visibility = "visible";
    let side = document.getElementById("sem");

    $("#sem").empty();

    $.getJSON("http://localhost:3000/course/semester", function (data) {

        data.forEach(function (item) {

            let link = document.createElement("a");
            link.innerHTML = item.semester;
            link.href = "#";
            console.log(item.semester);
            console.log(item)
            link.addEventListener("click",()=>loadCourses(link))
            console.log(this);
            side.appendChild(link);

        })

    })

}

function loadCourses(link) {

    let content = document.getElementById("courses");
    $("#courses").empty();
    // let semester = $("#semName");
    console.log(link.innerHTML);
    // content.appendChild(document.createElement("h5",link.innerHTML));
    console.log("head: " + headID);
     let param = {headID, semester:link.innerHTML};

    $.getJSON("http://localhost:3000/course/head", param, function (data) {

        data.forEach(function (item) {
            console.log("item: "+ item);
            let card = document.createElement('div');
            card.className = "card";
            card.id=link.innerHTML;
            let checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.name = item.courseName;
            if (item.offered === 1) {
                checkBox.checked = true;
            }
            let cardbody = document.createElement('div');
            cardbody.className = "card-body";
            let cardtitle = document.createElement('h5');
            cardtitle.className = "card-title";
            cardtitle.innerHTML = item.courseName;
            cardbody.appendChild(cardtitle);
            cardbody.appendChild(checkBox);
            card.appendChild(cardbody);
            content.appendChild(card);
            console.log(item.courseName)
        })

    });

    let saveBtn = document.createElement('button');
    saveBtn.innerHTML = "Save";
    saveBtn.addEventListener('click', save)

    content.appendChild(saveBtn);


};

save = () => {
    ///console.log("hi")
    let content = document.getElementById("courses");
   // let semester = document.getElementById("semName").innerHTML;
    console.log(content.children);
    for(let i = 1; i < content.children.length,i++;) {
           /// console.log("hi agagin")
            var item = content.children[i];

            let offered;
            //console.log(item.children[0].children[0]);
            ///console.log("Nizarrrrrrrrrrrrrrrr "+item.children[0].children[1].checked);

            ///console.log("child at [0][0]: "+item.children[0].children[1].checked);

            try{
                var flag = item.children[0].children[1].checked;
            }
            catch (e) {
                console.log("Error: "+e);
            }

        try{
            var x  = item.children[0].children[0].textContent;
            console.log(x);
        }
        catch (e) {
            console.log("Error: "+e);
        }



            console.log(flag);

            if (flag) {
                offered = 1;
               console.log(offered)
            } else {
                offered = 0;
                console.log(offered);
            }
            // console.log(item);

            // console.log(item.id);
         try{
             let param = {
                 courseName: item.children[0].children[0].textContent,
                 semester: item.id,
                 offered
             };



             console.log("param "+param.courseName);

             $.put("http://localhost:3000/course/", param, function (data) {
                 console.log(data);
                 console.log("data sent");

             })
         }
            catch (e) {
                console.log("Put Error " + e);
                return;
            }


    }
}


jQuery.each(["put", "delete"], function (i, method) {

    jQuery[method] = function (url, data, callback, type) {

        if (jQuery.isFunction(data)) {

            type = type || callback;

            callback = data;

            data = undefined;

        }


        return jQuery.ajax({

            url: url,

            type: method,

            dataType: type,

            data: data,

            success: callback

        });

    };

});