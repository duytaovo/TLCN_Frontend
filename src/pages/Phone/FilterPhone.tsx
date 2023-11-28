import { Dispatch, SetStateAction, useState } from "react";
import Filter from "src/components/Filter/Filter";

export interface DataPropsPhone {
  id: number;
  title: string;
  detail: any[];
  img?: string[];
}
const dataBrand = [
  {
    id: 1,
    title: "Apple",
    link: "//cdn.tgdd.vn/Brand/1/logo-iphone-220x48.png",
  },
  {
    id: 9,
    title: "Samsung",
    link: "//cdn.tgdd.vn/Brand/1/samsungnew-220x48-1.png",
  },
  {
    id: 10,
    title: "Oppo",
    link: "//cdn.tgdd.vn/Brand/1/OPPO42-b_5.jpg",
  },
  {
    id: 11,
    title: "Xiaomi",
    link: "//cdn.tgdd.vn/Brand/1/logo-xiaomi-220x48-5.png",
  },
  {
    id: 12,
    title: "Vivo",
    link: "//cdn.tgdd.vn/Brand/1/vivo-logo-220-220x48-3.png",
  },
  {
    id: 13,
    title: "Realme",
    link: "//cdn.tgdd.vn/Brand/1/Realme42-b_37.png",
  },
  {
    id: 14,
    title: "Nokia",
    link: "//cdn.tgdd.vn/Brand/1/Nokia42-b_21.jpg",
  },
  {
    id: 15,
    title: "Mobell",
    link: "//cdn.tgdd.vn/Brand/1/Mobell42-b_19.jpg",
  },
  {
    id: 16,
    title: "itel",
    link: "//cdn.tgdd.vn/Brand/1/Itel42-b_54.jpg",
  },
  {
    id: 17,
    title: "Masstel",
    link: "//cdn.tgdd.vn/Brand/1/Masstel42-b_0.png",
  },
];
const data: DataPropsPhone[] = [
  {
    id: 0,
    title: "Hãng",
    detail: dataBrand,
  },
  {
    id: 1,
    title: "Giá",
    detail: [
      "Dưới 2 triệu",
      "Từ 2-4 triệu",
      "Từ 4-7 triệu",
      "Từ 7-13 triệu",
      "Từ 13-20 triệu",
      "Trên 20 triệu",
    ],
  },
  {
    id: 2,
    title: "Loại điện thoại",
    detail: ["Android", "Iphone(IOS)", "Điện thoại phổ thông"],
  },
  {
    id: 3,
    title: "Nhu cầu",
    detail: [
      "Chơi game/Cấu hình cao",
      "Chụp ảnh, quay phim",
      "Mỏng nhẹ",
      "Nhỏ gọn dễ cầm",
    ],
  },
  {
    id: 4,
    title: "RAM",
    detail: ["2 GB", "3 GB", "4 GB", "6 GB", "8 GB", "12 GB"],
  },
  {
    id: 5,
    title: "ROM",
    detail: ["32 GB", "64 GB", "128 GB", "256 GB", "512 GB"],
  },
  {
    id: 6,
    title: "Pin&Sạc",
    detail: [
      "Pin khủng 5000 mAh",
      "Sạc nhanh(từ 18W)",
      "Sạc siêu nhanh(từ 33W)",
      "Sạc không dây",
    ],
  },
  {
    id: 7,
    title: "Tính năng đặc biệt",
    detail: [
      "Kháng nước, bụi",
      "Hỗ trợ 5G",
      "Bảo mật khuôn mặt 3D",
      "Chống rung quang học(OIS)",
    ],
  },
];

interface Props {
  handle: (boolean: boolean) => void;
}

const FilterPhone = ({ handle }: Props) => {
  return (
    <div className="text-textWhiteMain max-w-[1200px] m-auto">
      <Filter handle={handle} data={data} />
    </div>
  );
};

export default FilterPhone;
