import React from "react";
import { Checkbox, Col, Form, Input, message, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";

import { sellProduct } from "../../apicalls/product";

const AddProduct = ({ setActiveTabKey }) => {
  const [form] = Form.useForm();

  const categoryOptions = [
    {
      value: "clothing_and_fashion",
      label: "Clothing and Fashion",
    },
    {
      value: "electronics_and_gadgets",
      label: "Electronics and Gadgets",
    },
    {
      value: "home_and_furniture",
      label: "Home and Furniture",
    },
    {
      value: "beauty_and_personal_care",
      label: "Beauty and Personal Care",
    },
    {
      value: "books_and_media",
      label: "Books and Media",
    },
    {
      value: "sports_and_fitness",
      label: "Sports and Fitness",
    },
    {
      value: "toys_and_games",
      label: "Toys and Games",
    },
  ];

  const checkBoxOptions = [
    {
      label: "Accessories",
      value: "accessories",
    },
    {
      label: "Warrenty",
      value: "warrenty",
    },
    {
      label: "Voucher",
      value: "voucher",
    },
  ];

  const onFinishHandler = async (values) => {
    try {
      const response = await sellProduct(values);
      if (response.isSuccess) {
        form.resetFields();
        message.success(response.message);
        setActiveTabKey("1");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold my-2">What do you want to sell?</h1>
      <Form layout="vertical" onFinish={onFinishHandler} form={form}>
        <Form.Item
          name="product_name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Product Name is required.",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter Product Name"></Input>
        </Form.Item>
        <Form.Item
          name="product_description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Description is required.",
            },
          ]}
          hasFeedback
        >
          <TextArea placeholder="Enter Product Description" rows={4} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="product_price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Price is required.",
                },
              ]}
              hasFeedback
            >
              <Input type="number" placeholder="eg: $ 250"></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="product_category"
              label="Choose a category"
              rules={[
                {
                  required: true,
                  message: "Category is required.",
                },
              ]}
              hasFeedback
            >
              <Select options={categoryOptions} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="product_used_for"
              label="Product's Used Times"
              rules={[
                {
                  required: true,
                  message: "Product's Used times is required.",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="eg: used 2 times"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="product_details" label="This product includes">
          <Checkbox.Group options={checkBoxOptions} />
        </Form.Item>
        <button
          type="submit"
          className=" font-medium text-lg text-center py-1 rounded-md bg-blue-500 text-white flex items-center gap-2 justify-center w-full"
        >
          <SquaresPlusIcon width={30} />
          Sell
        </button>
      </Form>
    </section>
  );
};

export default AddProduct;
