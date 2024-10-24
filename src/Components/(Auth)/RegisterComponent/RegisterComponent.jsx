/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { Button, ConfigProvider, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import Swal from "sweetalert2";
function RegisterPage() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const router = useRouter();
  const [error, setError] = useState();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Buttons:
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);

    if (fileList.length > 0) {
      formData.append("avatar", fileList[0].originFileObj);
    }

    try {
      const res = await fetch("https://hal-cal-server-2.onrender.com/auth", {
        method: "POST",
        headers: {},
        body: formData,
      });

      const result = await res.json();
      console.log(result);
      if (result.success) {
        Swal.fire({
          title: "Registration Successful!",
          text: "You can now log in with your account.",
          icon: "success",
        });
        router.push("/login");
      } else {
        Swal.fire({
          title: "Error",
          text: "An error occurred during registration. Please try again.",
          icon: "error",
        });
        setError(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8, color: "white" }}>Upload</div>
    </div>
  );
  return (
    <div className="bg-red-300 h-screen">
      <div className="container mx-auto pt-20">
        <h1 className="text-center text-4xl font-bold text-white">
          Register Now
        </h1>
        <div className="my-8 flex items-center justify-center">
          <Upload
            name="avatar"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </div>
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
                name="name"
                rules={[
                  { required: true, message: "Please input your Full Name!" },
                ]}
              >
                <Input
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your Confirm Password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </Form.Item>

              {error && (
                <p className="text-center text-xl font-bold text-red-500">
                  {error}
                </p>
              )}
              <Form.Item>
                <Button block htmlType="submit">
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
            <p className="text-center text-white">
              Already Have an Account?
              <span>
                <Link href="/login" className="underline">
                  Login
                </Link>
              </span>
            </p>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
