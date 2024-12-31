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
        Color changer button
      </button>
      <ColorBox color={COLORS[colorIndex]} />
      <UnrelatedChild />
    </>
  );
}

function ColorBox({ color }: { color: string }) {
  return (
    <div style={{ height: 200, width: 200, backgroundColor: color }}>
      My color is controlled by button
    </div>
  );
}

function UnrelatedChild() {
  return (
    <div style={{ height: 200, width: 200, backgroundColor: 'green' }}>
      My color is always green
    </div>
  );
}
