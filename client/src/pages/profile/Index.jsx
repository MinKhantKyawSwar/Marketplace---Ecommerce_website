import { Tabs, message } from "antd";
import Products from "./Products";
import ManageProduct from "./ManageProduct";
import General from "./General";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../apicalls/product";

const Index = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [manageTabKey, setManageTabKey] = useState("1");

  const getProducts = async () => {
    try {
      const response = await getAllProducts();
      if (response.isSuccess) {
        setProducts(response.productDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect((_) => {
    if(activeTabKey===1){
      setEditMode(false);
      setEditProductId(null);
    }
    getProducts();
  }, []);

  const items = [
    {
      key: "1",
      label: "Products",
      children: (
        <Products
          products={products}
          setActiveTabKey={setActiveTabKey}
          setEditMode={setEditMode}
          setEditProductId={setEditProductId}
          getProducts={getProducts}
          setManageTabKey ={setManageTabKey}
        />
      ),
    },
    {
      key: "2",
      label: "Manage Products",
      children: (
        <ManageProduct
          setActiveTabKey={setActiveTabKey}
          getProducts={getProducts}
          editMode={editMode}
          setEditMode={setEditMode}
          editProductId={editProductId}
          manageTabKey = {manageTabKey}
        />
      ),
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

  const onChangeHandler = (key) => {
    setActiveTabKey(key);
    setEditMode(false);
  };

  return (
    <section>
      <Tabs
        activeKey={activeTabKey}
        tabPosition="left"
        items={items}
        onChange={(key) => onChangeHandler(key)}
      />
    </section>
  );
};

export default Index;
