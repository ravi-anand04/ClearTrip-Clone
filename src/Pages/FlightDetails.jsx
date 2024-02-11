import { Button, Label, TextInput, Modal, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AxisBank from "../assets/icons/AxisBank";
import Rupee from "../assets/icons/Rupee";
import Cancellation from "../assets/icons/Cancellation";
import Meal from "../assets/icons/Meal";
import Seat from "../assets/icons/Seat";
import { base_url, headers } from "../constants";
import { FaClock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const FlightDetails = () => {
  const [flightData, setFlightData] = useState([]);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [travellerDetails, setTravellerDetails] = useState({
    fname: "",
    lname: "",
    age: "",
  });

  const token = localStorage.getItem("cleartrip_token");

  const [openModal, setOpenModal] = useState(false);
  const [modalSize, setModalSize] = useState("xl");

  const [searchParams, setSearchParams] = useSearchParams();
  const _id = searchParams.get("id");
  const date = searchParams.get("date");
  // const day = searchParams.get("day");
  const srcAddress = searchParams.get("srcAddress");
  const dstAddress = searchParams.get("dstAddress");

  const source = searchParams.get("source");
  const destination = searchParams.get("destination");

  const navigate = useNavigate();

  const [error, setError] = useState({
    email: "",
    mobile: "",
    fname: "",
    lname: "",
    age: "",
  });

  useEffect(() => {
    getFlightDetails();
  }, []);

  const getFlightDetails = async () => {
    const res = await fetch(`${base_url}/flight/${_id}`, {
      method: "GET",
      headers,
    });
    const resJSON = await res.json();
    // console.log("Hey", resJSON);
    setFlightData(resJSON.data);
  };

  const formValidation = () => {
    let result = true;
    setError((prev) => {
      return { ...prev, email: "", mobile: "", fname: "", lname: "", age: "" };
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

    if (!travellerDetails.fname) {
      setError((prev) => {
        return { ...prev, fname: "Mandatory" };
      });
      result = false;
    }
    if (!travellerDetails.lname) {
      setError((prev) => {
        return { ...prev, lname: "Mandatory" };
      });
      result = false;
    }
    if (!travellerDetails.age) {
      setError((prev) => {
        return { ...prev, age: "Mandatory" };
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
      bookingType: "flight",
      bookingDetails: {
        flightId: _id,
        startDate: new Date(date).toISOString(),
        endDate: new Date(date).toISOString(),
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

    if (resJSON.status === "success") {
      // window.location.reload();
    }

    setOpenModal(true);
    console.log("Flight Booking", resJSON);
  };

  const bookFlight = () => {
    setOpenModal(false);

    toast.success("Booking Successful", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    toast.success("Redirecting to homepage", {
      position: "top-right",
      autoClose: 2000,
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

  return (
    <div className="px-48 max-sm:px-2">
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
      {!token ? (
        <h1>Please login first!</h1>
      ) : (
        <div className="logged-in flex flex-wrap items-start mt-12">
          <div>
            <Modal
              show={openModal}
              size={modalSize}
              onClose={() => setOpenModal(false)}
            >
              <Modal.Header>Review Information</Modal.Header>
              <Modal.Body>
                <div className="px-4">
                  <div className="basic-info flex items-center gap-4">
                    <span className="font-bold flex gap-1 items-center text-lg">
                      {source}
                      <svg
                        viewBox="0 0 24 24"
                        height="18"
                        width="18"
                        style={{ color: "rgb(26, 26, 26)" }}
                      >
                        <g fill="none" fill-rule="evenodd">
                          <path fill="#FFF" d="M24 24H0V0h24z"></path>
                          <path fill="#FFF" d="M24 24H0V0h24z"></path>
                          <path
                            fill="currentColor"
                            d="M5 12.875h10.675l-4.9 4.9L12 19l7-7-7-7-1.225 1.225 4.9 4.9H5z"
                          ></path>
                        </g>
                      </svg>
                      {destination}
                    </span>
                    <span className="text-stone-500">{date}</span>
                  </div>
                  <h1 className="my-2">
                    <b>Flight ID :</b> {flightData.flightID}
                  </h1>
                  <div className="full-info flex gap-4 mt-6 mb-6">
                    <div className="airport-details">
                      <h1 className="arrival flex">
                        <span className="text-xl">
                          {flightData.departureTime}
                        </span>{" "}
                      </h1>
                    </div>
                    <div className="duration flex gap-2">
                      <FaClock className="self-center" />
                      <h1 className="text-stone-500 text-sm self-center">
                        {flightData.duration}h
                      </h1>
                    </div>
                    <div className="airport-details">
                      <h1 className="arrival flex">
                        <span className="text-xl">
                          {flightData.arrivalTime}
                        </span>
                      </h1>
                    </div>
                  </div>

                  <div className="traveler-info">
                    <h1>
                      <b>Name :</b>{" "}
                      <span>
                        {travellerDetails.fname} {travellerDetails.lname},{" "}
                        {travellerDetails.age}
                      </span>{" "}
                    </h1>
                  </div>
                  <div className="contact-details">
                    <h1>
                      <b>Email :</b> <span>{email}</span>
                    </h1>
                    <h1>
                      <b>Mobile :</b> <span>{mobile}</span>
                    </h1>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="bg-orange-500 w-full m-auto"
                  onClick={bookFlight}
                  size="lg"
                >
                  Book Flight
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="review w-3/4 max-sm:w-full px-4">
            <div className="header">
              <h1 className="text-2xl font-semibold mb-8 flex gap-4">
                <div className="border border-stone-800 rounded-full px-4 py-1 text-lg">
                  1
                </div>
                <div>Review your itinerary</div>
              </h1>
            </div>
            {flightData && (
              <div className="main-body">
                <div className="basic-info flex items-center gap-4">
                  <span className="font-bold flex gap-1 items-center text-lg">
                    {source}
                    <svg
                      viewBox="0 0 24 24"
                      height="18"
                      width="18"
                      style={{ color: "rgb(26, 26, 26)" }}
                    >
                      <g fill="none" fill-rule="evenodd">
                        <path fill="#FFF" d="M24 24H0V0h24z"></path>
                        <path fill="#FFF" d="M24 24H0V0h24z"></path>
                        <path
                          fill="currentColor"
                          d="M5 12.875h10.675l-4.9 4.9L12 19l7-7-7-7-1.225 1.225 4.9 4.9H5z"
                        ></path>
                      </g>
                    </svg>
                    {destination}
                  </span>
                  <span className="text-stone-500">{date}</span>
                </div>

                <h1 className="font-semibold text-lg mt-2">
                  Flight ID: {flightData.flightID}
                </h1>
                <div className="full-info flex flex-col gap-2 border-l-2 border-dashed border-stone-400 mt-6 mb-6 max-sm:mx-0 mx-6 px-4">
                  <div className="airport-details">
                    <h1 className="arrival flex items-end gap-2">
                      <span className="text-xl">
                        {flightData.departureTime}
                      </span>{" "}
                      <span className="text-xl font-bold">
                        {flightData.source}
                      </span>
                      <span>{srcAddress}</span>
                    </h1>
                  </div>
                  <div className="duration flex gap-2 items-center ml-6">
                    <FaClock />
                    <h1 className="text-stone-500 text-sm">
                      {flightData.duration}h
                    </h1>
                  </div>
                  <div className="airport-details">
                    <h1 className="arrival flex items-start gap-2">
                      <span className="text-xl">{flightData.arrivalTime}</span>
                      <span className="text-xl font-bold">
                        {flightData.destination}
                      </span>
                      <span>{dstAddress}</span>
                    </h1>
                  </div>
                </div>
                <div className="price mb-8 flex flex-col gap-4 px-4 py-6 border border-stone-300 sm:hidden rounded-lg text-sm">
                  <div className="flex justify-between items-center total-price">
                    <h1 className="text-lg">Total price</h1>
                    <h1 className="text-xl font-bold">₹6,733</h1>
                  </div>
                  <h1 className="mb-4 text-stone-600 border-b border-stone-300 pb-6">
                    1 adult
                  </h1>
                  <div className="flex justify-between items-center base">
                    <h1 className="font-semibold text-stone-500">
                      Base fare (1 traveller)
                    </h1>
                    <h1 className="font-semibold text-stone-500">₹5,533</h1>
                  </div>
                  <div className="flex justify-between items-center taxes">
                    <h1 className="font-semibold text-stone-500">
                      Taxes and fees
                    </h1>
                    <h1 className="font-semibold text-stone-500">₹1,200</h1>
                  </div>
                  <div className="flex justify-between items-center add-ons">
                    <h1 className="font-semibold text-stone-500">Add ons</h1>
                    <h1 className="font-semibold text-stone-500">Free</h1>
                  </div>
                  <div className="flex justify-between medi-cancel">
                    <h1 className="font-semibold text-stone-500">
                      Medi-cancel benefit
                    </h1>
                    <h1 className="font-semibold text-stone-500">
                      <span className="line-through">₹199</span>{" "}
                      <span className="text-green-400">Free</span>
                    </h1>
                  </div>
                  <hr />
                  <div className="credit-card flex justify-between items-start bg-rose-100 p-3">
                    <img
                      src="https://fastui.cltpstatic.com/image/upload/offermgmt/images/emicallouticon.svg"
                      height="24px"
                    />
                    <div className="info text-stone-500 font-semibold text-center">
                      Pay in 6 interest free EMIs at ₹1,402/mo, with your credit
                      card
                    </div>
                  </div>
                </div>
                <div className="searches flex gap-6 my-8 flex-wrap">
                  <div className="card-info flex flex-col gap-4 p-4 bg-red-50 w-full rounded-lg">
                    <img
                      src="https://fastui.cltpstatic.com/raw/upload/ct-air-desktop-pwa-prod/en/static/media/Axis.85e32d6c.svg"
                      alt=""
                      className="absolute mx-36"
                    />
                    <div className="header flex justify-between">
                      <h1 className="font-bold">
                        Exclusive on Axis Bank credit cards
                      </h1>
                      <div>
                        <AxisBank />
                      </div>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-2 info-row">
                      <div className="flex justify-start gap-24 max-sm:gap-12 info-row1">
                        <h1 className="flex items-center gap-4">
                          <Rupee /> No convenience Fee
                        </h1>
                        <h1 className="flex items-center gap-4">
                          <Cancellation /> Free cancellation or date change at
                          ₹1
                        </h1>
                      </div>
                      <div className="flex justify-start gap-24 max-sm:gap-12 info-row2">
                        <h1 className="flex items-center gap-4">
                          <Seat /> Free seat up to ₹700
                        </h1>
                        <h1 className="flex items-center gap-4">
                          <Meal /> Free meal up to ₹350
                        </h1>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-emerald-400 rounded-lg w-[200px] text-white font-semibold">
                      Check your eligibility
                    </div>
                  </div>
                </div>
                <div className="searches flex gap-6 my-8 flex-wrap bg-red-100 p-4 rounded-md">
                  <img
                    alt="Feature Logo"
                    src="https://fastui.cltpstatic.com/image/upload/offermgmt/images/mediCancelIcon.svg"
                  />
                  <div className="refund flex flex-col gap-2 items-start">
                    <img
                      src="https://fastui.cltpstatic.com/image/upload/offermgmt/images/mediCancelHeader.svg"
                      alt=""
                    />
                    <p>
                      Get a full refund on flight and hotel bookings for medical
                      reasons, only on Cleartrip <Link to="/">Learn more</Link>
                    </p>
                    <p>2.5k travellers availed in last one month</p>
                  </div>
                </div>
                <div className="border border-stone-300 mb-8"></div>
                <div className="contact-details">
                  <h1 className="text-2xl my-8 flex gap-4">
                    <div className="border border-stone-800 rounded-full px-4 py-1 text-lg">
                      2
                    </div>
                    <div>Add Contact Details</div>
                  </h1>
                  <div className="user-input">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="mobile" value="Mobile Number" />
                      </div>
                      <TextInput
                        id="mobile"
                        type="number"
                        placeholder="Enter mobile number"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        helperText={
                          error.mobile ? (
                            <>
                              <span className="font-medium text-red-600">
                                Enter valid number
                              </span>
                            </>
                          ) : (
                            ""
                          )
                        }
                        className="w-[300px] max-sm:w-full"
                      />
                    </div>
                    <div className="mb-8">
                      <div className="my-2 block">
                        <Label htmlFor="email1" value="Your email" />
                      </div>
                      <TextInput
                        id="email1"
                        type="email"
                        placeholder="name@flowbite.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-[300px] max-sm:w-full"
                        helperText={
                          error.email ? (
                            <>
                              <span className="font-medium text-red-600">
                                Enter valid email
                              </span>
                            </>
                          ) : (
                            ""
                          )
                        }
                      />
                    </div>
                    {/* <Button className="bg-orange-500 px-4 rounded-md mb-4 mt-4 w-full">
                      <span
                        className="text-md"
                        onClick={() => {
                          if (email && mobile) {
                            toast.success("Save Successful", {
                              position: "top-center",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                          } else {
                            toast.error("Contact cannot be empty", {
                              position: "top-center",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                          }
                        }}
                      >
                        Save
                      </span>
                    </Button> */}
                  </div>
                  <div className="border border-stone-300 mb-8"></div>
                  <div className="traveller-details flex flex-col flex-wrap justify-between">
                    <h1 className="text-2xl mb-8 flex gap-4 w-full">
                      <div className="border border-stone-800 rounded-full px-4 py-1 text-lg">
                        3
                      </div>
                      <div>Enter traveller details</div>
                    </h1>
                    <div className="traveler-info flex flex-wrap items-start gap-4 mb-8">
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="fname" value="First Name" />
                        </div>
                        <TextInput
                          id="fname"
                          type="text"
                          placeholder="First Name"
                          required
                          className="w-[200px]"
                          value={travellerDetails.fname}
                          onChange={(e) =>
                            setTravellerDetails((prev) => ({
                              ...prev,
                              fname: e.target.value,
                            }))
                          }
                          helperText={
                            error.fname ? (
                              <>
                                <span className="font-medium text-red-600">
                                  Enter valid first name
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
                          <Label htmlFor="email1" value="Last Name" />
                        </div>
                        <TextInput
                          id="email1"
                          type="email"
                          placeholder="Last Name"
                          required
                          className="w-[200px]"
                          value={travellerDetails.lname}
                          onChange={(e) =>
                            setTravellerDetails((prev) => ({
                              ...prev,
                              lname: e.target.value,
                            }))
                          }
                          helperText={
                            error.lname ? (
                              <>
                                <span className="font-medium text-red-600">
                                  Enter valid last name
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
                          <Label htmlFor="email1" value="Age" />
                        </div>
                        <TextInput
                          id="email1"
                          type="number"
                          placeholder="Age"
                          required
                          className="w-[100px]"
                          value={travellerDetails.age}
                          onChange={(e) =>
                            setTravellerDetails((prev) => ({
                              ...prev,
                              age: e.target.value,
                            }))
                          }
                          helperText={
                            error.age ? (
                              <>
                                <span className="font-medium text-red-600">
                                  Enter valid age
                                </span>
                              </>
                            ) : (
                              ""
                            )
                          }
                        />
                      </div>
                      <Button
                        className="bg-orange-500 px-6 rounded-md mt-8 w-full"
                        onClick={submitForm}
                      >
                        Make Payment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="price max-sm:hidden sticky top-20 mb-8 flex flex-col gap-4 px-4 py-6 border border-stone-300 w-1/4 rounded-lg text-sm">
            <div className="flex justify-between items-center total-price">
              <h1 className="text-lg">Total price</h1>
              <h1 className="text-xl font-bold">₹6,733</h1>
            </div>
            <h1 className="mb-4 text-stone-600 border-b border-stone-300 pb-6">
              1 adult
            </h1>
            <div className="flex justify-between items-center base">
              <h1 className="font-semibold text-stone-500">
                Base fare (1 traveller)
              </h1>
              <h1 className="font-semibold text-stone-500">₹5,533</h1>
            </div>
            <div className="flex justify-between items-center taxes">
              <h1 className="font-semibold text-stone-500">Taxes and fees</h1>
              <h1 className="font-semibold text-stone-500">₹1,200</h1>
            </div>
            <div className="flex justify-between items-center add-ons">
              <h1 className="font-semibold text-stone-500">Add ons</h1>
              <h1 className="font-semibold text-stone-500">Free</h1>
            </div>
            <div className="flex justify-between medi-cancel">
              <h1 className="font-semibold text-stone-500">
                Medi-cancel benefit
              </h1>
              <h1 className="font-semibold text-stone-500">
                <span className="line-through">₹199</span>{" "}
                <span className="text-green-400">Free</span>
              </h1>
            </div>
            <hr />
            <div className="credit-card flex justify-between items-start bg-rose-100 p-3">
              <img
                src="https://fastui.cltpstatic.com/image/upload/offermgmt/images/emicallouticon.svg"
                height="24px"
              />
              <div className="info text-stone-500 font-semibold text-center">
                Pay in 6 interest free EMIs at ₹1,402/mo, with your credit card
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightDetails;
