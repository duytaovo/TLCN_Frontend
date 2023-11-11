import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  formatCurrency,
  formatNumberToSocialStyle,
  getIdFromNameId,
  rateSale,
} from "src/utils/utils";
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

type SmartphoneTranslationKeys =
  | "smartphone.monitor"
  | "smartphone.operatingSystem"
  | "smartphone.rearCamera"
  | "smartphone.frontCamera"
  | "smartphone.chip"
  | "smartphone.sim"
  | "smartphone.battery"
  | "smartphone.charging"
  | "smartphone.networkSupport";

export default function SmartPhoneDetail() {
  const { t } = useTranslation(["product"]);
  const [buyCount, setBuyCount] = useState(1);
  const { productSlug } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [productData, setProductData] = useState<any>();
  const pathParts = location.pathname.split("/");
  const _id = getIdFromNameId(productSlug as string);
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5]);
  const [activeImage, setActiveImage] = useState("");
  const imageRef = useRef<HTMLImageElement>(null);
  const [productDataPrivateArray, setProductDataPrivateArray] =
    useState<string[]>();
  const [price, setPrice] = useState(
    productData?.productInfo?.lstProductTypeAndPrice[0].salePrice
  );
  const [salePrice, setSalePrice] = useState(
    productData?.productInfo?.lstProductTypeAndPrice[0].price
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
      console.log(productData);
      if (productData) {
        const { productInfo, id, ...productDetailsWithoutInfo } = productData;
        const productDetailsArray: string[] = Object.keys(
          productDetailsWithoutInfo
        );
        setProductDataPrivateArray(productDetailsArray);
      }
    };
    getData();
  }, [_id, pathParts[1], dispatch, activeImage]);

  useEffect(() => {
    setPrice(productData?.productInfo?.lstProductTypeAndPrice[0]?.price);
    setSalePrice(
      productData?.productInfo?.lstProductTypeAndPrice[0]?.salePrice
    );
  }, [productData]);
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

  const onClickChangeColor = (ram: string, rom: string, color: string) => {
    if (
      ram === productData?.productInfo?.lstProductTypeAndPrice[0]?.ram &&
      rom ===
        productData?.productInfo?.lstProductTypeAndPrice[0]?.storageCapacity &&
      color === productData?.productInfo?.lstProductTypeAndPrice[0]?.color
    ) {
      setPrice(productData?.productInfo?.lstProductTypeAndPrice[0]?.price);
      setSalePrice(
        productData?.productInfo?.lstProductTypeAndPrice[0]?.salePrice
      );
    } else {
      setPrice(productData?.productInfo?.lstProductTypeAndPrice[1]?.price);
      setSalePrice(
        productData?.productInfo?.lstProductTypeAndPrice[1]?.salePrice
      );
    }
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
    const res = await dispatch(addItem(body));
    // await dispatch(getCartPurchases()).then(unwrapResult);
    toast.success("Thêm sản phẩm thành công", {
      // position: "top-center",
      autoClose: 4000,
    });
  };

  const buyNow = async () => {
    const body = {
      id: productData.id,
      product_id: productData.productInfo.productId,
      quantity: buyCount,
    };
    const res = await dispatch(addItem(body));
    const purchase = res.payload;
    navigate(path.cartNew, {
      state: {
        purchaseId: purchase.id,
      },
    });
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
              maxInputLength: 50000,
            },
          })}
        />
      </Helmet>
      <div className="content wrapper px-20 py-5 rounded-md">
        <div className="bg-white p-4 shadow rounded-md text-black">
          <div className="grid grid-cols-12 gap-9">
            <div className="col-span-5">
              <div
                className="relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow"
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={productData?.productInfo?.name}
                  className="absolute left-0 top-0 h-full w-full bg-white object-cover"
                  ref={imageRef}
                />
              </div>
              <div className="relative mt-4 grid grid-cols-5 gap-1">
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
                        <div className="absolute inset-0 border-2 border-orange" />
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
            <div className="col-span-7">
              <h1 className="text-4xl font-medium uppercase">
                {productData?.productInfo?.name}
              </h1>
              <div className="mt-8 flex items-center">
                <div className="flex items-center">
                  <span className="mr-1 border-b border-b-orange text-orange">
                    {productData?.productInfo.star}
                  </span>
                  <Rate
                    allowHalf
                    defaultValue={Number(productData?.productInfo.star) || 4.5}
                    disabled
                  />
                  ;
                </div>
                <div className="mx-4 h-4 w-[1px] bg-gray-300"></div>
                <div className="text-black">
                  <span>
                    {formatNumberToSocialStyle(
                      Number(productData?.productInfo.totalReview) || 1520
                    )}
                  </span>
                  <span className="ml-1 text-gray-500">Đã xem</span>
                </div>
              </div>
              <div className="mt-8 flex items-center bg-gray-50 px-5 py-4">
                <div className="text-gray-500 line-through">
                  ₫{formatCurrency(salePrice)}
                </div>
                <div className="ml-3 text-4xl font-medium text-mainColor">
                  ₫{}
                  {formatCurrency(price)}
                </div>
                <div className="ml-4 rounded-sm bg-orange-300 px-1 py-[2px] text-lg font-semibold uppercase text-black">
                  {rateSale(
                    productData?.productInfo?.lstProductTypeAndPrice[0]
                      .salePrice,
                    productData?.productInfo?.lstProductTypeAndPrice[0].price
                  )}{" "}
                  giảm
                </div>
              </div>
              <div className="mt-8 flex items-center">
                <div className="capitalize text-gray-500">Số lượng</div>
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
              <div className="mt-8 flex items-center text-black">
                <button
                  onClick={addToCart}
                  className="flex h-12 items-center justify-center rounded-sm border border-orange bg-mainColor/50 px-5 capitalize text-orange shadow-sm hover:bg-orange/5"
                >
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={buyNow}
                  className="fkex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm  px-5 capitalize text-black shadow-sm outline-none bg-yellow-400"
                >
                  Mua ngay
                </button>
              </div>
              <div className="space-x-3 mt-4 flex justify-start align-baseline">
                <Button
                  className="w-fit "
                  onClick={() =>
                    onClickChangeColor(
                      productData?.productInfo?.lstProductTypeAndPrice[0]?.ram,
                      productData?.productInfo?.lstProductTypeAndPrice[0]
                        ?.storageCapacity,
                      productData?.productInfo?.lstProductTypeAndPrice[0]?.color
                    )
                  }
                  type="default"
                  color="red"
                >
                  {productData?.productInfo?.lstProductTypeAndPrice[0]?.color}
                </Button>
                {productData?.productInfo?.lstProductTypeAndPrice[1]?.color && (
                  <Button
                    className="w-fit bg-black/30"
                    onClick={() =>
                      onClickChangeColor(
                        productData?.productInfo?.lstProductTypeAndPrice[1]
                          ?.ram,
                        productData?.productInfo?.lstProductTypeAndPrice[1]
                          ?.storageCapacity,
                        productData?.productInfo?.lstProductTypeAndPrice[1]
                          ?.color
                      )
                    }
                    type="dashed"
                    color="red"
                  >
                    {productData?.productInfo?.lstProductTypeAndPrice[1]?.color}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <Button type="link" onClick={showModal} className="bg-gray-300 mt-5">
          Xem thông số kỹ thuật
        </Button>
        <Modal
          title="Thông số kỹ thuật"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
        >
          <div className="block space-y-2">
            {productDataPrivateArray?.map((item: string, index: number) => {
              const translationKey =
                `${productData.productInfo.slug}.${item}` as SmartphoneTranslationKeys;

              return (
                <div key={index}>
                  <div className="flex justify-start align-baseline space-x-4">
                    <h4 className="font-bold">{t(translationKey)}</h4>
                    <h5>{productData[item]}</h5>
                  </div>
                </div>
              );
            })}
            {/* <div className="flex justify-start align-baseline space-x-4">
              <h4 className="font-bold">Hệ điều hành :</h4>
              <h5>{productData.operatingSystem}</h5>
            </div>
            <div className="flex justify-start align-baseline space-x-4">
              <h4 className="font-bold">Camera chính :</h4>
              <h5>{productData.rearCamera}</h5>
            </div>
            <div className="flex justify-start align-baseline space-x-4">
              <h4 className="font-bold">Camera trước :</h4>
              <h5>{productData.frontCamera}</h5>
            </div>
            <div className="flex justify-start align-baseline space-x-4">
              <h4 className="font-bold">Chip :</h4>
              <h5>{productData.chip}</h5>
            </div>
            <div className="flex justify-start align-baseline space-x-4">
              <h4 className="font-bold">Sim :</h4>
              <h5>{productData.sim}</h5>
            </div>
            <div className="flex justify-start align-baseline space-x-4">
              <h4 className="font-bold">Pin :</h4>
              <h5>{productData.monitor}</h5>
            </div>
            <div className="flex justify-start align-baseline space-x-4">
              <h4 className="font-bold">Sạc nhanh:</h4>
              <h5>{productData.charging}</h5>
            </div>
            <div className="flex justify-start align-baseline space-x-4">
              <h4 className="font-bold">Hỗ trợ mạng:</h4>
              <h5>{productData.networkSupport}</h5>
            </div>
            <div className="flex justify-start align-baseline space-x-4">
              <h4 className="font-bold">Phụ kiện:</h4>
              <h5>{productData.productInfo.accessories}</h5>
            </div>
            <div className="flex justify-start align-baseline space-x-4">
              <h4 className="font-bold">Năm ra mắt:</h4>
              <h5>{productData.productInfo.launchTime}</h5>
            </div>
            <div className="flex justify-start align-baseline space-x-4">
              <h4 className="font-bold">Thiết kế:</h4>
              <h5>{productData.productInfo.design}</h5>
            </div>
            <div className="flex justify-start align-baseline space-x-4">
              <h4 className="font-bold">Khối lượng:</h4>
              <h5>{productData.productInfo.mass}</h5>
            </div>
            <div className="flex justify-start align-baseline space-x-4">
              <h4 className="font-bold">Ram:</h4>
              <h5>{productData.productInfo.lstProductTypeAndPrice[0].ram}</h5>
            </div>
            <div className="flex justify-start align-baseline space-x-4">
              <h4 className="font-bold">Bộ nhớ trong:</h4>
              <h5>
                {
                  productData.productInfo.lstProductTypeAndPrice[0]
                    .storageCapacity
                }
              </h5>
            </div> */}
          </div>
        </Modal>
      </div>
      <div className="mt-8">
        <div className="px-20 py-10">
          <div className=" bg-white p-4 shadow">
            <div className="rounded bg-gray-50 p-4 text-4xl capitalize text-slate-700">
              Mô tả sản phẩm
            </div>
            <div className="mx-4 mb-4 mt-12 text-2xl leading-loose text-black">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    productData?.productInfo?.description
                  ),
                }}
              />
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
