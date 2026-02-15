import React, { useRef, useState, useEffect } from "react";
import ControlButton from "./components/controlButton";
import { io, Socket } from "socket.io-client";

function App() {
  const intervalRef = useRef<number | null>(null);

  const [angles, setAngles] = useState<number[]>([0, 0, 0, 0, 0, 0]); // 6 servos
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // Add this for WebSocket
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Connect to your backend via WebSocket
    const s = io("ws://10.7.x.x:5000"); // <-- Replace with your Pi's IP
    setSocket(s);

    // Optional: listen for server updates
    s.on("servo_updated", (data: { button_id: number; angle: number }) => {
      setAngles((prev) => {
        const newAngles = [...prev];
        newAngles[data.button_id] = data.angle;
        return newAngles;
      });
    });

    return () => {
      s.disconnect();
    };
  }, []);

  const startSending = (direction: "increase" | "decrease", button_id: number) => {
    if (intervalRef.current) return;

    intervalRef.current = window.setInterval(() => {
      setAngles((prevAngles) => {
        const newAngles = [...prevAngles];
        let newAngle =
          direction === "increase" ? newAngles[button_id] + 5 : newAngles[button_id] - 5;

        if (newAngle > 180) newAngle = 180;
        if (newAngle < 0) newAngle = 0;

        newAngles[button_id] = newAngle;

        // <-- Send angle via WebSocket instead of HTTP fetch
        socket?.emit("update_servo", { button_id, angle: newAngle });

        return newAngles;
      });
    }, 40);
  };

  const stopSending = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div style={{ padding: "50px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
      <h2>Hold Buttons</h2>
      <div style={{
        display: "flex",
        gap: "3rem",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        {/* Servo 1 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <ControlButton
            number={0}
            direction="increase"
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            startSending={startSending}
            stopSending={stopSending}
          />
          <div style={{
            width: '60px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            background: '#f9fafb',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
          }}>
            {angles[0]}
          </div>
          <ControlButton
            number={0}
            direction="decrease"
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            startSending={startSending}
            stopSending={stopSending}
          />
          <div style={{ marginTop: "0.5rem", fontWeight: 500 }}>Servo 1</div>
        </div>

        {/* Servo 2 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <ControlButton
            number={1}
            direction="increase"
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            startSending={startSending}
            stopSending={stopSending}
          />
          <div style={{
            width: '60px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            background: '#f9fafb',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
          }}>
            {angles[1]}
          </div>
          <ControlButton
            number={1}
            direction="decrease"
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            startSending={startSending}
            stopSending={stopSending}
          />
          <div style={{ marginTop: "0.5rem", fontWeight: 500 }}>Servo 2</div>
        </div>

        {/* Servo 3 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <ControlButton
            number={2}
            direction="increase"
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            startSending={startSending}
            stopSending={stopSending}
          />
          <div style={{
            width: '60px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            background: '#f9fafb',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
          }}>
            {angles[2]}
          </div>
          <ControlButton
            number={2}
            direction="decrease"
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            startSending={startSending}
            stopSending={stopSending}
          />
          <div style={{ marginTop: "0.5rem", fontWeight: 500 }}>Servo 3</div>
        </div>
      </div>

      {/* Row 2 */}
      <div style={{
        display: "flex",
        gap: "2rem",
        justifyContent: "center",
        marginTop: "2rem",
        flexWrap: "wrap"
      }}>
        {/* Servo 4 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <ControlButton
            number={3}
            direction="increase"
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            startSending={startSending}
            stopSending={stopSending}
          />
          <div style={{
            width: '60px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            background: '#f9fafb',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
          }}>
            {angles[3]}
          </div>
          <ControlButton
            number={3}
            direction="decrease"
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            startSending={startSending}
            stopSending={stopSending}
          />
          <div style={{ marginTop: "0.5rem", fontWeight: 500 }}>Servo 4</div>
        </div>

        {/* Servo 5 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <ControlButton
            number={4}
            direction="increase"
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            startSending={startSending}
            stopSending={stopSending}
          />
          <div style={{
            width: '60px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            background: '#f9fafb',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
          }}>
            {angles[4]}
          </div>
          <ControlButton
            number={4}
            direction="decrease"
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            startSending={startSending}
            stopSending={stopSending}
          />
          <div style={{ marginTop: "0.5rem", fontWeight: 500 }}>Servo 5</div>
        </div>

        {/* Servo 6 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <ControlButton
            number={5}
            direction="increase"
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            startSending={startSending}
            stopSending={stopSending}
          />
          <div style={{
            width: '60px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            background: '#f9fafb',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
          }}>
            {angles[5]}
          </div>
          <ControlButton
            number={5}
            direction="decrease"
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            startSending={startSending}
            stopSending={stopSending}
          />
          <div style={{ marginTop: "0.5rem", fontWeight: 500 }}>Servo 6</div>
        </div>
      </div>
    </div>
  );
}

export default App;
