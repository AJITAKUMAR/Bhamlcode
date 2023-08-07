from django.urls import path
from . import views
urlpatterns = [
    # path('', views.code_editor, name='code_editor'),
    path('hindi/', views.hindi_code_editor, name='hindi_code_editor'),
    path('gujarati/', views.gujarati_code_editor, name='gujarati_code_editor'),
    path('kannada/', views.kannada_code_editor, name='kannada_code_editor'),
    path('malayalam/', views.malayalam_code_editor, name='malayalam_code_editor'),
    path('bangla/', views.bangla_code_editor, name='bangla_code_editor'),
    path('maori/', views.maori_code_editor, name='maori_code_editor'),
    path('marathi/', views.marathi_code_editor, name='marathi_code_editor'),
    path('odia/', views.odia_code_editor, name='odia_code_editor'),
    path('punjabi/', views.punjabi_code_editor, name='punjabi_code_editor'),
    path('tamil/', views.tamil_code_editor, name='tamil_code_editor'),
    path('telugu/', views.telugu_code_editor, name='telugu_code_editor'),
    path('arabic/', views.arabic_code_editor, name='arabic_code_editor'),
    #path('', views.bhaml2, name='bhaml2'),
]

