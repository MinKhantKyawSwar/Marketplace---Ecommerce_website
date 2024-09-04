import { Form, Input } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";

const AuthForm = ({ isLoginPage }) => {
  const HandleOnFinish = async (values) => {
    console.log(values);
  };
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="w-[450px]">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          POINT.io {isLoginPage ? "LOGIN" : "REGISTER"}
        </h1>
        <Form layout="vertical" onFinish={HandleOnFinish}>
          {!isLoginPage && (
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Name is required to register an account.",
                },
              ]}
              hasFeedback
            >
              <Input prefix={<UserOutlined />} placeholder="Name"></Input>
            </Form.Item>
          )}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Email is required to register an account.",
              },
              {
                type: "email",
                message: "Enter a valid Email.",
              },
            ]}
            hasFeedback
          >
            <Input prefix={<MailOutlined />} placeholder="Email"></Input>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Password is required to register an account.",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            ></Input.Password>
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              className="w-full outline-none bg-blue-600 text-white py-2 rounded-md"
            >
              Register
            </button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;
