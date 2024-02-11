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
    <div className="flex max-sm:flex-col max-sm:gap-4 gap-8 px-48 max-sm:px-2 mt-10 bg-white">
      <Sidebar className="max-sm:hidden">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#flights"
              className={` ${
                activeTab === 1
                  ? "hover:bg-orange-500 bg-orange-400 text-white"
                  : "bg-stone-100"
              }`}
              icon={HiChartPie}
              onClick={() => setActiveTab(1)}
            >
              <h1>Flights</h1>
            </Sidebar.Item>
            <Sidebar.Item
              href="#hotels"
              className={` ${
                activeTab === 2
                  ? "hover:bg-orange-500 bg-orange-400 text-white"
                  : "bg-stone-100"
              }`}
              icon={HiViewBoards}
              onClick={() => setActiveTab(2)}
            >
              <h1>Hotels</h1>
            </Sidebar.Item>
            <Sidebar.Item
              href="#offers"
              className={` ${
                activeTab === 3
                  ? "hover:bg-orange-500 bg-orange-400 text-white"
                  : "bg-stone-100"
              }`}
              icon={HiInbox}
              onClick={() => setActiveTab(3)}
            >
              <h1>Offers</h1>
            </Sidebar.Item>
            {/* <Sidebar.Item
              href="#"
              className="hover:bg-blue-100"
              icon={HiUser}
              onClick={() => setActiveTab(4)}
            >
              <h1>My Trips</h1>
            </Sidebar.Item> */}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className="sm:hidden flex flex-wrap justify-around">
        <div
          className={`flight ${
            activeTab === 1 ? "bg-orange-400 text-white" : "bg-stone-100"
          } font-semibold border border-slate-400 px-6 py-2 rounded-lg`}
          onClick={() => setActiveTab(1)}
        >
          Flights
        </div>
        <div
          className={`hotel ${
            activeTab === 2 ? "bg-orange-400 text-white" : "bg-stone-100"
          } font-semibold border border-slate-400 px-6 py-2 rounded-lg`}
          onClick={() => setActiveTab(2)}
        >
          Hotels
        </div>
        <div
          className={`offers ${
            activeTab === 3 ? "bg-orange-400 text-white" : "bg-stone-100"
          } font-semibold border border-slate-400 px-6 py-2 rounded-lg`}
          onClick={() => setActiveTab(3)}
        >
          Offers
        </div>
      </div>
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
