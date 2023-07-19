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
                                    likes: true
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
                                    likes: false
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
document.querySelector("#edit").onclick = () => {
    const text = document.querySelector("h6");
    console.log(text);
}

function edit(post) {
    console.log(post);
}
*/

/*
document.querySelectorAll(".edit").forEach(button => {
    button.addEventListener('click', () => {
        const text = button.parentElement.querySelector("h6");
        if(button.innerHTML == "Edit") {
            const textarea = document.createElement("textarea");
            textarea.className = "form-control";
            console.log(text)
            textarea.value = text.innerHTML;
            text.replaceWith(textarea);
            button.innerHTML = "Save";

        }
        else {
            const textarea = document.querySelector("textarea")
            fetch("/edit",{
                method: "PUT",
                body: JSON.stringify({id:button.dataset.id,
                                    text:textarea.value
                                })
            })
            .then(response => response.text())
            .then(data => {
                textarea.replaceWith(text);
                button.innerHTML = "Edit";
                text.innerHTML = textarea.value;
            });
        }
    });
});
*/

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