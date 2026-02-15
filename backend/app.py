# backend.py
from flask import Flask
from flask_socketio import SocketIO
from adafruit_servokit import ServoKit

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

# Enable SocketIO
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize servo kit (16-channel servo controller)
kit = ServoKit(channels=16)

# Store current angles if you want to keep track
angles = [0] * 16  # assuming max 16 servos

# WebSocket event: frontend sends {"button_id": 0, "angle": 90}
@socketio.on('update_servo')
def handle_update_servo(data):
    button_id = data.get('button_id')
    angle = data.get('angle')

    if button_id is not None and angle is not None:
        # Clamp angle
        if angle < 0:
            angle = 0
        if angle > 180:
            angle = 180

        # Move the servo
        kit.servo[button_id].angle = angle
        angles[button_id] = angle

        print(f"Servo {button_id} moved to angle {angle}")

        # Optionally broadcast updated angles back to all clients
        socketio.emit('servo_updated', {'button_id': button_id, 'angle': angle})
    else:
        print("Invalid data received:", data)

if __name__ == "__main__":
    # Run on all addresses (0.0.0.0) so your Pi is reachable from your laptop
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
