import React, { Fragment, useEffect, useState } from "react";
import { base_url, headers } from "../constants";
import Loader from "./Loader";

const Offers = () => {
  const [allOffers, setAllOffers] = useState([]);
  const [cabs, setCabs] = useState([]);
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loader, setLoader] = useState(true);

  const [offerType, setOfferType] = useState("all");
  const [isSelected, setIsSelected] = useState("all");

  useEffect(() => {
    fetchAllOffers();
    fetchFlightOffers();
    fetchHotelOffers();
    fetchCabOffers();
  }, []);

  const fetchAllOffers = async () => {
    const res = await fetch(`${base_url}/offers?filter={"type":"ALL"}`, {
      method: "GET",
      headers,
    });

    const resJSON = await res.json();
    console.log("Offers", resJSON);
    setAllOffers(resJSON.data.offers);
    setLoader(false);
  };
  const fetchFlightOffers = async () => {
    const res = await fetch(`${base_url}/offers?filter={"type":"FLIGHTS"}`, {
      method: "GET",
      headers,
    });

    const resJSON = await res.json();
    console.log("Offers", resJSON);
    setFlights(resJSON.data.offers);
    setLoader(false);
  };
  const fetchHotelOffers = async () => {
    const res = await fetch(`${base_url}/offers?filter={"type":"HOTELS"}`, {
      method: "GET",
      headers,
    });

    const resJSON = await res.json();
    console.log("Offers", resJSON);
    setHotels(resJSON.data.offers);
    setLoader(false);
  };

  const fetchCabOffers = async () => {
    const res = await fetch(`${base_url}/offers?filter={"type":"CABS"}`, {
      method: "GET",
      headers,
    });

    const resJSON = await res.json();
    console.log("Offers", resJSON);
    setCabs(resJSON.data.offers);
    setLoader(false);
  };

  return (
    <div className="offers my-4">
      {loader && <Loader />}
      <div className="categories flex flex-wrap gap-4 mb-8">
        <button
          className={`${
            isSelected === "all" ? "bg-emerald-200" : "bg-stone-200"
          } px-4 py-2 rounded-lg font-bold text-lg`}
          onClick={() => {
            setOfferType("all");
            setIsSelected("all");
          }}
        >
          All Offers
        </button>
        <button
          className={`${
            isSelected === "flight" ? "bg-emerald-200" : "bg-stone-200"
          } px-4 py-2 rounded-lg font-bold text-lg`}
          onClick={() => {
            setOfferType("flight");
            setIsSelected("flight");
          }}
        >
          Offers on Flights
        </button>
        <button
          className={`${
            isSelected === "hotel" ? "bg-emerald-200" : "bg-stone-200"
          } px-4 py-2 rounded-lg font-bold text-lg`}
          onClick={() => {
            setOfferType("hotel");
            setIsSelected("hotel");
          }}
        >
          Offers on Hotels
        </button>
        <button
          className={`${
            isSelected === "cab" ? "bg-emerald-200" : "bg-stone-200"
          } px-4 py-2 rounded-lg font-bold text-lg`}
          onClick={() => {
            setOfferType("cab");
            setIsSelected("cab");
          }}
        >
          Offers on Cabs
        </button>
      </div>

      {offerType === "all" && (
        <div className="all-offers flex justify-evenly flex-wrap gap-4">
          {allOffers.map((offer) => (
            <div key={offer._id}>
              <img src={offer.newHeroUrl} alt="" className="w-[250px] my-2" />
              <h1 className="font-bold text-lg my-2 max-w-[250px]">
                {offer.pTl}
              </h1>
              <h1 className="max-w-[250px] my-2">{offer.pTx}</h1>
            </div>
          ))}
        </div>
      )}
      {offerType === "flight" && (
        <div className="flight-offers flex justify-evenly flex-wrap gap-4">
          {flights.map((offer) => (
            <div key={offer._id}>
              <img src={offer.newHeroUrl} alt="" className="w-[250px] my-2" />
              <h1 className="font-bold text-lg my-2 max-w-[250px]">
                {offer.pTl}
              </h1>
              <h1 className="max-w-[250px] my-2">{offer.pTx}</h1>
            </div>
          ))}
        </div>
      )}
      {offerType === "hotel" && (
        <div className="hotel-offers flex justify-evenly flex-wrap gap-4">
          {hotels.map((offer) => (
            <div key={offer._id}>
              <img src={offer.newHeroUrl} alt="" className="w-[250px] my-2" />
              <h1 className="font-bold text-lg my-2 max-w-[250px]">
                {offer.pTl}
              </h1>
              <h1 className="max-w-[250px] my-2">{offer.pTx}</h1>
            </div>
          ))}
        </div>
      )}
      {offerType === "cab" && (
        <div className="cab-offers flex justify-evenly flex-wrap gap-4">
          {cabs.map((offer) => (
            <div key={offer._id}>
              <img
                src={offer.newHeroUrl}
                alt=""
                className="max-w-[250px] my-2"
              />
              <h1 className="font-bold text-lg my-2 max-w-[250px]">
                {offer.pTl}
              </h1>
              <h1 className="max-w-[250px] my-2">{offer.pTx}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Offers;
