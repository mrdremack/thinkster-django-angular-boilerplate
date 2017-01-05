from rest_framework import permissions
from rest_framework_nested import routers
from authentication.views import AccountViewSet



class IsAccountOwner(permissions.BasePermission):
	def has_object_permission(self, request, view, account):
		if request.user:
			return account == request.user
		return False

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

urlpatterns = patterns(
	'',
	# ... URLs
	url(r'^api/v1/', include(router.urls)),

	url('^.*$', IndexView.as_view(), name='index'),

	)