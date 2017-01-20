from django.shortcuts import render
import json
from rest_framework import viewsets, permissions, status, views
from models import Account
from serializers import AccountSerializer
from rest_framework.response import Response
from permissions import IsAccountOwner
from django.contrib.auth import authenticate, login, logout

# Create your views here.

class AccountViewSet(viewsets.ModelViewSet):
	lookup_field = 'username'
	queryset = Account.objects.all()
	serializers_class = AccountSerializer

	def get_permission(self):
		if self.request.method in permissions.SAFE_METHODS:
			return (permissions.AllowAny(),)

		if self.request.method == 'POST':
			return (permissions.AllowAny(),)

		return (permissions.IsAuthenticated(), IsAccountOwner(),)

	def create(sefl, request):
		serializer = self.serialzier_class(data=request.data)

		if serializer.is_valid():
			Account.objects.create_user(**serializer.validated_data)

			return Response(serializer.validated_data, status=status.HTTP_201_created)
		return Response({
			'status': 'Bad request',
			'message': 'Account could not be created with received data.'
		}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
	#taking the post request
	def post(self, request, format=None):
		#pulling out data from the dictionary
		data = json.loads(request.body)
		email = data.get('email', None)
		password = data.get('password', None)

		#check to see if data loaded successfully
		#pulling from python
		account = authenticate(email=email, password=password)

		if account is not None:
			if account.is_active:
				login(request, account)
				#serializing the information here
				serialized = AccountSerializer(account)
				return Response(serialized.data)

			else:
				return Response({
					'status' : 'Unauthorized', 
					'message': 'Account has been disabled',
					}, status=status.HTTP_401_UNAUTHORIZED)
		else:
			return Response({
				'status': 'Unauthorized',
				'message': 'Email/Password combination is invalid'
				}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(views.APIView):
	persmissions_classes = (permissions.IsAuthenticated,)
	def post(self, request, format = None):
		
		logout(request)

		return Response({}, status=status.HTTP_204_NO_CONTENT)
		