import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dictionary from "./pages/dictionary/dictionary.tsx";
import Graph from "./pages/graph/graph.tsx";
import Layout from "./layout/layout.tsx";
import NotFound from "./pages/not-found/not-found.tsx";
import { ReactFlowProvider } from "reactflow";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Dictionary />
            },
            {
                path: '/graph',
                element: <Graph />
            }
        ],
        errorElement: <NotFound />
    }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ReactFlowProvider>
          <RouterProvider router={router} />
      </ReactFlowProvider>
  </React.StrictMode>,
)
