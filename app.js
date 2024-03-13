import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, RouterProvider, createBrowserRouter } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="app">
            <h1>Hello</h1>
        </div>
    )
}; 

const AppRouter = createBrowserRouter(
    [
        {
            path: "/",
            element: <AppLayout />,
        }
    ]
);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={AppRouter} />);