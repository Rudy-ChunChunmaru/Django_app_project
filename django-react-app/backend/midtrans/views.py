from rest_framework import mixins,generics,status
from rest_framework.response import Response

from .serializers import midtransSerializer

from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User

import midtransclient
import os

# Create your views here.
class getTokenMidtrans(
    mixins.CreateModelMixin,
    generics.GenericAPIView):
    serializer_class = midtransSerializer
    permission_classes =[AllowAny]

    def post(self, request,*args, **kwargs):
        order_id = request.data.get('order_id')
        gross_amount = request.data.get('gross_amount')
        snap = midtransclient.Snap(
            is_production=False,
            server_key= os.getenv("MIDTRANS_SERVER_KEY"),
            client_key= os.getenv("MIDTRANS_CLIENT_KEY")
        )
        # Prepare parameter
        param = {
                "transaction_details": {
                    "order_id": order_id,
                    "gross_amount": gross_amount
                },"credit_card":{
                    "secure" : True
                }
            }
        transaction = snap.create_transaction(param)
        return Response(data={'data':transaction}, status=status.HTTP_200_OK)


