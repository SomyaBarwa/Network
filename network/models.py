from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Profile(models.Model):
   user = models.OneToOneField(User, on_delete=models.CASCADE)
   image = models.ImageField(default='default.jpg', upload_to='profile_pics')
   def __str__(self):
      return f'{self.user.username} Profile'


class Post(models.Model):
    poster = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    post = models.CharField(max_length=255)
    datetime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.poster} : {self.post}"
    

class Like(models.Model):
    liker = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Post, on_delete=models.CASCADE)   

    def __str__(self):
        return f"{self.liker} liked {self.comment}" 


class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name="follows")
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followed_by")

    def __str__(self): 
        return f"{self.follower} follows {self.following}"
    
    
