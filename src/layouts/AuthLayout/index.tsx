import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer/Footer";
import Header from "src/components/Header/Header";
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
