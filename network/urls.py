from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("add_post", views.add_post, name="add_post"),
    path("profile/<str:poster>", views.profile, name="profile"),   
    path("follow", views.follow, name="follow"),
    path("edit", views.edit, name="edit"),
    path("like", views.like, name="like"),
    path("delete", views.delete, name="delete"),
    path("post/<int:post_id>", views.post, name="post"),
    path("post/<int:post_id>/comment", views.comment, name="comment")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
