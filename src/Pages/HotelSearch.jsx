import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import HotelCard from "../Components/HotelCard";
import { base_url, headers } from "../constants";
import Loader from "../Components/Loader";
import NotFound from "../Components/NotFound";
import { GoArrowBoth } from "react-icons/go";
import { Button } from "flowbite-react";

const HotelSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");
  const checkInDate = searchParams.get("checkIn");
  const checkOutDate = searchParams.get("checkOut");
  const travelerInfo = searchParams.get("travellers");

  const [hotels, setHotels] = useState([]);
  const [totalHotels, setTotalHotels] = useState(0);
  const [searchQuery, setSearchQuery] = useState(query);
  const [checkIn, setCheckIn] = useState(checkInDate);
  const [checkOut, setCheckOut] = useState(checkOutDate);
  const [travelers, setTravelers] = useState(travelerInfo);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);

  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(0);

  const [sortBy, setSortBy] = useState({
    type: "",
    value: "",
  });

  useEffect(() => {
    fetchHotels();
  }, [page]);

  const removeEmptyFields = (obj) => {
    const newObj = {};
    for (const key in obj) {
      if (obj[key] !== "") {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };

  const fetchHotels = async () => {
    // const userFilters = removeEmptyFields(sortBy);

    let url;

    if (sortBy.value) {
      url = `${base_url}/hotel?search={"location":"${query}"}&sort=${JSON.stringify(
        {
          [sortBy.type]: sortBy.value,
        }
      )}&limit=5&page=${page}`;
    } else {
      url = `${base_url}/hotel?search={"location":"${query}"}&limit=5&page=${page}`;
    }

    const res = await fetch(url, { method: "GET", headers });
    // if (!res.ok) throw new Error("Could not retrieve hotels.");
    const resJSON = await res.json();

    if (resJSON.status == "fail") {
      setLoader(false);
      return;
    }

    setHasMore(true);

    const updatedHotels = [...hotels, ...resJSON.data.hotels];
    setHotels(() => updatedHotels);
    setTotalHotels(resJSON.totalResults);
    setLoader(false);
  };

  const sortHotels = async (type, value) => {
    const updatedSort = {
      [type]: value,
    };

    setSortBy(updatedSort);
    setPage(() => 1);

    const res = await fetch(
      `${base_url}/hotel?search={"location":"${query}"}&sort=${JSON.stringify({
        [type]: value,
      })}&limit=5&page=1`,
      { method: "GET", headers }
    );

    const resJSON = await res.json();
    console.log("New data", resJSON.data.hotels);
    const updatedHotels = [...resJSON.data.hotels];
    setHotels(updatedHotels);
    setLoader(false);
  };

  const filterByPrice = async () => {
    if (!minPrice && !maxPrice) {
      return;
    }

    const res = await fetch(
      `${base_url}/hotel?search={"location":"${query}"}&filter={"costPerNight":{"$lte":${maxPrice},"$gte":${minPrice}}}&limit=3`,
      {
        method: "GET",
        headers,
      }
    );

    const resJSON = await res.json();

    console.log("Range price", resJSON);
  };

  const fetchNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="px-48 max-sm:px-2">
      <div>
        <h1 className="sm:hidden my-8 text-2xl text-stone-600 font-bold">
          {totalHotels} matching results for "{query}"
        </h1>
      </div>
      <div className="header flex flex-wrap justify-center my-8 w-1/2 max-sm:hidden">
        <div className="location">
          <input
            readOnly
            className="border flex border-slate-200 px-6 max-sm:px-2 max-sm:py-2 py-4 max-sm:rounded-none rounded-l-xl"
            value={searchQuery}
          />
        </div>
        <div className="check-in">
          <input
            readOnly
            className="border flex border-slate-200 px-6 max-sm:px-2 max-sm:py-2 py-4"
            value={checkIn}
          />
        </div>
        <div className="check-out">
          <input
            readOnly
            className="border flex border-slate-200 px-6 max-sm:px-2 max-sm:py-2 py-4"
            value={checkOut}
          />
        </div>
        <div className="travelers">
          <input
            readOnly
            className="border flex border-slate-200 px-6 py-4 max-sm:p-2 max-sm:rounded-none rounded-r-xl"
            value={travelers}
          />
        </div>
      </div>
      <div className="filter-header flex flex-wrap gap-6 items-center my-8">
        <div className="filters flex flex-wrap items-center gap-2">
          <h1 className="text-orange-500 font-bold text-lg max-sm:w-full">
            Sort By :
          </h1>
          <div className="sort-type flex flex-wrap gap-2">
            <div className="price">
              <select
                className="border border-stone-400 rounded-xl text-sm"
                onChange={(e) => sortHotels("avgCostPerNight", e.target.value)}
              >
                <option value="1">Price: Low to High</option>
                <option value="-1">Price: High to Low</option>
              </select>
            </div>
            <div className="stars">
              <select
                className="border border-stone-400 rounded-xl text-sm"
                onChange={(e) => sortHotels("rating", e.target.value)}
              >
                <option value="1">Rating: Low to High</option>
                <option value="-1">Rating: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        {/* <div className="filters flex flex-wrap gap-4 items-center">
          <h1 className="text-orange-500 font-bold text-lg">Price :</h1>
          <div className="range-picker flex items-center gap-2">
            <div className="min-price">
              <input
                className="border-stone-400 h-10 w-[150px] rounded-lg"
                type="number"
                placeholder="Min"
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <GoArrowBoth className="text-xl" />
            <div className="max-price">
              <input
                className="border-stone-400 h-10 w-[150px] rounded-lg"
                type="number"
                placeholder="Max"
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <Button
              outline
              gradientDuoTone="greenToBlue"
              onClick={filterByPrice}
            >
              Search
            </Button>
          </div>
        </div> */}
      </div>
      <div className="border my-8"></div>
      <h1 className="mb-8 text-stone-600">
        {totalHotels} matching results for "{query}"
      </h1>
      <div className="hotels mb-12 max-md:w-full">
        {loader && <Loader />}
        {!hotels.length ? (
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl text-stone-600">No matching products!</h1>
            <NotFound />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={hotels.length} //This is important field to render the next data
            next={fetchNextPage}
            hasMore={hasMore}
            loader={Loader}
            endMessage={
              <h1 style={{ textAlign: "center" }}>
                <b className="text-lg bg-stone-300 p-4 rounded-lg">
                  Yay! You have seen it all
                </b>
              </h1>
            }
            scrollableTarget="scrollableDiv"
            className="flex justify-center flex-wrap gap-4 items-center"
          >
            {hotels.map((hotel, index) => (
              <HotelCard
                key={index}
                hotel={hotel}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
              />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default HotelSearch;
