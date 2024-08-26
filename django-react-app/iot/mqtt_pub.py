import sys
import paho.mqtt.client as paho

# Define callback for successful connection
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to the MQTT broker")
    else:
        print("Failed to connect, return code %d\n", rc)
        sys.exit(1)

# Define callback for successful publishing
def on_publish(client, userdata, mid):
    print("Message Published")

# Create a client instance
client = paho.Client()

# Assign callbacks
client.on_connect = on_connect
client.on_publish = on_publish

# Connect to the broker
if client.connect("localhost", 1883, 60) != 0:
    print("Couldn't connect to the MQTT broker")
    sys.exit(1)

# Publish a message
result = client.publish("test_topic", "Hi, Paho MQTT client works fine!", qos=0)

# Check if the message was published successfully
if result.rc == paho.MQTT_ERR_SUCCESS:
    print("Message sent successfully")
else:
    print(f"Failed to send message, error code: {result.rc}")

# Disconnect from the broker
client.disconnect()