import React from "react";
import Helper from "./Helper";
import AboutUs from "./AboutUs";
import ContractTable from "./ContractTable";
const Main = () => {
    return (
        <>
            <div className="container">
                <ContractTable />
                <Helper />
                <AboutUs />
            </div>
        </>
    );
};

export default Main;
