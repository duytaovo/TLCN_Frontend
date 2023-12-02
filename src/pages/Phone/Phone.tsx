import BigBannerPhone from "./BigBannerPhone";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import FilterPhone from "./FilterPhone";
import QuickLinkPhone from "./QuickLinkPhone";
import ListPhone from "./ListPhone";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { getSmartPhones } from "src/store/product/smartPhoneSlice";
import { getBrand } from "src/store/brand/brandsSlice";
import { getCharacteristic } from "src/store/characteristic/characteristicSlice";
import { getFilter, getSort } from "src/store/product/filterSlice";

const Phone = () => {
  const [choose, setChoose] = useState<any>();
  const [chooseCharac, setChooseCharac] = useState<any>();
  const [chooseBox, setChooseBox] = useState<any>();
  const [isOpen, setisOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const filter = useAppSelector((state) => state.smartphone.filter.data); // Lấy tất cả
  const { sort } = useAppSelector<any>((state) => state.filter);
  const { brand } = useAppSelector<any>((state) => state.brand);
  const { characteristic } = useAppSelector<any>(
    (state) => state.characteristic,
  );
  const [dataFilterLocal, setDataFilterLocal] = useState<any>();
  // Hàm tách mảng
  useEffect(() => {
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
    setDataFilterLocal(separatedArrays);
  }, [filter]);

  // Kết quả
  if (dataFilterLocal) {
    var {
      Hãng,
      "Loại điện thoại": LoaiDienThoai,
      "Nhu cầu": NhuCau,
      RAM,
      ROM,
      "Pin&Sạc": PinSạc,
      "Tính năng đặc biệt": TinhNangDacBiet,
      Giá: Gia,
      "Màn hình": ManHinh,
    } = dataFilterLocal;
  }

  const getMinMaxPrices = () => {
    if (Gia === undefined || Gia.length === 0) {
      return null;
    }
    const numericRanges = Gia.map((priceString: any) => {
      const matches = priceString.match(/(\d+) - (\d+)/);
      let startPrice;
      let endPrice;
      if (
        priceString.search("Dưới") != -1 &&
        priceString.search("Trên") != -1
      ) {
        startPrice = 0;
        endPrice = 100;

        if (!isNaN(startPrice) && !isNaN(endPrice)) {
          return { startPrice, endPrice };
        }
      } else if (priceString.search("Dưới") != -1) {
        startPrice = 0;
        endPrice = 2;

        if (matches && matches.length === 3) {
          // startPrice = parseInt(matches[1], 10);
          endPrice = parseInt(matches[2], 10);
        }

        if (!isNaN(startPrice) && !isNaN(endPrice)) {
          return { startPrice, endPrice };
        }
      } else if (priceString.search("Trên") != -1) {
        startPrice = 20;
        endPrice = 100;
        if (matches && matches.length === 3) {
          startPrice = parseInt(matches[1], 10);
        }
        if (priceString.search("Dưới") != -1) {
          startPrice = 0;
        }
        if (!isNaN(startPrice) && !isNaN(endPrice)) {
          return { startPrice, endPrice };
        }
      } else if (matches && matches.length === 3) {
        startPrice = parseInt(matches[1], 10);
        endPrice = parseInt(matches[2], 10);

        if (!isNaN(startPrice) && !isNaN(endPrice)) {
          return { startPrice, endPrice };
        }
      }

      return null;
    });

    const validRanges = numericRanges.filter(
      (range: any) => range !== null,
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
      brandId: Hãng ? Hãng : null,
      characteristicId: NhuCau ? NhuCau : null,
      priceFrom: minMaxPrices?.minPrice
        ? minMaxPrices?.minPrice
        : minMaxPrices?.minPrice == 0
        ? 0
        : null,
      priceTo: minMaxPrices?.maxPrice ? minMaxPrices?.maxPrice : null,
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
      }),
    );
  }, [
    currentPage,
    Hãng,
    NhuCau,
    minMaxPrices?.maxPrice,
    minMaxPrices?.minPrice,
    TinhNangDacBiet,
    LoaiDienThoai,
    RAM,
    ROM,
    PinSạc,
    ManHinh,
    chooseBox,
  ]);

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
      }),
    );
  }, [currentPage, choose, chooseCharac]);
  useEffect(() => {
    dispatch(getSort(""));
    dispatch(getFilter({ slug: "smartphone" }));
    dispatch(getBrand({ slug: "smartphone" }));
    dispatch(getCharacteristic({ categorySlug: "smartphone" }));
  }, []);
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
      <FilterPhone
        handle={handle}
        brand={brand}
        characteristic={characteristic}
      />
      <QuickLinkPhone
        handleSetChoose={handleSetChoose}
        choose={choose}
        handleSetChooseCharac={handleSetChooseCharac}
        chooseCharac={chooseCharac}
        brand={brand}
        characteristic={characteristic}
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

