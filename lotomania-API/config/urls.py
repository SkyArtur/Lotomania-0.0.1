from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    path('api-lotomania/', include('api.urls')),
    path('api-lotomania/admin/', admin.site.urls),
    path('api-lotomania/api-auth/', include('rest_framework.urls')),
    path('api-lotomania/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api-lotomania/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='docs'),
    path('api-lotomania/docs/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
