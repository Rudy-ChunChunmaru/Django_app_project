from rest_framework import mixins,generics,status
from rest_framework.response import Response

from .serializers import midtransSerializer

from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User

import midtransclient

# Create your views here.
class getTokenMidtrans(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = midtransSerializer
    permission_classes =[AllowAny]

    def post(self, request):
        order_id = request.data.get('order_id')
        gross_amount = request.data.get('gross_amount')
        snap = midtransclient.Snap(
            is_production=False,
            server_key='SB-Mid-server-CQbWf2yl3Y8aK2iPZOb6CjVR',
            client_key='SB-Mid-client-93qoIIfti0fnEO83'
        )
        # Prepare parameter
        param = {
            "transaction_details": {
                "order_id": order_id,
                "gross_amount": gross_amount
            }, "credit_card":{
                "secure" : True
            }
        }
        transaction = snap.create_transaction(param)
        return Response(data={transaction}, status=status.HTTP_200_OK)


