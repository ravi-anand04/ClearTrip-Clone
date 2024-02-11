import React, { useEffect, useState } from "react";
import { base_url, headers } from "../constants";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./styles.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FcRating } from "react-icons/fc";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import { GoArrowSwitch } from "react-icons/go";

const HotelDetails = () => {
  const [hotel, setHotel] = useState({});
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");

  const [openModal, setOpenModal] = useState(false);
  const [modalSize, setModalSize] = useState("3xl");
  const token = localStorage.getItem("cleartrip_token");

  const [selectedRoom, setSelectedRoom] = useState({});

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const [error, setError] = useState({
    email: "",
    mobile: "",
    fname: "",
    lname: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchHotelDetails();
    console.log(id);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleString("default", { weekday: "short" });
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
  };

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

  const formValidation = () => {
    let result = true;
    setError((prev) => {
      return { ...prev, email: "", mobile: "", fname: "", lname: "" };
    });

    if (!email.includes("@") || !email.includes(".com")) {
      setError((prev) => {
        return { ...prev, email: "Invalid email" };
      });
      result = false;
    }

    if (mobile.length != 10 || isNaN(mobile)) {
      setError((prev) => {
        return { ...prev, mobile: "Invalid mobile" };
      });
      result = false;
    }

    if (!fname) {
      setError((prev) => {
        return { ...prev, fname: "Mandatory" };
      });
      result = false;
    }
    if (!lname) {
      setError((prev) => {
        return { ...prev, lname: "Mandatory" };
      });
      result = false;
    }

    return result;
  };

  const submitForm = async () => {
    const result = formValidation();

    if (result === false) {
      console.log("Returning from result");
      return;
    }

    const payload = JSON.stringify({
      bookingType: "hotel",
      bookingDetails: {
        hotelId: id,
        startDate: new Date(checkInDate).toISOString(),
        endDate: new Date(checkOutDate).toISOString(),
      },
    });

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      projectId: process.env.PROJECT_ID,
    };

    const res = await fetch(`${base_url}/booking`, {
      method: "POST",
      headers,
      body: payload,
    });
    const resJSON = await res.json();

    setOpenModal(false);
    console.log("Hotel Booking", resJSON);

    toast.success("Booking Successful, redirecting to homepage", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => {
      navigate("/");
    }, 4000);
  };

  const bookHotel = (room) => {
    setSelectedRoom(() => room);
    setOpenModal(true);
  };

  return (
    <div className="px-24 max-sm:px-2">
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
      <div>
        <Modal
          show={openModal}
          size={modalSize}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header>
            <b>Enter Traveler Details</b>
          </Modal.Header>
          <Modal.Body>
            <div className="px-4 max-sm:px-1">
              <div className="basic-info flex items-center gap-4">
                <span className="text-3xl font-bold">{hotel.name}</span>
              </div>
              <h1 className="text-lg my-4 border-l-4 px-2 border-orange-500">
                <b>Location :</b> {hotel.location}
              </h1>
              <h1 className="text-xl flex items-center max-sm:gap-6 justify-evenly mt-6">
                <span>
                  <b>Check In :</b> {formatDate(checkInDate)}
                </span>
                <div className="icon text-xl text-blue-500 rounded-full border-2 border-blue-500 p-1">
                  <GoArrowSwitch />
                </div>
                <span>
                  <b>Check Out :</b> {formatDate(checkOutDate)}
                </span>
              </h1>
              {/* {selectedRoom ? (
                <div className="room-info">
                  <h1 className="font-bold text-lg">
                    Room #{selectedRoom.roomNumber}
                  </h1>
                  <h1>Type: {selectedRoom.roomType}</h1>
                  <h1>Area: {selectedRoom.roomSize}</h1>
                  <h1>Base cost: {selectedRoom.costDetails.baseCost}</h1>
                  <h1>Tax: {selectedRoom.costDetails.taxesAndFees}</h1>
                  <h1 className="font-bold text-lg">
                    Total: Rs. {selectedRoom.costPerNight}
                  </h1>
                </div>
              ) : (
                <h1>Loading...</h1>
              )} */}
              <div className="traveller-info">
                <h1 className="text-lg font-bold mt-8 mb-4 border-l-4 px-2 border-orange-500">
                  Traveler Info
                </h1>
                <div className="flex gap-2 flex-wrap">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="fname" value="First Name" />
                    </div>
                    <TextInput
                      id="fname"
                      type="text"
                      placeholder="First Name"
                      required
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      className="w-[300px]"
                      helperText={
                        error.fname ? (
                          <>
                            <span className="font-medium text-red-600 pl-2">
                              Enter valid name
                            </span>
                          </>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="lname" value="Last Name" />
                    </div>
                    <TextInput
                      id="lname"
                      type="text"
                      placeholder="Last Name"
                      required
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      className="w-[300px]"
                      helperText={
                        error.lname ? (
                          <>
                            <span className="font-medium text-red-600  pl-2">
                              Enter valid name
                            </span>
                          </>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput
                      id="email1"
                      type="email"
                      placeholder="Enter email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-[300px]"
                      helperText={
                        error.email ? (
                          <>
                            <span className="font-medium text-red-600 pl-2">
                              Enter valid email
                            </span>
                          </>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="mobile" value="Mobile Number" />
                    </div>
                    <TextInput
                      id="mobile"
                      type="text"
                      placeholder="Enter mobile number"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-[300px]"
                      helperText={
                        error.mobile ? (
                          <>
                            <span className="font-medium text-red-600  pl-2">
                              Enter valid Number
                            </span>
                          </>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="bg-orange-500 w-full m-auto"
              onClick={submitForm}
              size="lg"
            >
              Book Hotel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <section className="flex max-sm:flex-col gap-2">
        <div className="details flex flex-col justify-between gap-2 w-1/2 max-sm:w-full max-sm:order-2">
          <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul class="flex justify-center flex-wrap -mb-px">
              <li>
                <a
                  href="#general"
                  className="inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-300"
                >
                  General
                </a>
              </li>
              <li>
                <a
                  href="#amenity"
                  className="inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-300"
                >
                  Ameneties
                </a>
              </li>
              <li>
                <a
                  href="#rules"
                  className="inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-300"
                >
                  Property Rules
                </a>
              </li>
              <li>
                <a
                  href="#rooms"
                  className="inline-block p-3 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-300"
                >
                  Rooms
                </a>
              </li>
            </ul>
          </div>
          <h1 id="general" className="font-semibold text-5xl mt-6">
            {hotel?.name}
          </h1>
          <h1 className="text-stone-500 text-lg my-2">{hotel?.location}</h1>
          <span className="flex gap-2 items-center text-xl font-semibold">
            <FcRating className="mt-1" />
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
            <ul className="grid gap-4 grid-cols-3 max-sm:grid-cols-2   mt-4 ml-8 list-disc">
              {general_amenities.map((item, index) => (
                <li key={index} className="font-semibold">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-1/2 max-sm:w-full">
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
        className="font-bold text-xl border-l-4 border-yellow-300 pl-2 mt-6"
      >
        Rooms
      </h1>
      <div className="rooms flex flex-wrap justify-evenly gap-8 mt-6 mb-4">
        {hotel.rooms &&
          [...hotel?.rooms].slice(0, 4).map((room) => (
            <div
              key={room._id}
              className="room-details border shadow-xl p-5 rounded-lg"
            >
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
              <button
                onClick={() => bookHotel(room)}
                className="rounded-md w-[150px] py-1 bg-orange-500 hover:bg-red-500 border text-white"
              >
                Book
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HotelDetails;
