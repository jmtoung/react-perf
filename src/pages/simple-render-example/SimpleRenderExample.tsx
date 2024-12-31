import React, { useState } from 'react';

const COLORS = ['black', 'red', 'orange', 'yellow', 'green', 'blue'];

export function SimpleRenderExample() {
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
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          margin: '10px 0',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = '#45a049')}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = '#4CAF50')}
        onClick={() => {
          setColorIndex((colorIndex + 1) % COLORS.length);
        }}
      >
        Color changer button
      </button>

      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th
              style={{
                border: '1px solid #ddd',
                padding: '8px',
                textAlign: 'left',
              }}
            >
              Description
            </th>
            <th
              style={{
                border: '1px solid #ddd',
                padding: '8px',
                textAlign: 'left',
              }}
            >
              Component
            </th>
          </tr>
        </thead>
        <tbody>
          <TableRow
            cell1={Row1Cell1Node}
            cell2={<ColorBox color={selectedColor} />}
          />
          <TableRow
            cell1={
              <div>
                This row contains a component that does not depend on the
                `color` prop that is controlled by the button.
              </div>
            }
            cell2={<UnrelatedChild />}
          />
          <MemoizedRow />
          {children}
        </tbody>
      </table>
    </>
  );
}

const Row1Cell1 = React.memo(function _Row1Cell1() {
  console.log('Rendering Row1Cell1');
  return (
    <div>
      This row contains a component that is directly dependent on the `color`
      prop that is controlled by the button.
    </div>
  );
});

const Row1Cell1Node = <Row1Cell1 />;

function TableRow({
  cell1,
  cell2,
}: {
  cell1: React.ReactNode;
  cell2: React.ReactNode;
}) {
  return (
    <tr>
      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{cell1}</td>
      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{cell2}</td>
    </tr>
  );
}

function ColorBox({ color }: { color: string }) {
  console.log('Rendering ColorBox with', color);
  return (
    <div style={{ height: 100, width: 200, backgroundColor: color }}>
      My color is controlled by button
    </div>
  );
}

function UnrelatedChild() {
  console.log('Rendering UnrelatedChild');
  return (
    <div style={{ height: 100, width: 200, backgroundColor: 'green' }}>
      My color is NOT controlled by button
    </div>
  );
}

function MemoizedUnrelatedChild() {
  console.log('Rendering (memoized) UnrelatedChild');
  return (
    <div style={{ height: 100, width: 200, backgroundColor: 'yellow' }}>
      My color is NOT controlled by button
    </div>
  );
}

const MemoizedRow = React.memo(function _MemoizedRow() {
  console.log('Rendering memoized row');
  return (
    <TableRow
      cell1={
        <div>
          This *MEMOIZED* row contains a component that does not depend on the
          `color` prop that is controlled by the button.
        </div>
      }
      cell2={<MemoizedUnrelatedChild />}
    />
  );
});

function StableChildren() {
  console.log('Rendering StableChildren');
  return (
    <tr>
      <td style={{ border: '1px solid #ddd', padding: '8px' }}>
        This row is passed down via a `children` prop to the table. It does not
        re-render when the table (parent) re-renders.
      </td>
      <td style={{ border: '1px solid #ddd', padding: '8px' }}>
        <div style={{ height: 100, width: 200, backgroundColor: 'blue' }}>
          `children`
        </div>
      </td>
    </tr>
  );
}
