import { Sidebar } from "flowbite-react";
import { HiChartPie, HiInbox, HiUser, HiViewBoards } from "react-icons/hi";

import React, { useState } from "react";

import Flight from "../Components/Flight";
import Hotel from "../Components/Hotel";
import Offers from "../Components/Offers";
import MyTrips from "../Components/MyTrips";

const Home = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="flex gap-8 px-40 mt-10 bg-white">
      <Sidebar>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              className="hover:bg-blue-100"
              icon={HiChartPie}
              onClick={() => setActiveTab(1)}
            >
              <h1>Flights</h1>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:bg-blue-100"
              icon={HiViewBoards}
              onClick={() => setActiveTab(2)}
            >
              <h1>Hotels</h1>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:bg-blue-100"
              icon={HiInbox}
              onClick={() => setActiveTab(3)}
            >
              <h1>Offers</h1>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className="hover:bg-blue-100"
              icon={HiUser}
              onClick={() => setActiveTab(4)}
            >
              <h1>My Trips</h1>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className="conditional-view">
        {activeTab == 1 && <Flight />}
        {activeTab == 2 && <Hotel />}
        {activeTab == 3 && <Offers />}
        {activeTab == 4 && <MyTrips />}
      </div>
    </div>
  );
};

export default Home;
