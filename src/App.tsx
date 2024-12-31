import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SimpleRenderExample } from './pages/simple-render-example/SimpleRenderExample';

const router = createBrowserRouter([
  {
    path: '/simple-render-example',
    element: <SimpleRenderExample />,
  },
  {
    path: '/*',
    element: null,
  },
]);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  );
}

export default App;
