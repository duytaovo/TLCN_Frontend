import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  formatCurrency,
  formatNumberToSocialStyle,
  getIdFromNameId,
  rateSale,
} from "src/utils/utils";
import styles from "./productdetail.module.scss";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { convert } from "html-to-text";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Modal, Rate } from "antd";
import DOMPurify from "dompurify";
import QuantityController from "../CartNew/QuantityController";
import {
  addItem,
  getProductByProductSlugId,
} from "src/store/shopping-cart/cartItemsSlide";
import path from "src/constants/path";
import { getCommentByProductId } from "src/store/comment/commentsSlice";
import RatingFeedback from "./Rating";
import Tag from "./Tag";
import Head from "./Head";
import clsx from "clsx";
import Policy from "./Policy";
import DiscountBox from "./DiscountBox";
import PayInfo from "./PayInfo";
import { getDetailBrand } from "src/store/brand/brandsSlice";
import BasicTabs from "./Tabs";

type SmartphoneTranslationKeys =
  | "smartphone.monitor"
  | "smartphone.operatingSystem"
  | "smartphone.rearCamera"
  | "smartphone.frontCamera"
  | "smartphone.chip"
  | "smartphone.sim"
  | "smartphone.battery"
  | "smartphone.charging"
  | "smartphone.networkSupport"
  | "smartphone.dimension"
  | "smartphone.mass"
  | "smartphone.launchTime"
  | "smartphone.accessories";

type LaptopTranslationKeys =
  | "laptop.monitor"
  | "laptop.operatingSystem"
  | "laptop.gateway"
  | "laptop.frontCamera"
  | "laptop.special"
  | "laptop.processorName"
  | "laptop.romName"
  | "laptop.ramName"
  | "laptop.networkSupport"
  | "laptop.graphicsCardName";

