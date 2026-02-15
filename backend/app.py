from flask import Flask, request
from flask_socketio import SocketIO
import socket

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Example route if you still want HTTP fallback
@app.route("/api/button", methods=["POST"])
def button():
    data = request.get_json()
    print(f"Received via HTTP: {data}")
    return "OK", 200

# WebSocket event
@socketio.on("update_servo")
def handle_update_servo(data):
    print(f"Received via WebSocket: {data}")
    button_id = data.get("button_id")
    angle = data.get("angle")
    # Move servo here: kit.servo[button_id].angle = angle

def get_local_ip():
    """Get local IP of Raspberry Pi on the network"""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # Doesn't have to be reachable
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = "127.0.0.1"
    finally:
        s.close()
    return ip

if __name__ == "__main__":
    local_ip = get_local_ip()
    print(f"Server running on all addresses (0.0.0.0)")
    print(f"Access via local IP: http://{local_ip}:5000")
    print(f"Access via localhost: http://127.0.0.1:5000")
    socketio.run(app, host="0.0.0.0", port=5000)
