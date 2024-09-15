import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <section className="max-w-screen mx-auto h-screen">
      <Nav />
      <Outlet />
    </section>
  );
};

export default Main;
