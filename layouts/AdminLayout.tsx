import { PropsWithChildren } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";


const AdminLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            {/* <NavBar /> */}
            <div className="g-sidenav-show  bg-gray-100">
                <SideBar />
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    {children}
                </main>
            </div>
        </>

    )
}


export default AdminLayout;