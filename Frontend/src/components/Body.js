import React, { Suspense, lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Login';
import Error from "./Error";
import Pay  from './Pay';
const Browse = lazy( () => import("./Browse") );
const About = lazy( () => import("./About") );
const Profile = lazy( () => import("./Profile") );

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <Error />,
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
    {
      path: "/about",
      element: <Suspense fallback={<Error />}><About /></Suspense>,
    },
    {
      path:'/profile',
      element: <Suspense fallback={<Error/>}><Profile /></Suspense>
    },
    {
      path: "/pay",
      element: <Suspense fallback={<Error/>} ><Pay/></Suspense>
    }
    
  ]);

  return (
    <div>
      <RouterProvider router={appRouter}>
      </RouterProvider>
    </div>
  )
}

export default Body;