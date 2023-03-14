from django.views import View
# import json
from django.http import JsonResponse
from django.http import HttpResponse
# from django.contrib.auth import authenticate
# from django.core.exceptions import ValidationError
# from django.contrib.auth.models import User
from .models import Person
import random
from faker import Faker

import json
fake = Faker()


class AddPeople(View):
    def get(self, rquest):
        print("here")
        # for i in range(10000):
        #     name = fake.name()
        #     # last_name=names.get_last_name()
        #     age = random.randint(18, 60)
        #     phone = fake.phone_number()
        #     email = fake.email()
        #     person = Person(name=name, age=age, phone=phone, email=email)
        #     person.save()
            # print(names.get_first_name())
    def put(self, rquest,id):
        jd = json.loads(rquest.body)
        person = Person.objects.get(id=id)
        for key,value in jd.items():
            setattr(person, key, value)
        person.save()
        return HttpResponse("ok",200)


class GetPeople(View):
    def get(self, rquest):
        users = list(Person.objects.values())

        return JsonResponse({"people": users})
    
    def post(self, request):
        jd = json.loads(request.body)
        Person.objects.create(**jd)
        print("info recibida: ",jd)
        return JsonResponse({"informacion recibida en el servidor":jd})
    
class deletePeople(View):
    def get(self, rquest,id):
        person = Person.objects.get(id=id)
        person.delete()
        return JsonResponse({"message": "success"})