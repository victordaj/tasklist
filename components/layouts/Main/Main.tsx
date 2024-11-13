import NavBar from "@/components/shared/NavBar/NavBar";
import Sidebar from "@/components/shared/SideBar/SideBar";
import { FunctionComponent, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <Sidebar />
      <main className="p-4 sm:ml-64 pt-20">
        <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
