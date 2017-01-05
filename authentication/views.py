from django.shortcuts import render
import json
from rest_framework import viewsets, permissions, status, views
from models import Account
from serializers import AccountSerializer
from rest_framework.response import response
from permissions import IsAccountOwner

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

		