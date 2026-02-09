import React from "react";

function App() {
  const handleClick = async () => {
    const res = await fetch("http://localhost:5000/api/button", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Button pressed!" })
    });
    const data = await res.json();
    console.log("Response from backend:", data);
  };

  return (
    <div style={{ padding: "50px" }}>
      <button onClick={handleClick}>button 1</button>
    </div>
  );
}

export default App;
