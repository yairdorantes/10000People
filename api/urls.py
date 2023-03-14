from django.urls import path
from .views import AddPeople, GetPeople,deletePeople
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    # path("/login",csrf_exempt( my_login.as_view()),name="login"),
    # path("/signup",csrf_exempt( my_signup.as_view()),name="signup"),
    path("people", csrf_exempt(AddPeople.as_view()), name="people"),
    path("update/<int:id>", csrf_exempt(AddPeople.as_view()), name="people"),
    path("get-people", csrf_exempt(GetPeople.as_view()), name="get-people"),
    path("del-people/<int:id>", csrf_exempt(deletePeople.as_view()), name="del-people"),
]
