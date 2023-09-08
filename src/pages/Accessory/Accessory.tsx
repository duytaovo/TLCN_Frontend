import AccessoryHotDeal from "./AccessoryHotDeal";
import BigBannerAccessory from "./BigBannerAccessory";
import GroupCategory from "./GroupCategory";
import QuickLinkAccessory from "./QuickLinkAccessory";
import AppleAccessory from "./AppleAccessory";
import Pin from "./Pin";
import Cable from "./Cable";
import HeadPhone from "./HeadPhone";
import LoudSpeaker from "./LoudSpeaker";
import SmartHome from "./SmartHome";
import Gaming from "./Gaming";
import MenuTopAccessory from "./MenuTopAccessory";
import { Helmet } from "react-helmet-async";
const Accessory = () => {
  return (
    <>
      <Helmet>
        <title>Trang phụ kiện </title>
        <meta name="description" content="Trang phụ kiện" />
      </Helmet>
      <BigBannerAccessory />
      <GroupCategory />
      <QuickLinkAccessory />
      <AccessoryHotDeal />
      <AppleAccessory />
      <Pin />
      <Cable />
      <HeadPhone />
      <LoudSpeaker />
      <SmartHome />
      <Gaming />
      <MenuTopAccessory />
    </>
  );
};
export default Accessory;
