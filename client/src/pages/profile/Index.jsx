import { Tabs } from "antd";
import Products from "./Products";
import AddProduct from "./AddProduct";

const Index = () => {
  const items = [
    {
      key: "1",
      label: "Products",
      children: <Products />,
    },
    {
      key: "2",
      label: "Add Products",
      children: <AddProduct />,
    },
    {
      key: "3",
      label: "Notifications",
      children: "Content of Tab Pane 2",
    },
    {
      key: "4",
      label: "Profile",
      children: "Content of Tab Pane 3",
    },
  ];
  return <Tabs defaultActiveKey="1" tabPosition="left" items={items} />;
};

export default Index;
