import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RenderRoot } from './pages/render/RenderRoot';

const router = createBrowserRouter([
  {
    path: "/render",
    element: <RenderRoot />
  },
  {
    path: "/*",
    element: null
  }
])

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
