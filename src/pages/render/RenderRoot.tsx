import React, { useState } from 'react';

const COLORS = ['black', 'red', 'orange', 'yellow', 'green', 'blue'];

export function RenderRoot() {
  const [colorIndex, setColorIndex] = useState(0);

  return (
    <>
      <button
        onClick={() => {
          setColorIndex((colorIndex + 1) % COLORS.length);
        }}
      >
        Change the color of the box
      </button>
      <ColorBox color={COLORS[colorIndex]} />
    </>
  );
}

function ColorBox({ color }: { color: string }) {
  return <div style={{ height: 100, width: 100, backgroundColor: color }} />;
}
