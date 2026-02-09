import React from "react";

function App() {
  const handleClick = async (id) => {
    const res = await fetch("http://localhost:5000/api/button", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ button_id: id }),
    });
    const data = await res.json();
    console.log("Response from backend:", data);
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Buttons</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 120px)", gap: "10px" }}>
        <button onClick={() => handleClick(0)}>Button 1</button>
        <button onClick={() => handleClick(1)}>Button 2</button>
        <button onClick={() => handleClick(2)}>Button 3</button>
        <button onClick={() => handleClick(3)}>Button 4</button>
        <button onClick={() => handleClick(4)}>Button 5</button>
        <button onClick={() => handleClick(5)}>Button 6</button>
        <button onClick={() => handleClick(6)}>Button 7</button>
        <button onClick={() => handleClick(7)}>Button 8</button>
        <button onClick={() => handleClick(8)}>Button 9</button>
        <button onClick={() => handleClick(9)}>Button 10</button>
        <button onClick={() => handleClick(10)}>Button 11</button>
        <button onClick={() => handleClick(11)}>Button 12</button>
      </div>
    </div>
  );
}

export default App;
