import React, { useState } from 'react';

const COLORS = ['black', 'red', 'orange', 'yellow', 'green', 'blue'];

export function RenderRoot() {
  return (
    <Container>
      <StableChildren />
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
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
      {children}
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

function StableChildren() {
  return (
    <div style={{ height: 200, width: 200, backgroundColor: 'blue' }}>
      My color is always blue
    </div>
  );
}
