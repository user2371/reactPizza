import React from "react"
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = ({ searchStr, setSearchStr }) => {
    return (
        <>
            <div className="wrapper">
                <Header searchStr={searchStr} setSearchStr={setSearchStr} />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </>
    )
};

export default MainLayout;
