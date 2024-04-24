import React, { Suspense, lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Login';
import Error from "./Error";
const Browse = lazy( () => import("./Browse") );
const About = lazy( () => import("./About") );

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <Error />,
      children: [
        {
          path: "/About",
          element: <Suspense fallback={<Error />}><About /></Suspense>,
        },
      ],
    },
    {
      path:"/error",
      element:<Error />,
      errorElement: <Error />
    },
    {
        path:"/browse",
        element:<Suspense fallback={<Error />}><Browse /></Suspense>,
    },
    
  ]);

  return (
    <div>
      <RouterProvider router={appRouter}>
      </RouterProvider>
    </div>
  )
}

export default Body;