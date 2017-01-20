from django.conf.urls import patterns, url, include
#from posts.views import PostViewSet, AccountPostViewSet
from thinkster_django_angular_boilerplate.views import IndexView
from rest_framework_nested import routers
from authentication.views import AccountViewSet, LoginView, LogoutView
from post.views import PostViewSet, AccountPostViewSet


router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'post', PostViewSet)
accounts_router = routers.NestedSimpleRouter(
	router, r'accounts', lookup='account'
	)
accounts_router.register(r'post', AccountPostViewSet)



urlpatterns = patterns(
    '',
    url('^api/v1/', include(router.urls)),
    url('^api/v1/', include(accounts_router.urls)),
    url('^api/v1/auth/login/$', LoginView.as_view(), name='login'),
	url('^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url('^.*$', IndexView.as_view(), name='index'),
)
