type ControlButtonProps = {
  number: number;
  direction: "increase" | "decrease";
  activeButton: string | null;
  setActiveButton: (value: string | null) => void;
  startSending: (direction: "increase" | "decrease", id: number) => void;
  stopSending: () => void;
};
``
export default function ControlButton(props: ControlButtonProps) {
  const {
    number,
    direction,
    activeButton,
    setActiveButton,
    startSending,
    stopSending,
  } = props;
  const buttonKey = `button${number}-${direction}`;
  const isActive = activeButton === buttonKey;

  const handleStart = () => {
    setActiveButton(buttonKey);
    startSending(direction, number);
  };

  const handleStop = () => {
    setActiveButton(null);
    stopSending();
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleStop();
    if (!isActive) {
      e.currentTarget.style.background = "#ffffff";
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isActive) {
      e.currentTarget.style.background = "#f3f4f6";
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button
        onMouseDown={handleStart}
        onMouseUp={handleStop}
        onMouseLeave={handleMouseLeave} // single attribute now
        onMouseEnter={handleMouseEnter} // single attribute now
        onTouchStart={handleStart}
        onTouchEnd={handleStop}
        style={{
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isActive ? "#3b82f6" : "#ffffff",
          border: "2px solid #d1d5db",
          borderRadius: "8px",
          cursor: "pointer",
          color: isActive ? "#ffffff" : "#374151",
          transition: "all 0.15s ease",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        {/* Down Arrow SVG for decrease */}
        {direction === "decrease" ? (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        ) : (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 15 12 9 18 15" />
          </svg>
        )}
      </button>

      <div
        style={{
          fontSize: "0.875rem",
          fontWeight: "500",
          color: "#6b7280",
          marginTop: "0.25rem",
        }}
      >
        Button {number}
      </div>
    </div>
  );
};
