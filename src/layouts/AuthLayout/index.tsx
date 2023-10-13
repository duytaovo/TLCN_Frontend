import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer/Footer";
import Header from "src/components/Header/Header";
import TransitionsModal from "src/components/Header/Modal";
import TopSlider from "src/components/TopSlider/TopSlider";
function AuthLayout({ children }: any) {
  return (
    <div className="bg  w-[100vw]">
      {/* <TopSlider /> */}
      {/* <Header /> */}
      <main role="main" className="wrapper h-full">
        <div className="content bg ">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default React.memo(AuthLayout);
