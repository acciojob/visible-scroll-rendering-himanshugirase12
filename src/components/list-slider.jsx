import React, { useRef, useState } from "react";
import "./list-slider.css";

export default function ListSlider() {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const itemHeight = 80; // approximate height of each item including margin/padding
  const containerHeight = 500;

  // Generate 100 items
  const items = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    description: `Description for item ${index + 1}`,
  }));

  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 2, items.length); // +2 buffer
  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll = () => {
    setScrollTop(containerRef.current.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: `${containerHeight}px`,
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <ul
        className="main"
        style={{
          position: "relative",
          height: `${items.length * itemHeight}px`, // total scrollable height
          padding: 0,
          margin: 0,
          listStyle: "none",
        }}
      >
        {visibleItems.map((item, index) => (
          <li
            key={item.id}
            style={{
              position: "absolute",
              top: `${(startIndex + index) * itemHeight}px`,
              height: `${itemHeight}px`,
              width: "100%",
              padding: "10px",
              border: "1px solid #eee",
              boxSizing: "border-box",
            }}
          >
            <h1>Item {item.id}</h1>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}