import React, { useState } from 'react';

const COLORS = ['black', 'red', 'orange', 'yellow', 'green', 'blue'];

export function RenderRoot() {
  return (
    <Table>
      <StableChildren />
    </Table>
  );
}

function Table({ children }: { children: React.ReactNode }) {
  const [colorIndex, setColorIndex] = useState(0);

  const selectedColor = COLORS[colorIndex];

  return (
    <>
      <button
        onClick={() => {
          setColorIndex((colorIndex + 1) % COLORS.length);
        }}
      >
        Color changer button
      </button>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Component</th>
          </tr>
        </thead>
        <tbody>
          <TableRow
            cell1={<div>This is description</div>}
            cell2={<ColorBox color={selectedColor} />}
          />
          {children}
          <TableRow
            cell1={<div>This is description3</div>}
            cell2={<UnrelatedChild />}
          />
        </tbody>
      </table>
    </>
  );
}

function TableRow({
  cell1,
  cell2,
}: {
  cell1: React.ReactNode;
  cell2: React.ReactNode;
}) {
  return (
    <tr>
      <td>{cell1}</td>
      <td>{cell2}</td>
    </tr>
  );
}

function ColorBox({ color }: { color: string }) {
  console.log('Rendering ColorBox with', color);
  return (
    <div style={{ height: 200, width: 200, backgroundColor: color }}>
      My color is controlled by button
    </div>
  );
}

function UnrelatedChild() {
  console.log('Rendering UnrelatedChild');
  return (
    <div style={{ height: 200, width: 200, backgroundColor: 'green' }}>
      My color is always green
    </div>
  );
}

function StableChildren() {
  console.log('Rendering StableChildren');
  return (
    <tr>
      <td>I am passed down via a children prop.</td>
      <td>
        <div style={{ height: 200, width: 200, backgroundColor: 'blue' }}>
          My color is always blue
        </div>
      </td>
    </tr>
  );
}
