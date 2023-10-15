import { Outlet } from "react-router-dom";
import UserSideNav from "../../components/UserSideNav";

export default function UserLayout() {
  return (
    <div className="bg-neutral-100 py-16 text-xl text-gray-600">
      <div className="container w-full">
        <div className=" grid-cols-1 gap-6 md:grid-cols-12 flex">
          <div className="md:col-span-3 lg:col-span-2 flex-[0.3]">
            <UserSideNav />
          </div>
          <div className="md:col-span-9 lg:col-span-10 flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
