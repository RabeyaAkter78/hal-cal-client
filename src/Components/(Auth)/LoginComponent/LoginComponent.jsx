/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { Button, ConfigProvider, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

export default function LoginComponent() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { email, password } = values;
    console.log(values);

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();

      if (result.success) {
        // Show success message with Swal
        Swal.fire({
          title: "Good job!",
          text: "Log In Successful",
          icon: "success",
        });
        localStorage.setItem("user", JSON.stringify(result?.data));

        // Redirect to chat page
        router.push(`/chat`);
      } else {
        // Display error message if login fails
        console.error("Failed:", result);
        setError(result?.message || "Login failed. Please try again.");
        Swal.fire({
          title: "Error",
          text: result?.message || "Login failed.",
          icon: "error",
        });
      }
    } catch (error) {
      // Handle error during login process
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
      Swal.fire({
        title: "Error",
        text: "An error occurred during login.",
        icon: "error",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="bg-violet-800 h-screen">
        <div className="container mx-auto pt-20">
          <h1 className="text-center text-4xl font-bold text-white">Login</h1>

          <div className="p-5">
            <ConfigProvider
              theme={{
                components: {
                  Form: {
                    itemMarginBottom: 20,
                  },
                  Input: {
                    borderRadius: 0,
                  },
                },
              }}
            >
              <Form
                form={form}
                name="basic"
                labelCol={{ xs: 24, sm: 24, md: 24 }}
                wrapperCol={{ xs: 24, sm: 24, md: 24 }}
                style={{ maxWidth: "100%", width: "400px", margin: "0 auto" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your Email!" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                >
                  <Input placeholder="Password" type="password" />
                </Form.Item>

                {error && (
                  <p className="text-center text-xl font-bold text-red-500">
                    {error}
                  </p>
                )}
                <Form.Item>
                  <Button block htmlType="submit">
                    Log in
                  </Button>
                </Form.Item>
              </Form>
              <p className="text-center text-white">
                Don't Have an Account?
                <span>
                  <Link href="/register" className="underline">
                    Register
                  </Link>
                </span>
              </p>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
