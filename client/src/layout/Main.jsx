import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <section className="max-w-5xl mx-auto">
      <Nav />
      <Outlet />
    </section>
  );
};

export default Main;
