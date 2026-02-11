import React, { useRef, useState } from "react";

function App() {
  const intervalRef = useRef<number | null>(null);

  const [angle, setAngle] = useState(90); // start in middle

  const startSending = (direction: "increase" | "decrease", button_id: number) => {
    if (intervalRef.current) return;

    intervalRef.current = window.setInterval(async () => {
      setAngle((prev) => {
        let newAngle =
          direction === "increase" ? prev + 5 : prev - 5;

        // Clamp between 0 and 180
        if (newAngle > 180) newAngle = 180;
        if (newAngle < 0) newAngle = 0;

        sendAngle(newAngle, button_id);
        return newAngle;
      });
    }, 40);
  };

  const stopSending = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const sendAngle = async (angleValue: number, button_id: number) => {
    await fetch("http://10.7.2.81:5000/api/button", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ angle: angleValue, button_id: button_id }),
    });

    console.log("Sending angle:", angleValue);
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Hold Buttons</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 120px)", gap: "10px" }}>
        <h3>Servo 1</h3>
        <button
        onMouseDown={() => startSending("decrease",0)}
        onMouseUp={stopSending}
        onMouseLeave={stopSending}
        onTouchStart={() => startSending("decrease",0)}
        onTouchEnd={stopSending}
      >
        Decrease
      </button>

      <button
        onMouseDown={() => startSending("increase",0)}
        onMouseUp={stopSending}
        onMouseLeave={stopSending}
        onTouchStart={() => startSending("increase",0)}
        onTouchEnd={stopSending}
      >
        Increase
      </button>


      <h3>Servo 2</h3>
        <button
        onMouseDown={() => startSending("decrease",1)}
        onMouseUp={stopSending}
        onMouseLeave={stopSending}
        onTouchStart={() => startSending("decrease",1)}
        onTouchEnd={stopSending}
      >
        Decrease2
      </button>

      <button
        onMouseDown={() => startSending("increase",1)}
        onMouseUp={stopSending}
        onMouseLeave={stopSending}
        onTouchStart={() => startSending("increase",1)}
        onTouchEnd={stopSending}
      >
        Increase2
      </button>
        {/* <button
          onMouseDown={() => startSending(2)}
          onMouseUp={stopSending}
          onMouseLeave={stopSending}
          onTouchStart={() => startSending(2)}
          onTouchEnd={stopSending}
        >
          Button 3
        </button>
        <button
          onMouseDown={() => startSending(3)}
          onMouseUp={stopSending}
          onMouseLeave={stopSending}
          onTouchStart={() => startSending(3)}
          onTouchEnd={stopSending}
        >
          Button 4
        </button>

        <button
          onMouseDown={() => startSending(4)}
          onMouseUp={stopSending}
          onMouseLeave={stopSending}
          onTouchStart={() => startSending(4)}
          onTouchEnd={stopSending}
        >
          Button 5
        </button>
        <button
          onMouseDown={() => startSending(5)}
          onMouseUp={stopSending}
          onMouseLeave={stopSending}
          onTouchStart={() => startSending(5)}
          onTouchEnd={stopSending}
        >
          Button 6
        </button>
        <button
          onMouseDown={() => startSending(6)}
          onMouseUp={stopSending}
          onMouseLeave={stopSending}
          onTouchStart={() => startSending(6)}
          onTouchEnd={stopSending}
        >
          Button 7
        </button>
        <button
          onMouseDown={() => startSending(7)}
          onMouseUp={stopSending}
          onMouseLeave={stopSending}
          onTouchStart={() => startSending(7)}
          onTouchEnd={stopSending}
        >
          Button 8
        </button>

        <button
          onMouseDown={() => startSending(8)}
          onMouseUp={stopSending}
          onMouseLeave={stopSending}
          onTouchStart={() => startSending(8)}
          onTouchEnd={stopSending}
        >
          Button 9
        </button>
        <button
          onMouseDown={() => startSending(9)}
          onMouseUp={stopSending}
          onMouseLeave={stopSending}
          onTouchStart={() => startSending(9)}
          onTouchEnd={stopSending}
        >
          Button 10
        </button>
        <button
          onMouseDown={() => startSending(10)}
          onMouseUp={stopSending}
          onMouseLeave={stopSending}
          onTouchStart={() => startSending(10)}
          onTouchEnd={stopSending}
        >
          Button 11
        </button>
        <button
          onMouseDown={() => startSending(11)}
          onMouseUp={stopSending}
          onMouseLeave={stopSending}
          onTouchStart={() => startSending(11)}
          onTouchEnd={stopSending}
        >
          Button 12
        </button> */}
        {/* Repeat for all 12 buttons explicitly */}
      </div>
    </div>
  );
}

export default App;
