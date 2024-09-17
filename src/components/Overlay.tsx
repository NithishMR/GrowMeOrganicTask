import React, { useState } from "react";

interface OverlayProps {
  onClose: () => void;
  onSubmit: (rows: number) => void;
}

const Overlay: React.FC<OverlayProps> = ({ onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div
      className="overlay"
      style={{
        position: "absolute", // Positioning within the parent
        top: "100%", // Place below the header
        left: "50%",
        transform: "translateX(-50%)",
        width: "300px",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <input
        type="number"
        placeholder="Select your rows"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button
        onClick={() => onSubmit(parseInt(inputValue, 10))}
        style={{ width: "100%", padding: "10px" }}
      >
        Submit
      </button>
      <button
        onClick={onClose}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      >
        Close
      </button>
    </div>
  );
};

export default Overlay;
