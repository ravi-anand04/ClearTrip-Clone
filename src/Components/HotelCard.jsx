import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HotelCard = ({ hotel, checkInDate, checkOutDate }) => {
  const { _id, name, rating, avgCostPerNight, images, location, amenities } =
    hotel;

  const token = localStorage.getItem("cleartrip_token");

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(
      `/hotel?id=${_id}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
    );
  };

  return (
    <div onClick={handleRedirect}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="w-[300px] cursor-pointer overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div>
          <img
            className="rounded-t-lg w-screen h-[300px]"
            loading="lazy"
            src={images[0]}
          />
        </div>
        <div className="p-5 flex flex-col gap-1">
          <div className="head flex justify-between">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
            <span className="flex gap-2 items-center">
              <FaStar />
              {parseFloat(rating.toFixed(2))}/5
            </span>
          </div>
          <div className="full-address">{location}</div>
          <div className="flex flex-col justify-between details mt-1">
            <span className="font-bold text-xl">
              ₹ {parseInt(avgCostPerNight)}{" "}
              <span className="text-sm font-normal">
                + ₹{parseInt(avgCostPerNight) / 5} tax / night
              </span>{" "}
            </span>
            <span className="text-sm hover:opacity-80">
              + Additional Bank Discounts
            </span>
          </div>
          <div className="amenities flex flex-wrap gap-1 justify-start mt-1 max-sm:hidden">
            <h1 className="font-bold border-l-4 px-2 w-full border-yellow-300">
              Amenities:{" "}
            </h1>
            {[...amenities].slice(0, 3).map((amenity, index) => (
              <h1
                key={index}
                className="hover:text-red-500 ease-in-out delay-100 ml-2"
              >
                {amenity}
              </h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
