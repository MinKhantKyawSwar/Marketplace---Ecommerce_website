import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Homepage/Index";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Main from "./layout/Main";
import Profile from "./pages/profile/Index";
import Admin from "./pages/admin/Index";
import AuthProvider from "./providers/AuthProvider";
import Details from "./pages/Homepage/Details";
import SavedProducts from "./pages/savedProducts/Index";
import About from "./pages/Navpage/About";
import Contact from "./pages/Navpage/Contact";
import QandA from "./pages/Navpage/QandA";

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
        },{
          path : "/saved-products",
          element:
          <AuthProvider>
            <SavedProducts/>
          </AuthProvider>
        },{
          path: "/about",
          element: <About />,
        },{
          path: "/contact",
          element: <Contact />,
        },{
          path: "/qanda",
          element: <QandA />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
