import midtransclient

snap = midtransclient.Snap(
    is_production=False,
    server_key='SB-Mid-server-CQbWf2yl3Y8aK2iPZOb6CjVR',
    client_key='SB-Mid-client-93qoIIfti0fnEO83'
)
# Prepare parameter
param = {
    "transaction_details": {
        "order_id": "test-transaction-123",
        "gross_amount": 200000
    }, "credit_card":{
        "secure" : True
    }
}

transaction = snap.create_transaction(param)

transaction_token = transaction['token']
print(transaction_token)