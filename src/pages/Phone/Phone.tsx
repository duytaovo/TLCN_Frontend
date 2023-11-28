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
  const [isOpen, setisOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại

  useEffect(() => {
    const body = {
      slug: "smartphone",
      brandId: choose?.id ? [choose?.id] : null,
      characteristicId: chooseCharac ? [chooseCharac] : null,
      // priceFrom: 0,
      // priceTo: 0,
      // specialFeatures: [""],
      // smartphoneType: [""],
      // ram: [""],
      // storageCapacity: [""],
      // charging: [""],
      // screen: [""],
    };
    dispatch(
      getSmartPhones({
        body: body,
        params: { pageNumber: currentPage, pageSize: 10 },
      })
    );
  }, [currentPage, choose, chooseCharac]);

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
        choose={choose}
        isOpen={isOpen}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};
export default Phone;
