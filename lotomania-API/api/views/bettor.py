from rest_framework import mixins, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from drf_spectacular.utils import extend_schema, extend_schema_view

from core.models import BettorUser
from api.serializers import BettorSerializer, BettorRegisterSerializer, BettorProfileSerializer


__all__ = ['BettorViewSet']


@extend_schema_view(
    create=extend_schema(
        description='Cadastra um novo usuário (bettor).',
        request=BettorRegisterSerializer,
        responses={201: BettorSerializer},
    ),
)
class BettorViewSet(mixins.CreateModelMixin, GenericViewSet):
    queryset = BettorUser.objects.all()
    http_method_names = ['get', 'post', 'head', 'options']

    def get_serializer_class(self):
        match self.action:
            case 'create':
                return BettorRegisterSerializer
            case 'me':
                return BettorProfileSerializer
        return BettorSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        bettor = serializer.save()

        output_serializer = BettorSerializer(bettor)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(
        description='Retorna os dados do usuário autenticado.',
        responses={200: BettorSerializer}
    )
    @action(detail=False, methods=['get'], url_path='me')
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
