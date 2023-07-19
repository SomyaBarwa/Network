import json

from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator


from .models import User, Post, Follow, Like


def index(request):
    posts = Post.objects.all().order_by("-datetime")

    paginator = Paginator(posts, 10)
    page_num = request.GET.get("page")
    page_obj = paginator.get_page(page_num)
    

    fullposts=[]
    #print(posts[0].like_set.all().count())
    for post in page_obj:
        fullposts.append([post, post.like_set.all().count(),True if Like.objects.filter(liker=request.user, comment=post) else False])

    print(fullposts)
    #print(likes)

    return render(request, "network/index.html", {
        "fullposts": fullposts,
        "page_obj": page_obj
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


def add_post(request):
    if request.method == "POST":
        body = request.POST["body"]
        post = Post(poster=request.user, post=body)
        post.save()
        return HttpResponseRedirect(reverse(index))
    else:
        return HttpResponse("Get wont work")
    

@login_required(login_url="/login")
def profile(request, poster):
    poster = User.objects.get(username=poster)
    posts = poster.posts.all()
    follower_count = poster.followed_by.all().count()
    following_count = poster.follows.all().count()
    user_follow_poster = Follow.objects.filter(follower=request.user, following=poster)

    return render(request, "network/profile.html", {
        "poster": poster,
        "posts": posts,
        "followers": follower_count,
        "followings":following_count,
        "user_follows": user_follow_poster
    })


@csrf_exempt
def follow(request):
    if request.method == "PUT":
        data = json.loads(request.body)
        follower_user = User.objects.get(username=data["follower"])
        folowing_user = User.objects.get(username=data["following"])
        if data.get("follows"):
            follow = Follow(follower=follower_user, following=folowing_user)
            follow.save()
        else:
            Follow.objects.filter(follower=follower_user, following=folowing_user).delete()
        return HttpResponse(status=204)
    else:
        following_people = request.user.follows.all().values_list('following', flat=True)
        following_list = [User.objects.filter(id=people) for people in following_people]
        
        posts=[]
        for user in following_list:
            posts+=Post.objects.filter(poster=user.first())

        posts.sort(key=lambda x:x.datetime, reverse=True)     

        paginator = Paginator(posts, 5)
        page_num = request.GET.get("page")
        page_obj = paginator.get_page(page_num)  
        
        return render(request, "network/following.html", {
            "page_obj": page_obj
        })

@csrf_exempt
def edit(request):
    if request.method == "PUT":
        data = json.loads(request.body)
        tweet = Post.objects.get(pk=data["id"])
        tweet.post = data["text"]
        tweet.save() 
        
        return HttpResponse(status=204)
    

@csrf_exempt
def like(request):
    if request.method == "PUT":
        data = json.loads(request.body)
        liker = User.objects.get(username=data["liker"])
        post = Post.objects.get(id=data["comment"])
        if data.get("likes"):
            like = Like(liker=liker, comment=post)
            like.save()
        else:
            Like.objects.filter(liker=liker, comment=post).delete()
        return HttpResponse(status=204)

        
    
