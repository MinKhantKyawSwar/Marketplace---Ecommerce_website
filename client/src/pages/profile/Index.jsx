import { Tabs } from "antd";
import Products from "./Products";
import AddProduct from "./AddProduct";
import General from "./General";
import { useState } from "react";

const Index = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");

  const items = [
    {
      key: "1",
      label: "Products",
      children: <Products />,
    },
    {
      key: "2",
      label: "Sell Products",
      children: <AddProduct setActiveTabKey={setActiveTabKey} />,
    },
    {
      key: "3",
      label: "Notifications",
      children: "Content of Tab Pane 2",
    },
    {
      key: "4",
      label: "General",
      children: <General />,
    },
  ];
  return (
    <Tabs
      activeKey={activeTabKey}
      tabPosition="left"
      items={items}
      size="large"
      onChange={(key) => setActiveTabKey(key)}
    />
  );
};

export default Index;
