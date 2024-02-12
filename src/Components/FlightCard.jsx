import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { base_url, headers } from "../constants";
import { useNavigate } from "react-router-dom";

const FlightCard = ({
  flight,
  source,
  destination,
  selectedDate,
  srcAddress,
  dstAddress,
  date,
}) => {
  const [expand, setExpand] = useState(false);
  const [sourceAirport, setSourceAirport] = useState({});
  const [destinationAirport, setDestinationAirport] = useState({});
  const {
    _id,
    arrivalTime,
    departureTime,
    duration,
    stops,
    ticketPrice,
    flightID,
  } = flight;

  // console.log("Flight", flight);

  const navigate = useNavigate();

  useEffect(() => {
    // fetchFlightDetails();
  }, []);

  // const fetchFlightDetails = async () => {
  //   const res1 = await fetch(
  //     `${base_url}/airport?search={"city":"${source.split("_")[0]}"}`,
  //     {
  //       method: "GET",
  //       headers,
  //     }
  //   );
  //   const resJSON1 = await res1.json();

  //   const res = await fetch(
  //     `${base_url}/airport?search={"city":"${destination.split("_")[0]}"}`,
  //     {
  //       method: "GET",
  //       headers,
  //     }
  //   );
  //   const resJSON = await res.json();

  //   console.log("source Airport details", resJSON1);
  //   console.log("Destination Airport details", resJSON);

  //   setSourceAirport(resJSON1.data.airports[0]);
  //   setDestinationAirport(resJSON.data.airports[0]);
  // };

  const bookFlight = () => {
    navigate(
      `/flight?id=${_id}&source=${source.split("_")[1]}&destination=${
        destination.split("_")[1]
      }&srcAddress=${srcAddress}&dstAddress=${dstAddress}&date=${date}`
    );
  };

  return (
    <div className="main">
      <div className="rounded-md shadow-lg border border-stone-200">
        <div
          className={`flight-info flex flex-wrap items-center justify-between py-2 px-4 max-sm:px-2 ${
            expand ? "border-b-0" : ""
          } `}
        >
          <div className="airline max-sm:text-sm">
            <h1 className="max-sm:font-bold">FLIGHT</h1>
            <span className="w-48 font-bold">{flightID.split("-")[0]}</span>
            <h1
              className="text-blue-500 text-xs font-semibold mt-2 cursor-pointer max-sm:hidden"
              onClick={() => setExpand(!expand)}
            >
              {expand ? "Hide Details" : "Flight Details"}
            </h1>
          </div>
          <h1 className="departure">{departureTime}</h1>
          <div className="duration flex flex-col gap-1">
            <h1 className="self-center text-stone-400 text-sm">{duration}h</h1>
            <div className="border border-stone-400"></div>
            <h1 className="self-center text-stone-400 text-sm">
              {stops ? stops + " Stops" : "non-stop"}
            </h1>
          </div>
          <h1 className="arrival">{arrivalTime}</h1>
          <div className="pricing flex flex-col gap-2">
            <h1 className="self-end font-bold text-xl">
              <span>₹{ticketPrice}</span>
            </h1>
            <h1 className="text-green-500 text-xs font-semibold">
              Get ₹300 off with CTDOM
            </h1>
          </div>
          <div className="book-btn">
            <button
              className="bg-orange-500 px-4 py-1 rounded-lg text-white font-semibold"
              onClick={bookFlight}
            >
              Book
            </button>
          </div>
        </div>
        <div
          className={`details flex flex-wrap ${
            expand ? "block" : "hidden"
          } mx-8 my-4 `}
        >
          <div className="details-card flex flex-wrap items-center justify-around py-4 px-4 rounded-md shadow-lg border border-stone-200 ">
            <div className="header flex w-full gap-2 my-2">
              <span className="font-bold">{source.split("_")[1]}</span>
              <span>---</span>
              <span className="font-bold">{destination.split("_")[1]}</span>
            </div>
            <div className="airline">
              <h1>FLIGHT</h1>
              <span className="text-sm text-stone-500">{flightID}</span>
            </div>
            <div className="airport-details">
              <h1 className="arrival">
                <span className="text-xl">{source.split("_")[0]}</span>{" "}
                <span className="text-xl font-bold">{departureTime}</span>
              </h1>
              <div className="date">
                <h1 className="text-xs">{selectedDate}</h1>
              </div>
              <div className="full-name">
                {/* <h1>{sourceAirport?.name}</h1> */}
              </div>
            </div>
            <div className="duration flex flex-col gap-1">
              <h1 className="self-center text-stone-400 text-sm">
                {duration}h
              </h1>
              <div className="border border-stone-400"></div>
              <h1 className="self-center text-stone-400 text-sm">
                {stops ? stops + " Stops" : "non-stop"}
              </h1>
            </div>
            <div className="airport-details">
              <h1 className="arrival">
                <span className="text-xl">{destination.split("_")[0]}</span>{" "}
                <span className="text-xl font-bold">{arrivalTime}</span>
              </h1>
              <div className="date">
                <h1 className="text-xs">{selectedDate}</h1>
              </div>
              <div className="full-name">
                {/* <h1>{sourceAirport && sourceAirport.name}</h1> */}
              </div>
            </div>
            <div className="pricing">
              <div className="check-in flex justify-between gap-8">
                <span className="text-sm text-stone-400">Check-in baggage</span>
                <span className="text-sm font-semibold">15kg / adult</span>
              </div>
              <div className="cabin flex justify-between gap-8">
                <span className="text-sm text-stone-400">Cabin baggage</span>
                <span className="text-sm font-semibold">7kg / adult</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
