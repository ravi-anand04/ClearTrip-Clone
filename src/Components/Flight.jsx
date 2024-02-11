import React, { useEffect, useState } from "react";
import {
  base_url,
  headers,
  mobileDownload,
  offerCards,
  packages,
  popularDestinations,
} from "../constants";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { MdOutlineFlightLand } from "react-icons/md";
import { GoArrowSwitch } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Button, Dropdown, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import getCurrentDate from "../utils/getCurrentDate";

const Flight = () => {
  const [offers, setOffers] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromAirports, setFromAirports] = useState([]);
  const [toAirports, setToAirports] = useState([]);
  const [airportData, setAirportData] = useState([]);

  const [date, setDate] = useState("");
  const [classType, setClassType] = useState("Economy");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    from: "",
    to: "",
    date: "",
  });

  useEffect(() => {
    fetchOffers();
    fetchAllAirports();
  }, []);

  const fetchOffers = async () => {
    const res = await fetch(`${base_url}/offers?filter={"type":"flights"}`, {
      method: "GET",
      headers,
    });
    const resJSON = await res.json();

    if (resJSON.data.length > 0) {
      setOffers(resJSON.data);
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1700,
    pauseOnHover: true,
  };

  const fetchAllAirports = async () => {
    const res = await fetch(`${base_url}/airport?search={"city":""}&limit=30`, {
      method: "GET",
      headers,
    });
    const resJSON = await res.json();
    const updatedAirports = resJSON.data.airports.map((airport) => {
      return {
        id: airport._id,
        name: airport.name,
        city: airport.city,
        code: airport.iata_code,
      };
    });

    setAirportData(updatedAirports);
  };

  const fetchAirports = async (e, type) => {
    setErrors((prev) => {
      return { ...prev, [type]: "" };
    });

    const query = e.target.value;

    const updatedAirports = airportData.filter((airport) => {
      return (
        airport.city?.toLowerCase().includes(query.toLowerCase()) ||
        airport.name?.toLowerCase().includes(query.toLowerCase()) ||
        airport.iata_code?.toLowerCase().includes(query.toLowerCase())
      );
    });

    if (type === "from") {
      setFrom(query);
      setFromAirports(updatedAirports);
    } else if (type === "to") {
      setTo(query);
      setToAirports(updatedAirports);
    } else {
      setDate(e.target.value);
    }

    console.log("from airports", fromAirports);
  };

  const redirectFlightSearch = () => {
    if (!from || !to || !date) {
      if (!from) {
        setErrors((prev) => {
          return { ...prev, from: "Please select a departure location" };
        });
      }
      if (!to) {
        setErrors((prev) => {
          return { ...prev, to: "Please select an arrival location" };
        });
      }
      if (!date) {
        setErrors((prev) => {
          return { ...prev, date: "Please select date" };
        });
      }

      return;
    }
    console.log("Date", date);

    if (from === to) {
      toast.error("Source and destination cannot be same !", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }

    if (new Date(date).getTime() < new Date().getTime()) {
      toast.error("Date cannot be in past!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }
    navigate(
      `/flights/search?source=${from}&destination=${to}&date=${date}&class=${classType}`
    );
  };

  return (
    <div className="main-content">
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
      <section className="flex items-center gap-4">
        <div className="flights">
          <h1 className="text-3xl font-semibold mt-2">Search Flights</h1>
          <h1 className="font-semibold mt-2 text-stone-600">
            Enjoy hassle free bookings with Cleartrip
          </h1>
          <div className="booking-card">
            <div className="booking-card flex flex-col px-4 py-4 border-2 rounded-xl shadow-lg shadow-slate-200 my-6 relative">
              <div className="count mb-6 m-auto">
                <Dropdown
                  label={`1 Adult, ${classType}`}
                  dismissOnClick={false}
                >
                  <Dropdown.Item>
                    <div className="flex justify-between gap-48">
                      <h1>Adult</h1>
                      <div className="qty flex justify-center gap-4">
                        <span>-</span>
                        <span>1</span>
                        <span>+</span>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <div className="flex flex-wrap gap-2 w-72">
                      <Button
                        color="dark"
                        onClick={(e) => setClassType("Economy")}
                        pill
                        className={`${
                          classType === "Economy"
                            ? "border-2 bg-green-400 hover:bg-green-300 text-white"
                            : ""
                        }`}
                      >
                        Economy
                      </Button>
                      <Button
                        color="dark"
                        onClick={(e) => setClassType("Business Class")}
                        pill
                        className={`${
                          classType === "Business Class"
                            ? "border-2 bg-green-400 text-white"
                            : ""
                        }`}
                      >
                        Business Class
                      </Button>
                      <Button
                        color="dark"
                        onClick={(e) => setClassType("First Class")}
                        pill
                        className={`${
                          classType === "First Class"
                            ? "border-2 bg-green-400 text-white"
                            : ""
                        }`}
                      >
                        First Class
                      </Button>
                      <Button
                        color="dark"
                        onClick={(e) => setClassType("Premium Economy")}
                        pill
                        className={`${
                          classType === "Premium Economy"
                            ? "border-2 bg-green-400 text-white"
                            : ""
                        }`}
                      >
                        Premium Economy
                      </Button>
                    </div>
                  </Dropdown.Item>
                </Dropdown>
              </div>
              <section className="flex flex-col items-end">
                <div className="where flex justify-start gap-4 items-center border rounded-md mb-4 px-4 py-2">
                  <div className="input flex items-center gap-4">
                    <MdOutlineFlightTakeoff className="text-2xl max-sm:hidden text-stone-400" />
                    <div className="from-search">
                      {/* <input
                        className="w-[250px] max-sm:w-full px-2 py-2"
                        placeholder="Where from?"
                        value={from}
                        onChange={(e) => fetchAirports(e, "from")}
                        list="optionsList"
                      /> */}
                      <TextInput
                        className="w-[250px] max-sm:w-full px-2 py-2"
                        placeholder="Where from?"
                        value={from}
                        onChange={(e) => fetchAirports(e, "from")}
                        list="optionsList"
                        shadow
                        required
                        color={errors.from ? "failure" : ""}
                        helperText={
                          errors.from ? (
                            <div className="ml-2">
                              <span className="font-medium">
                                Enter valid departure
                              </span>
                            </div>
                          ) : (
                            ""
                          )
                        }
                      />
                      <div className="suggestions">
                        <datalist
                          id="optionsList"
                          className="border border-stone-400"
                        >
                          {fromAirports.length > 0 &&
                            fromAirports.map((airport) => (
                              <option
                                key={airport.id}
                                className="hover:bg-stone-100 px-4 py-2 cursor-pointer"
                                value={`${airport.code} - ${airport.name}, ${airport.city}`}
                              />
                            ))}
                        </datalist>
                      </div>
                    </div>
                  </div>
                  <div className="icon text-xl text-blue-500 rounded-full border-2 border-blue-500 p-1">
                    <GoArrowSwitch />
                  </div>
                  <div className="input flex gap-4 items-center justify-center">
                    <MdOutlineFlightLand className="text-2xl max-sm:hidden text-stone-400 " />
                    <div className="to-search">
                      {/* <input
                        className="w-[250px] max-sm:w-full px-2 py-2"
                        placeholder="Where to?"
                        value={to}
                        onChange={(e) => fetchAirports(e, "to")}
                        list="optionsList2"
                      /> */}
                      <TextInput
                        className="w-[250px] max-sm:w-full px-2 py-2"
                        placeholder="Where to?"
                        value={to}
                        onChange={(e) => fetchAirports(e, "to")}
                        list="optionsList2"
                        shadow
                        required
                        color={errors.to ? "failure" : ""}
                        helperText={
                          errors.to ? (
                            <>
                              <span className="font-medium ml-2">
                                Enter valid arrival
                              </span>
                            </>
                          ) : (
                            ""
                          )
                        }
                      />
                      <div className="suggestions">
                        <datalist
                          id="optionsList2"
                          className="border border-stone-400"
                        >
                          {toAirports.length > 0 &&
                            toAirports.map((airport) => (
                              <option
                                key={airport.id}
                                className="hover:bg-stone-100 px-4 py-2 cursor-pointer"
                                value={`${airport.code} - ${airport.name}, ${airport.city}`}
                              />
                            ))}
                        </datalist>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className="submit">
                <div className="date-picker flex justify-center items-center gap-6 w-full">
                  {/* <input
                    type="date"
                    value={date}
                    placeholder="Select Date"
                    onChange={(e) => setDate(e.target.value)}
                    className="rounded-lg border-stone-300 px-4 py-3 w-1/2 max-sm:block"
                  /> */}
                  <div className="flex flex-col flex-wrap">
                    <h1 className="font-bold">Select Date</h1>
                    <TextInput
                      className="max-sm:w-full py-2"
                      type="date"
                      value={date}
                      min={getCurrentDate()}
                      onChange={(e) => fetchAirports(e, "date")}
                      // list="optionsList2"
                      shadow
                      required
                      color={errors.date ? "failure" : ""}
                      helperText={
                        errors.date ? (
                          <>
                            <span className="font-medium ml-2">
                              Enter valid date
                            </span>
                          </>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                  <Button
                    gradientMonochrome="failure"
                    className="rounded-md mt-6 max-sm:block text-lg"
                    onClick={redirectFlightSearch}
                  >
                    Search Flights
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="offers flex flex-col gap-4 max-sm:hidden">
          <div className="card border-stone-400 shadow-xl w-[300px]">
            <Slider {...carouselSettings}>
              {offerCards.map((card) => (
                <img key={card.id} src={card.url} alt="" />
              ))}
            </Slider>
          </div>
          <h1 className="text-xl font-semibold mt-6">More Offers</h1>
          <div className="card border-stone-400 shadow-xl p-5">
            {offers.length > 0 ? (
              <div>
                <h1>Sorry, no offers as of now.</h1>
                <h1>Come back later</h1>
              </div>
            ) : (
              <div>
                <h1>Sorry, no offers as of now.</h1>
                <h1>Come back later</h1>
              </div>
              //   <div>
              //     <h1>OneCard NCEMI Offer!</h1>
              //     <h1>
              //       Up to 10% off + NCEMI on Flights with OneCard Credit Card EMI!
              //     </h1>
              //     <h1>Use Coupon Code ONECARDEMI</h1>
              //   </div>
            )}
          </div>
        </div>
      </section>
      <div className="popular-searches mt-6">
        {/* <h1 className="text-2xl font-bold border-l-4 border-orange-500 pl-2">Popular searches</h1> */}
        <div className="searches flex gap-6 mt-6 flex-wrap bg-red-100 p-2 rounded-md">
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
              reasons, only on Cleartrip
            </p>
          </div>
          <Button color="gray" className="rounded-md w-1/2 text-lg">
            Learn More
          </Button>
        </div>
      </div>
      <h1 className="text-2xl font-bold my-4 sm:mt-4 border-l-4 max-sm:my-6 border-orange-500 pl-2">
        Card Offers
      </h1>
      <div className="offers-container flex flex-wrap justify-evenly max-sm:justify-center space-y-8 items-end">
        {packages.map((card) => (
          <img
            key={card.id}
            loading="lazy"
            src={card.url}
            className="w-72 cursor-pointer"
          />
        ))}
      </div>
      <div className="app-download my-16 max-sm:my-8 max-sm:hidden">
        <img src={mobileDownload} alt="" className="cursor-pointer" />
      </div>
      <h1 className="text-2xl font-bold border-l-4 max-sm:my-6 border-orange-500 pl-2">
        Popular searches
      </h1>
      <div className="popular-destinations justify-center flex flex-wrap gap-8 my-8 max-sm:gap-4">
        {popularDestinations.map((card) => (
          <div className="destination relative text-white">
            {/* <div className="details"></div> */}
            <h1 className="absolute bottom-8 left-2 font-semibold text-xl">
              {card.place}
            </h1>
            <h1 className="absolute bottom-2 left-2 font-semibold text-lg">
              {card.properties} Properties
            </h1>

            <img
              key={card.id}
              loading="lazy"
              src={card.url}
              className="w-64 h-72 cursor-pointer rounded-lg shadow-lg shadow-stone-500 hover:opacity-50"
            />
          </div>
        ))}
      </div>
      <div className="information">
        <div className="">
          <p className="font-bold text-xl mb-4">Why book on Cleartrip?</p>

          <p className="mb-4">
            On <span className="font-bold">Cleartrip.com</span>, you can turn
            all your plans into trips. From flight ticket bookings, and booking
            hotels online to airport, rental, and outstation cab booking, with
            Cleartrip, no travel dream is far enough. Fly to your favourite
            destinations with the best flight offers across various airline
            options like <span className="font-bold">IndiGo</span>,{" "}
            <span className="font-bold">Air India</span>,{" "}
            <span className="font-bold">SpiceJet</span>,{" "}
            <span className="font-bold">Go First</span>,{" "}
            <span className="font-bold">AirAsia</span>,{" "}
            <span className="font-bold">Vistara</span>, etc. Make the most of
            your holiday plans by relaxing, rejuvenating and enjoying amazing
            leisure experiences at our vast range of hotels. From affordable and
            budget-friendly hotels to the best 5-star properties, book your stay
            on Cleartrip with unmissable offers. Be it for business travel or
            pleasure, you can now get the best deals on flights and hotels. So,
            where to?
          </p>

          <p className="font-bold text-xl mb-4">
            Booking flights & hotels online with Cleartrip
          </p>

          <p className="mb-4">
            From queries to itineraries, for all things travel, there is{" "}
            <span className="font-bold">Cleartrip</span>. Checking your flight
            updates and PNR status is easy with our simple, intuitive app and
            booking site. Booking online hotels gets seamless with a range of
            choices and the greatest hotel deals.
          </p>

          <p className="font-bold text-xl mb-4">
            Here’s why booking flights and hotels with Cleartrip is your Clear
            Advantage:
          </p>

          <ul className="mb-4 list-none">
            <li>
              <span className="font-semibold">CT Flexmax:</span> Reschedule or
              cancel your domestic flight booking for free up to 24 hours before
              departure.
            </li>
            <li>
              <span className="font-semibold">CT Flex:</span> Amend your
              domestic flight booking against your date of travel and choice of
              airline. Say hello to flexible flight bookings!
            </li>
            <li>
              <span className="font-semibold">Easy hotel cancellation:</span>{" "}
              Cancel your hotel stay easily. Zero fees on hotel cancellations up
              to 24 hours before check-in on 20k+ hotels.
            </li>
            <li>
              <span className="font-semibold">Instant refund initiation:</span>{" "}
              All refunds on flight and hotel cancellations are initiated
              instantly.
            </li>
            <li>
              <span className="font-semibold">Medi-cancel refund:</span> Cancel
              your domestic flight booking easily on valid medical grounds and
              get up to ₹3500 against airline cancellation charges per passenger
              per segment.
            </li>
            <li>
              <span className="font-semibold">
                International travel insurance:
              </span>{" "}
              Get stress-free coverage against a vast range of uncertainties for
              all international destinations at only ₹89 per user per day.
            </li>
            <li>
              <span className="font-semibold">
                Special Fares For Armed Personnel, Senior Citizens and Student
                travellers:
              </span>{" "}
              Cleartrip introduces discounted fares for armed personnel, senior
              citizens and students on domestic flights. Additional discounts
              with coupon codes.
            </li>
          </ul>

          <p className="font-bold text-xl mb-4">
            What are the best offers available for travel bookings on Cleartrip?
          </p>

          <p className="mb-4">
            Get the best offers on hotels and flights using bank cards such as{" "}
            <span className="font-semibold">HDFC</span>,{" "}
            <span className="font-semibold">ICICI</span>,{" "}
            <span className="font-semibold">Bank of Baroda</span>,{" "}
            <span className="font-semibold">Federal Bank</span>, etc. You can
            also grab amazing discounts during our exciting sale events. Apart
            from this, find unmissable deals and offers on hotel stays and
            flight bookings throughout the year.
          </p>

          <p className="font-semibold text-xl mb-4">
            Are there any offers for new users on Cleartrip?
          </p>

          <p className="mb-4">
            Firsts are always special. So new users, you get{" "}
            <span className="font-bold">FLAT 12%</span> off on your airfare and
            up to <span className="font-bold">18%</span> off on hotels using
            code <span className="font-bold">CTFIRST</span>. Cleartrip is here
            to make your online flight booking seamless and simple.
          </p>

          <p className="font-bold text-xl mb-4">
            How can I find the best deals and discounts on flights and hotels
            online on Cleartrip?
          </p>

          <p className="mb-4">
            With Cleartrip, there are multiple deals available for your online
            flight and hotel booking. Whenever you select a hotel or a flight
          </p>
        </div>
      </div>
    </div>
  );
};

export default Flight;
