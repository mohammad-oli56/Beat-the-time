import { createBrowserRouter } from "react-router-dom";  // react-router-dom, not react-router

import RootLayout from "../Layout/RootLayout";
import Login from "../Reg/Login";
import Signup from "../Reg/Signup";  // fixed typo here
import Home from "../Pages/Home";
import DashboardLayout from "../Layout/DashboardLayout";
import Profile from "../component/Profile";
import CreatEven from "../component/CreatEven";
import Event from "../component/Event";
import All_event from "../component/All_event";
import Event_details from "../component/Event_details";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,          // index route does NOT have path
        element: <Home />,
      },
      {
        path: '/details/:id',
        element: <Event_details />,
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/event/${params.id}`);
          if (!res.ok) {
            // let react-router handle the error (you can add an errorElement if you want)
            throw new Response("Failed to fetch event", { status: res.status });
          }
          return res.json(); // <-- return parsed JSON
        },
      },

      {
        path: 'allevent',
        element: <All_event></All_event>,
        loader: () => fetch("http://localhost:3000/alleven")
      },

    ],
  },
  {
    path: "/login",
    element: <Login />,    // use element instead of Component
  },
  {
    path: "/signup",
    element: <Signup />,   // use element instead of Component
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard',
        index: true,
        element: <Profile></Profile>,
        loader: async () => {
          const res = await fetch("http://localhost:3000/alluser");
          const data = await res.json(); // This gives an array
          return Array.isArray(data) ? data : []; // Make sure it's always an array
        }

      },
      {
        path: '/dashboard/createven',
        element: <CreatEven></CreatEven>
      },

    ]
  },
]);
