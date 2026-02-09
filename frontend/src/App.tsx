import React, { useRef } from "react";

function App() {
  const intervalRef = useRef(null);

  const startSending = (id) => {
    if (intervalRef.current) return; // already sending
    intervalRef.current = setInterval(async () => {
      await fetch("http://localhost:5000/api/button", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ button_id: id }),
      });
      console.log("Sending button", id);
    }, 200); // send every 200ms
  };

  const stopSending = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Hold Buttons</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 120px)", gap: "10px" }}>
        <button
          onMouseDown={() => startSending(0)}
          onMouseUp={stopSending}
          onMouseLeave={stopSending}
          onTouchStart={() => startSending(0)}
          onTouchEnd={stopSending}
        >
          Button 1
        </button>
        <button
          onMouseDown={() => startSending(1)}
          onMouseUp={stopSending}
          onMouseLeave={stopSending}
          onTouchStart={() => startSending(1)}
          onTouchEnd={stopSending}
        >
          Button 2
        </button>
        <button
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
        </button>
        {/* Repeat for all 12 buttons explicitly */}
      </div>
    </div>
  );
}

export default App;
