import React, { useEffect, useState } from "react";
import { base_url, headers } from "../constants";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./styles.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useParams } from "react-router-dom";
import { FcRating } from "react-icons/fc";

const HotelDetails = () => {
  const [hotel, setHotel] = useState({});
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchHotelDetails();
    console.log(id);
  }, []);

  const fetchHotelDetails = async () => {
    const res = await fetch(`${base_url}/hotel/${id}`, {
      method: "GET",
      headers,
    });
    // if (!res.ok) throw new Error("Could not retrieve hotels.");
    const resJSON = await res.json();
    console.log("Hotel", resJSON);
    // console.log("ID", _id);
    if (resJSON.message === "success") {
      setHotel(resJSON.data);
    }
  };

  const general_amenities = [
    "24-hour front desk",
    "24-hour security",
    "Air conditioning",
    "Bathroom",
    "Doctor on call available",
    "Housekeeping services",
    "Laundry",
    "Power Back up",
  ];

  return (
    <div className="px-24 max-xl:px-12">
      <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px">
          <li class="me-2">
            <a
              href="#general"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-300"
            >
              General
            </a>
          </li>
          <li className="me-2">
            <a
              href="#amenity"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-300"
            >
              Ameneties
            </a>
          </li>
          <li className="me-2">
            <a
              href="#rules"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-300"
            >
              Property Rules
            </a>
          </li>
          <li className="me-2">
            <a
              href="#rooms"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-300"
            >
              Rooms
            </a>
          </li>
        </ul>
      </div>
      <section className="flex gap-2">
        <div className="details flex flex-col justify-between gap-2 w-1/2">
          <h1 id="general" className="font-semibold text-5xl mt-6">
            {hotel?.name}
          </h1>
          <h1 className="text-stone-500 text-lg my-2">{hotel?.location}</h1>
          <span className="flex gap-2 items-center text-xl font-semibold">
            <FcRating className="mt-1"/>
            <h1>{hotel?.rating}/5</h1>
          </span>
          <div className="highlights flex gap-4 mb-2">
            <div className="cancellation flex flex-col">
              <h1 className="font-semibold">
                Free Cancellation till 24 hrs before check in
              </h1>
              <span className="text-stone-500 font-semibold">
                With Cancel For No Reason powered by Cleartrip
              </span>
            </div>
            <div className="breakfast flex flex-col">
              <h1 className="font-semibold">Free breakfast on select plans</h1>
              <span className="text-stone-500 font-semibold">
                Some plans include free breakfast
              </span>
            </div>
          </div>
          <hr />
          <div id="amenity" className="amenities">
            <h1 className="font-semibold mt-6 text-2xl border-l-4 border-yellow-300 px-2">
              Amenities
            </h1>
            <div className="flex flex-wrap gap-8 mt-4 ml-4">
              {hotel.amenities &&
                hotel?.amenities.map((item, index) => (
                  <h1 key={index} className="font-semibold">
                    {item}
                  </h1>
                ))}
            </div>
          </div>
          <div className="general-amenities mb-4">
            <h1 className="font-semibold mt-6 text-2xl border-l-4 border-yellow-300 px-2">
              General Amenities
            </h1>
            <ul className="grid gap-4 grid-cols-3 mt-4 ml-8 list-disc">
              {general_amenities.map((item, index) => (
                <li key={index} className="font-semibold">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-1/2 max-md:w-3/4">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 rounded-lg"
          >
            {hotel.images &&
              hotel.images.map((image, index) => (
                <SwiperSlide>
                  <img key={index} src={image} />
                </SwiperSlide>
              ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper rounded-lg"
          >
            {hotel.images &&
              hotel.images.map((image, index) => (
                <SwiperSlide>
                  <img key={index} src={image} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>
      <div id="rules" className="bedding-policy">
        <h1 className="font-bold text-xl border-l-4 border-yellow-300 pl-2 my-4">
          Property Rules
        </h1>
        <span className="block ml-3">
          Bed for additional guest{" "}
          {hotel.childAndExtraBedPolicy &&
          hotel?.childAndExtraBedPolicy.extraBedForAdditionalGuest
            ? ""
            : "not "}{" "}
          available
        </span>
        <span className="block ml-3">
          Bed for children{" "}
          {hotel.childAndExtraBedPolicy &&
          hotel?.childAndExtraBedPolicy.extraBedProvidedForChild
            ? ""
            : "not "}{" "}
          available
        </span>
        <span className="block ml-3">Additional charges may apply</span>
        <span className="block ml-3">
          Extra Bed Charge:{" "}
          {hotel.extraBedCharge && hotel.childAndExtraBedPolicy.extraBedCharge}
        </span>
      </div>
      <h1
        id="rooms"
        className="font-semibold text-xl border-l-4 border-yellow-300 pl-2 mt-6"
      >
        Rooms
      </h1>
      <div className="rooms flex flex-wrap ml-3 gap-8 my-4">
        {hotel.rooms &&
          [...hotel?.rooms].slice(0, 4).map((room) => (
            <div key={room._id} className="room-details">
              <h1 className="font-bold text-lg">Room #{room.roomNumber}</h1>
              <h1>Type: {room.roomType}</h1>
              <h1>Area: {room.roomSize}</h1>
              <h1>Base cost: {room.costDetails.baseCost}</h1>
              <h1>Tax: {room.costDetails.taxesAndFees}</h1>
              <h1 className="font-bold text-lg">
                Total: Rs. {room.costPerNight}
              </h1>
              <h1 className="font-semibold text-slate-600">
                {room.cancellationPolicy}
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HotelDetails;
