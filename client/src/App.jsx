import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Homepage/Index";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Main from "./layout/Main";
import Profile from "./pages/profile/Index";
import Admin from "./pages/admin/Index";
import AuthProvider from "./providers/AuthProvider";
import Details from "./pages/Homepage/Details";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: (
          <AuthProvider>
            <Index />
          </AuthProvider>
          )
          ,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: (
            <AuthProvider>
              <Profile />
            </AuthProvider>
          ),
        }, {
          path : "/admin",
          element : (
            <AuthProvider>
              <Admin />
            </AuthProvider>
          )
        },{
          path : "/products/:id",
          element: <Details/>
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
