import { Form, Input, message } from "antd";
import { loginUser, registerUser } from "../../apicalls/auth";

import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { setLoader } from "../../store/slices/loaderSlice";

const AuthForm = ({ isLoginPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isProcessing } = useSelector((state) => state.reducer.loader);

  const HandleOnFinish = async (values) => {
    dispatch(setLoader(true))
    if (isLoginPage) {
      try {
        const response = await loginUser(values);
        if (response.isSuccess) {
          message.success(response.message);
          localStorage.setItem("token", response.token);
          dispatch(setUser(response.token));

          navigate("/");
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        message.error(error.message);
      }
    } else {
      try {
        const response = await registerUser(values);
        if (response.isSuccess) {
          message.success(response.message);
          navigate("/login");
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        message.error(error.message);
      }
    }
    dispatch(setLoader(false))
  };

  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="w-[450px] border border-blue-400 px-10 py-5 rounded-md">
        <h1 className="text-3xl font-bold mb-4 text-blue-600 text-center pb-3">
          POINT.io {isLoginPage ? "LOGIN" : "REGISTER"}
        </h1>
        <Form layout="vertical" onFinish={HandleOnFinish} className="">
          {!isLoginPage && (
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Name is required to register an account.",
                },
                {
                  min: 3,
                  message: "Name should contain at least 3 characters.",
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
              {
                min: 5,
                message: "Password should contain at least 5 characters.",
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
              disabled={isProcessing}
            >
              {isLoginPage && !isProcessing && "Login"}
              {!isLoginPage && !isProcessing && "Register"}
              {isLoginPage && isProcessing && "Logging in ..."}
              {!isLoginPage && isProcessing && "Registering ..."}
            </button>
          </Form.Item>
          <p>
            {isLoginPage ? (
              <p>
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="font-medium text-blue-400 hover:text-blue-600"
                >
                  Register Here!
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-blue-400 hover:text-blue-600"
                >
                  Login Here!
                </Link>
              </p>
            )}
          </p>
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;
