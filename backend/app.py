from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/button", methods=["POST"])
def button_click():
    data = request.json
    button_id = data.get("button_id")
    print(f"Button {button_id} clicked!")
    return jsonify({"status": "ok", "button": button_id})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
