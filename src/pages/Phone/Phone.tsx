import BigBannerPhone from "./BigBannerPhone";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import FilterPhone from "./FilterPhone";
import QuickLinkPhone from "./QuickLinkPhone";
import ListPhone from "./ListPhone";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { getSmartPhones } from "src/store/product/smartPhoneSlice";

const Phone = () => {
  const [choose, setChoose] = useState<any>();
  const [chooseCharac, setChooseCharac] = useState<any>();
  const [chooseBox, setChooseBox] = useState<any>();
  const [isOpen, setisOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const filter = useAppSelector((state) => state.smartphone.filter.data); // Lấy tất cả
  // Hàm tách mảng
  const separateArrays = (data: any) => {
    const result: any = {};

    data.forEach((item: any) => {
      const key = Object.keys(item)[0]; // Lấy tên thuộc tính (ví dụ: 'Hãng', 'Giá', ...)

      if (!result[key]) {
        result[key] = [];
      }

      result[key].push(item[key]);
    });

    return result;
  };

  // Gọi hàm tách mảng
  const separatedArrays = separateArrays(filter);

  // Kết quả
  const {
    Hãng,
    "Loại điện thoại": LoaiDienThoai,
    "Nhu cầu": NhuCau,
    RAM,
    ROM,
    "Pin&Sạc": PinSạc,
    "Tính năng đặc biệt": TinhNangDacBiet,
    Giá: Gia,
    "Màn hình": ManHinh,
  } = separatedArrays;
  console.log(NhuCau);
  const getMinMaxPrices = () => {
    if (Gia === undefined || Gia.length === 0) {
      return null;
    }

    const numericRanges = Gia.map((priceString: any) => {
      const matches = priceString.match(/(\d+)-(\d+)/);

      if (matches && matches.length === 3) {
        const startPrice = parseInt(matches[1], 10);
        const endPrice = parseInt(matches[2], 10);

        if (!isNaN(startPrice) && !isNaN(endPrice)) {
          return { startPrice, endPrice };
        }
      }

      return null;
    });

    const validRanges = numericRanges.filter(
      (range: any) => range !== null
    ) as {
      startPrice: number;
      endPrice: number;
    }[];

    if (validRanges.length === 0) {
      return null;
    }

    const minPrice = Math.min(...validRanges.map((range) => range.startPrice));
    const maxPrice = Math.max(...validRanges.map((range) => range.endPrice));

    return { minPrice: minPrice * 1000000, maxPrice: maxPrice * 1000000 };
  };

  const minMaxPrices = getMinMaxPrices();
  useEffect(() => {
    const body = {
      slug: "smartphone",
      brandId: choose?.id ? [choose?.id] : null,
      characteristicId: chooseCharac ? [chooseCharac] : null,
    };
    dispatch(
      getSmartPhones({
        body: body,
        params: { pageNumber: currentPage, pageSize: 10 },
      })
    );
  }, [currentPage, choose, chooseCharac]);

  useEffect(() => {
    const body = {
      slug: "smartphone",
      brandId: Hãng ? Hãng : null,
      characteristicId: NhuCau ? NhuCau : null,
      priceFrom: minMaxPrices?.minPrice ? Number(minMaxPrices?.minPrice) : null,
      priceTo: minMaxPrices?.maxPrice ? Number(minMaxPrices?.maxPrice) : null,
      specialFeatures: TinhNangDacBiet ? TinhNangDacBiet : [],
      smartphoneType: LoaiDienThoai ? LoaiDienThoai : [],
      ram: RAM ? RAM : [],
      storageCapacity: ROM ? ROM : [],
      charging: PinSạc ? PinSạc : [],
      screen: ManHinh ? ManHinh : [],
    };
    dispatch(
      getSmartPhones({
        body: body,
        params: { pageNumber: currentPage, pageSize: 10, sort: chooseBox },
      })
    );
  }, [filter, currentPage, separatedArrays]);

  const handle = (boolean: boolean) => {
    setisOpen(boolean);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSetChoose = (choose: any) => {
    setChoose(choose);
  };

  const handleSetChooseCharac = (choose: any) => {
    setChooseCharac(choose);
  };

  const handleSetChooseBox = (choose: any) => {
    setChooseBox(choose);
  };
  return (
    <div className="text-textWhiteMain">
      <Helmet>
        <title>Trang điện thoại </title>
        <meta name="description" content="Trang điện thoại" />
      </Helmet>
      <BigBannerPhone />
      <FilterPhone handle={handle} />
      <QuickLinkPhone
        handleSetChoose={handleSetChoose}
        handleSetChooseCharac={handleSetChooseCharac}
      />
      <ListPhone
        handleSetChooseBox={handleSetChooseBox}
        choose={choose}
        setChooseBox={setChooseBox}
        isOpen={isOpen}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};
export default Phone;
