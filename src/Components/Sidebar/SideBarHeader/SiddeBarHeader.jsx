"use client";

import { Input, Space } from "antd";
import Search from "antd/es/input/Search";
import { RxHamburgerMenu } from "react-icons/rx";
import { AudioOutlined } from "@ant-design/icons";
const SiddeBarHeader = () => {
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-300 py-4 px-2">
        <RxHamburgerMenu />
        <Space direction="vertical">
          <Search
            placeholder="Search users"
            onSearch={onSearch}
            style={{ width: 150 }}
          />
        </Space>
      </div>
    </div>
  );
};

export default SiddeBarHeader;
