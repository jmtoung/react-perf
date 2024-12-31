import React from 'react';

type ContextType = [number, React.Dispatch<React.SetStateAction<number>>];
const ExampleContext = React.createContext<null | ContextType>(null);

const COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

function ExampleProvider({ children }: { children: React.ReactNode }) {
  const [colorIndex, setColorIndex] = React.useState(0);

  const value = React.useMemo(
    (): ContextType => [colorIndex, setColorIndex],
    [colorIndex]
  );

  return (
    <ExampleContext.Provider value={value}>{children}</ExampleContext.Provider>
  );
}
export function ReactContextExample() {
  return (
    <ExampleProvider>
      <ColorChangerButton />
      <Table />
    </ExampleProvider>
  );
}

function useReactContext() {
  const context = React.useContext(ExampleContext);
  if (!context) {
    throw new Error('useReactContext must be called within ExampleProvider');
  }
  return context;
}

function Table() {
  console.log('Rendering Table');
  return (
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
            Components that depend on useContext
          </th>
          <th
            style={{
              border: '1px solid #ddd',
              padding: '8px',
              textAlign: 'left',
            }}
          >
            Components that do NOT depend on useContext
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}>
            <DependsOnContextComponent />
          </td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}>
            <DependsNotOnContextComponent />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function ColorChangerButton() {
  const [colorIndex, setColorIndex] = useReactContext();

  return (
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
  );
}

function DependsOnContextComponent() {
  const [colorIndex] = useReactContext();

  console.log('Rendering DependsOnContextComponent:', COLORS[colorIndex]);

  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: COLORS[colorIndex],
        borderRadius: '50%',
      }}
    />
  );
}

function DependsNotOnContextComponent() {
  console.log('Rendering DependsNotOnContextComponent');

  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: 'yellow',
        borderRadius: '50%',
      }}
    />
  );
}
