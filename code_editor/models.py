from django.db import models


class Feedback(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=100, blank=True)
    subject = models.CharField(max_length=300, blank=True, null=True)
    message = models.TextField(blank=True)

    def __str__(self):
        return self.email