from rest_framework import serializers

class midtransSerializer(serializers.Serializer):
    order_id = serializers.CharField(required=True,style={},write_only=True)
    gross_amount = serializers.CharField(required=True,style={},write_only=True)

      