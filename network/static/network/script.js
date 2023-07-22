btn = document.querySelector(".follow")

try {
    btn.addEventListener('click', () => {
        if(btn.innerHTML == "Follow") {
            btn.innerHTML = "Unfollow";
            btn.className = "btn btn-danger follow";
    
            fetch("/follow",{
                method: "PUT",
                body: JSON.stringify({follower:document.querySelector(".nav-link").querySelector("strong").innerHTML,
                                    following:document.getElementById("following").innerHTML,
                                    follows: true
                                })
            })
            .then(response => response.text())
            .then(data => {
                document.getElementById("followercount").innerHTML = parseInt(document.getElementById("followercount").innerHTML)+1;
            });
        }
        else {
            btn.innerHTML = "Follow";
            btn.className = "btn btn-success follow";
    
            fetch("/follow",{
                method: "PUT",
                body: JSON.stringify({follower:document.querySelector(".nav-link").querySelector("strong").innerHTML,
                                    following:document.getElementById("following").innerHTML,
                                    follows: false
                                })
            })
            .then(response => response.text())
            .then(data => {
                document.getElementById("followercount").innerHTML = parseInt(document.getElementById("followercount").innerHTML)-1;
            });
        }
    });
}
catch(err) {
    console.log(err.message);
}


/*
function edit(post_id,element) {
    txtbox = element.parentElement;
    if(element.innerHTML == "Edit") {
        const text = txtbox.querySelector("pre");
        const textarea = document.createElement("textarea");
        textarea.className = "form-control";
        textarea.value = text.innerHTML;
        text.replaceWith(textarea);
        element.innerHTML = "Save";

    }
    else {
        const textarea = txtbox.querySelector("textarea")
        fetch("/edit",{
            method: "PUT",
            body: JSON.stringify({id:post_id,
                                text:textarea.value
                            })
        })
        .then(response => response.text())
        .then(data => {
            const text = document.createElement("pre");
            text.style = "font-size: large; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;"
            textarea.replaceWith(text);
            element.innerHTML = "Edit";
            console.log(text);            
            text.innerHTML = textarea.value;
        });
    }
}*/

function edit(post_id,element) {
    txtbox = element.parentElement;
    if(element.className == "fa-solid fa-pen-to-square mx-2") {
        const text = txtbox.querySelector("pre");
        const textarea = document.createElement("textarea");
        textarea.className = "form-control";
        textarea.value = text.innerHTML;
        text.replaceWith(textarea);
        element.className = "fa-solid fa-floppy-disk mx-2";

    }
    else {
        const textarea = txtbox.querySelector("textarea")
        fetch("/edit",{
            method: "PUT",
            body: JSON.stringify({id:post_id,
                                text:textarea.value
                            })
        })
        .then(response => response.text())
        .then(data => {
            const text = document.createElement("pre");
            text.style = "font-size: large; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;"
            textarea.replaceWith(text);
            element.className = "fa-solid fa-pen-to-square mx-2";
            text.innerHTML = textarea.value;
        });
    }
}   


function deletepost(post_id,element) {
    fetch("/delete",{
        method: "PUT",
        body: JSON.stringify({id:post_id})
    })
    .then(response => response.text())
    .then(data => {
        console.log(element.parentElement);
        element.parentElement.remove();
    });
}





function heart(post_id,element) {
    like = element.parentElement;
    i = like.querySelector("i");
    if(i.className=="fa fa-heart") {
        i.className = "fa fa-heart-o";

        fetch("/like",{
            method: "PUT",
            body: JSON.stringify({liker:document.querySelector(".nav-link").querySelector("strong").innerHTML,
                                comment:post_id,
                                likes: false
                            })
        })
        .then(response => response.text())
        .then(data => {
            like.querySelector("span").innerHTML = parseInt(like.querySelector("span").innerHTML)-1;
        });
    }
    else {
        i.className = "fa fa-heart";

        fetch("/like",{
            method: "PUT",
            body: JSON.stringify({liker:document.querySelector(".nav-link").querySelector("strong").innerHTML,
                                comment:post_id,
                                likes: true
                            })
        })
        .then(response => response.text())
        .then(data => {
            like.querySelector("span").innerHTML = parseInt(like.querySelector("span").innerHTML)+1;
        });
    }
}


function showupdateform(element) {
    if(element.parentElement.parentElement.querySelector('#update_profile').style.display=="none") {
        element.parentElement.parentElement.querySelector('#update_profile').style.display="block";
        element.innerHTML = "Cancel";
    }
    else {
        element.parentElement.parentElement.querySelector('#update_profile').style.display="none";
        element.innerHTML = "Update Profile";
    }
}
