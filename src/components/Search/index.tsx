import React, { ChangeEvent, memo, useState } from "react";
import { IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Input } from "antd";

interface Props {
  placeholder: string;
  onChange: (value: string) => void;
  width?: string;
  loading: boolean;
}

const Search = ({ placeholder, onChange, width, loading }: Props) => {
  const getValue = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    onChange && onChange(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // onChange && onChange(valueSearch)
    }
  };
  return (
    <div
      style={{ width: width }}
      className="flex  content-center border items-center  rounded-sm bg-white"
    >
      {/* <IconButton>
        <SearchOutlinedIcon
          sx={{
            fontSize: "20px",
            alignItems: "center",
            marginTop: "3px",
          }}
        />
      </IconButton> */}
      <Input.Search
        className="mr-5 text-2xl  text-black placeholder:text-2xl focus:outline-none"
        placeholder={`${placeholder}...`}
        loading={loading}
        onChange={getValue}
        onKeyDown={handleKeyDown}
      />
      {/* <input
        className="mr-5 text-2xl w-[90%] text-black placeholder:text-2xl focus:outline-none"
        type="search"
        placeholder={`${placeholder}...`}
        onChange={getValue}
        onKeyDown={handleKeyDown}
      /> */}
    </div>
  );
};

export default memo(Search);