export default function SmartPhoneDetail() {
  const { t } = useTranslation(["product"]);
  const [buyCount, setBuyCount] = useState(1);
  const { productSlug } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { brand } = useAppSelector<any>((state) => state.brand);
  const [productData, setProductData] = useState<any>();
  const pathParts = location.pathname.split("/");
  const _id = getIdFromNameId(productSlug as string);
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 6]);
  const [activeImage, setActiveImage] = useState("");
  const imageRef = useRef<HTMLImageElement>(null);
  const [productDataPrivateArray, setProductDataPrivateArray] =
    useState<string[]>();

  const [price, setPrice] = useState(
    productData?.productInfo?.lstProductTypeAndPrice[0].price
  );
  const [salePrice, setSalePrice] = useState(
    productData?.productInfo?.lstProductTypeAndPrice[0].salePrice
  );
  const currentImages = useMemo(
    () =>
      productData?.productInfo?.lstProductImageUrl
        ? productData?.productInfo?.lstProductImageUrl.slice(
            ...currentIndexImages
          )
        : [],
    [productData, currentIndexImages]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);

  const showModalDetail = () => {
    setIsModalOpenDetail(true);
  };

  const handleOkDetail = () => {
    setIsModalOpenDetail(false);
  };

  const handleCancelDetail = () => {
    setIsModalOpenDetail(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (
      productData &&
      productData?.productInfo?.lstProductImageUrl?.length > 0
    ) {
      setActiveImage(productData?.productInfo?.lstProductImageUrl[0]);
    }
  }, [productData]);
  useEffect(() => {
    const getData = async () => {
      const res = await dispatch(
        getProductByProductSlugId({ id: _id, slug: pathParts[1] })
      );
      unwrapResult(res);
      setProductData(res.payload.data.data);
      if (productData) {
        const {
          productInfo,
          id,
          processorId,
          ramId,
          romId,
          graphicsCardId,
          ...productDetailsWithoutInfo
        } = productData;
        const productDetailsArray: string[] = Object.keys(
          productDetailsWithoutInfo
        );
        setProductDataPrivateArray(productDetailsArray);
        // await dispatch(getCommentByProductId(productInfo?.productId));
        // await dispatch(getDetailBrand(productInfo?.brandId));
      }
    };
    getData();
  }, [_id, pathParts[1], dispatch]);

  useEffect(() => {
    const getData = async () => {
      if (productData) {
        const {
          productInfo,
          id,
          processorId,
          ramId,
          romId,
          graphicsCardId,
          ...productDetailsWithoutInfo
        } = productData;
        const productDetailsArray: string[] = Object.keys(
          productDetailsWithoutInfo
        );
        setProductDataPrivateArray(productDetailsArray);
        await dispatch(getCommentByProductId(productInfo?.productId));
        await dispatch(getDetailBrand(productInfo?.brandId));
      }
    };
    getData();
  }, [activeImage, productData]);

  const next = () => {
    if (
      currentIndexImages[1] < productData?.productInfo.lstProductImageUrl.length
    ) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1]);
    }
  };

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1]);
    }
  };

  const chooseActive = (img: string) => {
    setActiveImage(img);
  };

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const image = imageRef.current as HTMLImageElement;
    const { naturalHeight, naturalWidth } = image;

    const offsetX = event.pageX - (rect.x + window.scrollX);
    const offsetY = event.pageY - (rect.y + window.scrollY);

    const top = offsetY * (1 - naturalHeight / rect.height);
    const left = offsetX * (1 - naturalWidth / rect.width);
    image.style.width = naturalWidth + "px";
    image.style.height = naturalHeight + "px";
    image.style.maxWidth = "unset";
    image.style.top = top + "px";
    image.style.left = left + "px";
  };

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute("style");
  };
  const handleBuyCount = (value: number) => {
    setBuyCount(value);
  };

  const addToCart = async () => {
    const body = {
      id: productData.id,
      product_id: productData.productInfo?.productId,
      slug: productData.productInfo?.slug,
      quantity: buyCount,
      name: productData.productInfo?.name,
      price: price,
      salePrice: salePrice,
      typeId: productData?.productInfo?.lstProductTypeAndPrice[0].typeId,
      depotId: productData.productInfo?.lstProductTypeAndPrice[0].depotId,
      quantityInDB:
        productData?.productInfo?.lstProductTypeAndPrice[0]?.quantity,
      image: productData.productInfo.lstProductImageUrl[0],
    };
    await dispatch(addItem(body));

    toast.success("Thêm sản phẩm thành công", {
      // position: "top-center",
      autoClose: 4000,
    });
  };

  const buyNow = async () => {
    const body = {
      id: productData.id,
      product_id: productData.productInfo?.productId,
      slug: productData.productInfo?.slug,
      quantity: buyCount,
      name: productData.productInfo?.name,
      price: price,
      salePrice: salePrice,
      typeId: productData?.productInfo?.lstProductTypeAndPrice[0].typeId,
      depotId: productData.productInfo?.lstProductTypeAndPrice[0].depotId,
      quantityInDB:
        productData?.productInfo?.lstProductTypeAndPrice[0]?.quantity,
      image: productData.productInfo.lstProductImageUrl[0],
    };
    const res = await dispatch(addItem(body));
    const purchase = res.payload;
    navigate(path.cartNew, {
      state: {
        purchaseId: purchase.id,
      },
    });
  };
  const [showFullDescription, setShowFullDescription] = useState(false);
  const shortDescriptionLength = 350;
  const displayDescription = showFullDescription
    ? productData?.productInfo?.description
    : productData?.productInfo?.description.slice(0, shortDescriptionLength);

  const getData = ({ price, salePrice }: any) => {
    setPrice(price);
    setSalePrice(salePrice);
  };
  if (!productData) return null;
  return (
    <div className="bg-gray-200 py-6">
      <Helmet>
        <title>{productData?.productInfo?.name}</title>
        <meta
          name="description"
          content={convert(productData?.productInfo?.description, {
            limits: {
              maxInputLength: 3000,
            },
          })}
        />
      </Helmet>
      <div className="content wrapper px-20 py-5 rounded-md">
        <div className="bg-white p-4 shadow rounded-md text-black">
          <div className="grid grid-cols-12 gap-9">
            <div className="col-span-7">
              <div
                className="relative w-full  overflow-hidden pt-[84%] shadow"
                // onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={productData?.productInfo?.name}
                  className="absolute left-0 top-0 h-full w-full bg-white object-cover"
                  ref={imageRef}
                />
              </div>
              <div className="relative mt-4 grid grid-cols-6 gap-1">
                <button
                  className="absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                  onClick={prev}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                {currentImages?.map((img: any) => {
                  const isActive = img === activeImage;
                  return (
                    <div
                      className="relative w-full pt-[100%]"
                      key={img}
                      onMouseEnter={() => chooseActive(img)}
                    >
                      <img
                        src={img}
                        alt={productData?.productInfo?.name}
                        className="absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 border-2 border-red-600" />
                      )}
                    </div>
                  );
                })}
                <button
                  className="absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                  onClick={next}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-span-5">
              <h1 className="text-4xl font-medium uppercase">
                {productData?.productInfo?.name}
              </h1>
              <div className="mt-8 flex items-center">
                <div className="flex items-center">
                  <span className="mr-1 ">
                    <Rate
                      allowHalf
                      defaultValue={
                        Number(productData?.productInfo.star) || 4.5
                      }
                      disabled
                      className="text-2xl"
                    />
                  </span>
                </div>
                <div className="mx-4 h-4 w-[1px] bg-gray-300"></div>
                <div className="text-black">
                  <span>
                    {formatNumberToSocialStyle(
                      Number(productData?.productInfo.totalReview)
                    )}
                  </span>
                  <span className="ml-1 text-gray-500"> Đã xem</span>
                </div>
              </div>
              <Link to="/" className="text-blue-500">
                Xem Điện thoại {""} cũ giá từ 24.660.000₫ Tiết kiệm đến 27%
              </Link>
              {/* Giá sản phẩm và lựa chọn */}
              <div className="space-x-3 mt-4 flex justify-start align-baseline">
                <Tag productData={productData} onClick={getData} />
              </div>
              <div className="space-y-3 mt-5">{/* <DiscountBox /> */}</div>
              <PayInfo
                initProductDetail={productData}
                handleClickPay={buyNow}
              />
              <div className="my-6 flex items-center">
                <div className="capitalize text-gray-600">Chọn số lượng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={
                    productData?.productInfo?.lstProductTypeAndPrice[0]
                      ?.quantity
                  }
                />
                <div className="ml-6 text-xl text-gray-500">
                  {
                    productData?.productInfo?.lstProductTypeAndPrice[0]
                      ?.quantity
                  }{" "}
                  sản phẩm có sẵn
                </div>
              </div>

              <div className="mt-4 flex flex-col w-full items-center text-black/60">
                <button
                  onClick={addToCart}
                  className="flex h-20 items-center w-full justify-center rounded-sm border bg-mainColor px-5 capitalize text-white shadow-sm hover:bg-orange-500"
                >
                  <AddShoppingCartIcon
                    className="text-white mr-2"
                    fontSize="large"
                  />
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={buyNow}
                  className="fkex mt-4 h-20 min-w-[5rem] w-full items-center justify-center rounded-sm  px-5 capitalize text-white  shadow-sm outline-none bg-buyColor"
                >
                  <ShoppingCartCheckoutIcon
                    className="text-white mr-2"
                    fontSize="large"
                  />
                  Mua ngay
                </button>
              </div>
              {/* <Policy /> */}
            </div>
          </div>
        </div>
        <div className="max-w-8xl m-auto">
          <div className="flex gap-8">
            <div className={clsx(styles.left, "w-3/5")}>
              <div className="mt-8">
                <div className=" py-10">
                  <div className=" bg-white p-4 shadow">
                    <div className="rounded bg-gray-50 p-4 text-4xl capitalize text-slate-700 font-bold">
                      Mô tả sản phẩm
                    </div>
                    <div className="mx-4 mb-4 mt-12 text-2xl leading-loose text-black flex justify-center">
                      <div
                        className="flex justify-center"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(displayDescription),
                        }}
                      />
                    </div>
                    <div className="text-center">
                      {!showFullDescription &&
                        productData?.productInfo?.description.length >
                          shortDescriptionLength && (
                          <Button
                            type="default"
                            className="border-[1.5px] text-blue-400 border-blue-400 w-1/2 h-16 mt-3"
                            onClick={showModalDetail}
                          >
                            {" "}
                            Xem thêm
                          </Button>
                        )}
                      <Modal
                        open={isModalOpenDetail}
                        onOk={handleOkDetail}
                        onCancel={handleCancelDetail}
                        centered
                        className="p-5 h-screen flex justify-center items-center"
                        width={1200}
                      >
                        <BasicTabs
                          tabDefault={"1"}
                          children1={
                            <div
                              className="flex justify-center flex-col"
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  productData.productInfo.description
                                ),
                              }}
                            />
                          }
                          children2={
                            <div className="block space-y-2">
                              <p className="font-bold text-3xl text-gray-800 mb-4">
                                Cấu hình {productData?.productInfo?.name}
                              </p>
                              <table className="w-full">
                                <tbody className="space-y-4 p-5">
                                  {productDataPrivateArray ? (
                                    productDataPrivateArray?.map(
                                      (item: string, index: number) => {
                                        const translationKey =
                                          `${productData.productInfo.slug}.${item}` as SmartphoneTranslationKeys &
                                            LaptopTranslationKeys;
                                        if (index != 0) {
                                          return (
                                            <tr
                                              className={`
                                      p-6  
                                        ${index % 2 === 0 && "bg-gray-100"}
                                          
                                        `}
                                              key={index}
                                            >
                                              <td
                                                colSpan={6}
                                                className="my-4 p-6"
                                              >
                                                {t(translationKey)}
                                              </td>
                                              <td colSpan={4}>
                                                {productData[item]}
                                              </td>
                                            </tr>
                                          );
                                        }
                                      }
                                    )
                                  ) : (
                                    <tr></tr>
                                  )}
                                  <tr className={" p-6 "}>
                                    <td colSpan={6} className="my-4 p-6">
                                      Hãng sản xuất
                                    </td>
                                    <td colSpan={4}>{brand?.name}</td>
                                  </tr>
                                  <tr className={"bg-gray-100  p-6 "}>
                                    <td colSpan={6} className="my-4 p-6">
                                      Năm ra mắt
                                    </td>
                                    <td colSpan={4}>
                                      {productData?.productInfo?.launchTime}
                                    </td>
                                  </tr>
                                  <tr className={" p-6 "}>
                                    <td colSpan={6} className="my-4 p-6">
                                      Phụ kiện
                                    </td>
                                    <td colSpan={4}>
                                      {productData?.productInfo?.accessories}
                                    </td>
                                  </tr>
                                  <tr className={"bg-gray-100  p-6 "}>
                                    <td colSpan={6} className="my-4 p-6">
                                      Thiết kế
                                    </td>
                                    <td colSpan={4}>
                                      {productData?.productInfo?.design}
                                    </td>
                                  </tr>
                                  <tr className={" p-6 "}>
                                    <td colSpan={4} className="my-4 p-6">
                                      Kích thước
                                    </td>
                                    <td colSpan={6}>
                                      {productData?.productInfo?.dimension}
                                    </td>
                                  </tr>
                                  <tr className={"bg-gray-100  p-6"}>
                                    <td colSpan={4} className="my-4 p-6">
                                      Khối lượng
                                    </td>
                                    <td colSpan={6}>
                                      {productData?.productInfo?.mass}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          }
                        ></BasicTabs>
                      </Modal>
                    </div>
                    <div className="px-10 py-10 ">
                      <div className="">
                        <div className="uppercase text-gray-700 font-bold text-4xl mb-3 ">
                          Đánh giá {productData?.productInfo?.name}
                        </div>
                        <RatingFeedback />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={clsx(styles.right, "w-2/5  py-16 ")}>
              <div className="block space-y-2">
                <p className="font-bold text-3xl text-gray-800 mb-4">
                  Cấu hình {productData?.productInfo?.name}
                </p>
                <table className="w-full bg-white/80 border border-">
                  <tbody className="space-y-4 bg-white/80">
                    {productDataPrivateArray ? (
                      productDataPrivateArray?.map(
                        (item: string, index: number) => {
                          const translationKey =
                            `${productData.productInfo.slug}.${item}` as SmartphoneTranslationKeys &
                              LaptopTranslationKeys;
                          if (index != 0) {
                            return (
                              <tr
                                className={` ${index % 2 === 0 && "bg-gray-200"}
                                `}
                                key={index}
                              >
                                <td colSpan={4} className="my-4">
                                  {t(translationKey)}
                                </td>
                                <td colSpan={6}>{productData[item]}</td>
                              </tr>
                            );
                          }
                        }
                      )
                    ) : (
                      <tr></tr>
                    )}
                    <tr className={""}>
                      <td colSpan={4}>Hãng sản xuất</td>
                      <td colSpan={6}>{brand?.name}</td>
                    </tr>
                    <tr className={"bg-gray-200"}>
                      <td colSpan={4}>Năm ra mắt</td>
                      <td colSpan={6}>
                        {productData?.productInfo?.launchTime}
                      </td>
                    </tr>
                    <tr className={""}>
                      <td colSpan={4}>Phụ kiện</td>
                      <td colSpan={6}>
                        {productData?.productInfo?.accessories}
                      </td>
                    </tr>
                    <tr className={"bg-gray-200"}>
                      <td colSpan={4}>Thiết kế</td>
                      <td colSpan={6}>{productData?.productInfo?.design}</td>
                    </tr>
                    <tr className={""}>
                      <td colSpan={4}>Kích thước</td>
                      <td colSpan={6}>{productData?.productInfo?.dimension}</td>
                    </tr>
                    <tr className={"bg-gray-200 border-b-[1px] border-white"}>
                      <td colSpan={4}>Khối lượng</td>
                      <td colSpan={6}>{productData?.productInfo?.mass}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Button
                type="default"
                className="border-[1.5px] text-blue-400 border-blue-400 w-full h-16 mt-3"
                onClick={showModal}
              >
                {" "}
                Xem thông số kỹ thuật
              </Button>

              <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                className="p-5 h-screen flex justify-center items-center"
                width={1200}
              >
                <BasicTabs
                  tabDefault={"2"}
                  children1={
                    <div
                      className="flex justify-center flex-col"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          productData.productInfo.description
                        ),
                      }}
                    />
                  }
                  children2={
                    <div className="block space-y-2">
                      <p className="font-bold text-3xl text-gray-800 mb-4">
                        Cấu hình {productData?.productInfo?.name}
                      </p>
                      <table className="w-full">
                        <tbody className="space-y-4 p-5">
                          {productDataPrivateArray ? (
                            productDataPrivateArray?.map(
                              (item: string, index: number) => {
                                const translationKey =
                                  `${productData.productInfo.slug}.${item}` as SmartphoneTranslationKeys &
                                    LaptopTranslationKeys;
                                if (index != 0) {
                                  return (
                                    <tr
                                      className={`
                                      p-6  
                                        ${index % 2 === 0 && "bg-gray-100"}
                                          
                                        `}
                                      key={index}
                                    >
                                      <td colSpan={6} className="my-4 p-6">
                                        {t(translationKey)}
                                      </td>
                                      <td colSpan={4}>{productData[item]}</td>
                                    </tr>
                                  );
                                }
                              }
                            )
                          ) : (
                            <tr></tr>
                          )}
                          <tr className={" p-6 "}>
                            <td colSpan={6} className="my-4 p-6">
                              Hãng sản xuất
                            </td>
                            <td colSpan={4}>{brand?.name}</td>
                          </tr>
                          <tr className={"bg-gray-100  p-6 "}>
                            <td colSpan={6} className="my-4 p-6">
                              Năm ra mắt
                            </td>
                            <td colSpan={4}>
                              {productData?.productInfo?.launchTime}
                            </td>
                          </tr>
                          <tr className={" p-6 "}>
                            <td colSpan={6} className="my-4 p-6">
                              Phụ kiện
                            </td>
                            <td colSpan={4}>
                              {productData?.productInfo?.accessories}
                            </td>
                          </tr>
                          <tr className={"bg-gray-100  p-6 "}>
                            <td colSpan={6} className="my-4 p-6">
                              Thiết kế
                            </td>
                            <td colSpan={4}>
                              {productData?.productInfo?.design}
                            </td>
                          </tr>
                          <tr className={" p-6 "}>
                            <td colSpan={4} className="my-4 p-6">
                              Kích thước
                            </td>
                            <td colSpan={6}>
                              {productData?.productInfo?.dimension}
                            </td>
                          </tr>
                          <tr className={"bg-gray-100  p-6"}>
                            <td colSpan={4} className="my-4 p-6">
                              Khối lượng
                            </td>
                            <td colSpan={6}>
                              {productData?.productInfo?.mass}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  }
                ></BasicTabs>
              </Modal>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-8">
        <div className="container">
          <div className="uppercase text-gray-400">CÓ THỂ BẠN CŨNG THÍCH</div>
          {productsData && (
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {productsData.data.data.products.map((product) => (
                <div className="col-span-1" key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}
