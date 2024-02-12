import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { base_url, dates, headers } from "../constants";
import FlightCard from "../Components/FlightCard";
import NotFound from "../Components/NotFound";
import {
  Accordion,
  Button,
  Card,
  Dropdown,
  Label,
  TextInput,
} from "flowbite-react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Components/Loader";

import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { GoArrowSwitch } from "react-icons/go";

const FlightSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let source = searchParams.get("source");
  let destination = searchParams.get("destination");
  let date = searchParams.get("date");
  const sourceAddress = source.split("-")[1].trim();
  const destinationAddress = destination.split("-")[1].trim();
  source = source.substring(0, 3) + "_" + source.split(", ")[1];
  destination = destination.substring(0, 3) + "_" + destination.split(", ")[1];

  const [selectedDate, setSelectedDate] = useState("Mon");

  const [flights, setFlights] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [airportData, setAirportData] = useState([]);

  const [sortBy, setSortBy] = useState({
    type: "",
    value: "",
  });

  const [filters, setFilters] = useState({
    duration: "",
    stops: "",
  });

  const fetchNextPage = () => {
    setPage((prev) => prev + 1);
  };

  // console.log("Params - ", searchParams.get("name"));

  useEffect(() => {
    fetchAllAirports();
  }, []);

  useEffect(() => {
    fetchFlights();
  }, [page]);

  // useEffect(() => {}, [flights]);

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

  const fetchFlights = async () => {
    const src = source.split("_")[0];
    const dst = destination.split("_")[0];
    const userFilters = removeFalsyValues(filters);
    let url;

    if (sortBy.value) {
      url = `${base_url}/flight?search={"source":"${src}","destination":"${dst}"}&day=${selectedDate}&sort=${JSON.stringify(
        { [sortBy.type]: sortBy.value }
      )}&filter=${JSON.stringify(userFilters)}&limit=5&page=${page}`;
    } else {
      url = `${base_url}/flight?search={"source":"${src}","destination":"${dst}"}&day=${selectedDate}&filter=${JSON.stringify(
        userFilters
      )}&limit=5&page=${page}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers,
    });
    const resJSON = await res.json();

    setHasMore(true);
    console.log("Data list", resJSON);

    const updatedFlights = [...flights, ...resJSON.data.flights];

    setFlights(() => updatedFlights);
    setLoader(false);
  };

  function removeFalsyValues(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => {
        return Boolean(value) && !(Array.isArray(value) && value.length === 0);
      })
    );
  }

  const sortFlights = async (type, value) => {
    const src = source.split("_")[0];
    const dst = destination.split("_")[0];

    if (!value) {
      const updatedSorts = { type: "", value: "" };
      setSortBy(updatedSorts);
      return;
    }

    const updatedSorts = { type, value };
    console.log("Updated ------------", updatedSorts);

    setSortBy(updatedSorts);
    setPage(() => 1);

    console.log("USER", updatedSorts);

    const url = `${base_url}/flight?search={"source":"${src}","destination":"${dst}"}&day=${selectedDate}&sort=${JSON.stringify(
      { [type]: value }
    )}&limit=5&page=1`;

    console.log("URL", url);

    const res = await fetch(url, {
      method: "GET",
      headers,
    });

    const resJSON = await res.json();

    if (resJSON.status == "fail") {
      setFlights([]);
      return;
    }

    console.log("Sorted Flights", resJSON.data);

    const updatedFlights = [...resJSON.data.flights];
    setFlights(updatedFlights);
    setLoader(false);
  };

  const filterFlights = async (type, value) => {
    const src = source.split("_")[0];
    const dst = destination.split("_")[0];

    const updatedFilters = {
      ...filters,
      [type]: value,
    };

    setFilters(updatedFilters);

    if (value === "") {
      return;
    }

    setPage(() => 1);

    const userFilters = removeFalsyValues(updatedFilters);

    console.log("USER filters", userFilters);

    const url = `${base_url}/flight?search={"source":"${src}","destination":"${dst}"}&day=${selectedDate}&filter=${JSON.stringify(
      userFilters
    )}&limit=5&page=1`;

    console.log("URL", url);

    const res = await fetch(url, {
      method: "GET",
      headers,
    });

    const resJSON = await res.json();

    if (resJSON.status == "fail") {
      setFlights([]);
      return;
    }

    console.log("Filtered Flights", resJSON.data);

    const updatedFlights = [...resJSON.data.flights];
    setFlights(() => updatedFlights);
    setLoader(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleString("default", { weekday: "long" });
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
  };

  return (
    <div className="px-48 max-sm:px-2">
      <div>
        <div className="search-params mt-6 flex flex-wrap items-center justify-center gap-4">
          <input
            type="text"
            placeholder="One Way"
            className="rounded-lg text-sm w-[200px] max-sm:hidden border border-stone-300"
            value="One Way"
          />
          <input
            type="text"
            placeholder="Source"
            className="rounded-lg text-sm w-[200px] max-sm:w-[150px] border border-stone-300"
            value={searchParams.get("source").split(",")[1]}
          />
          <div className="icon text-xl text-blue-500 rounded-full border-2 border-blue-500 p-1">
            <GoArrowSwitch />
          </div>
          <input
            type="text"
            placeholder="Destination"
            className="rounded-lg text-sm w-[200px] max-sm:w-[150px] border border-stone-300"
            value={searchParams.get("destination").split(",")[1]}
          />
          <input
            type="text"
            placeholder="Traveller"
            className="rounded-lg text-sm w-[200px] max-sm:hidden border border-stone-300"
            value="1 Adult"
          />
          {/* <Button color="dark" className="rounded-lg px-4">
            Search
          </Button> */}
        </div>
        <div className="sm:hidden px-2 mt-2 text-stone-500 font-semibold">
          <span>
            <h1 className="text-center">One Way, Traveller: 1 Adult</h1>
          </span>
        </div>
        <div className="border border-stone-200 mt-6"></div>
        <div className="flex gap-6 main max-md:flex-col">
          <div className="filters w-1/4 max-sm:w-full">
            <Accordion
              className="sticky top-[10%] my-8 max-sm:my-4"
              collapseAll
            >
              <Accordion.Panel>
                <Accordion.Title>SORT BY</Accordion.Title>
                <Accordion.Content>
                  <div className="flex flex-col flex-wrap gap-2">
                    <div className="departure flex flex-col gap-1">
                      <label className={`font-semibold `}>Departure</label>
                      <select
                        className={`w-full rounded-md ${
                          sortBy.type === "departureTime"
                            ? "border-2 border-emerald-500 bg-emerald-50"
                            : ""
                        }`}
                        onChange={(e) =>
                          sortFlights("departureTime", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="1">Early to Late</option>
                        <option value="-1">Late to Early</option>
                      </select>
                    </div>
                    <div className="stops flex flex-col gap-1">
                      <label className="font-semibold">Stops</label>
                      <select
                        className={`w-full rounded-md ${
                          sortBy.type === "stops"
                            ? "border-2 border-emerald-500 bg-emerald-50"
                            : ""
                        }`}
                        onChange={(e) => sortFlights("stops", e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="1">Low to High</option>
                        <option value="-1">High to Low</option>
                      </select>
                    </div>
                    <div className="price flex flex-col gap-1">
                      <label className="font-semibold">Price</label>
                      <select
                        className={`w-full rounded-md ${
                          sortBy.type === "ticketPrice"
                            ? "border-2 border-emerald-500 bg-emerald-50"
                            : ""
                        }`}
                        onChange={(e) =>
                          sortFlights("ticketPrice", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="1">Low to High</option>
                        <option value="-1">High to Low</option>
                      </select>
                    </div>
                    <div className="duration flex flex-col gap-1">
                      <label className="font-semibold">Duration</label>
                      <select
                        className={`w-full rounded-md ${
                          sortBy.type === "duration"
                            ? "border-2 border-emerald-500 bg-emerald-50"
                            : ""
                        }`}
                        onChange={(e) =>
                          sortFlights("duration", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="1">Max to Min</option>
                        <option value="-1">Min to Max</option>
                      </select>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>FILTER</Accordion.Title>
                <Accordion.Content>
                  <div className="flex flex-col flex-wrap gap-2">
                    <div className="duration flex flex-col gap-1">
                      <label className="font-semibold">Duration</label>
                      <select
                        className="w-full"
                        onChange={(e) =>
                          filterFlights("duration", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                    </div>
                    <div className="duration flex flex-col gap-1">
                      <label className="font-semibold">Stops</label>
                      <select
                        className="w-full"
                        onChange={(e) => filterFlights("stops", e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="0">Non-stop</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>

          <div className="products w-3/4 mb-12 max-sm:w-full">
            <div className="select-day">
              <h1 className="text-2xl border-l-4 pl-4 border-yellow-300 font-bold mt-8">
                {formatDate(date)}
              </h1>
              {/* <SwiperComponent
                slidesPerView={3}
                spaceBetween={16}
                rewind={true}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 16,
                  },
                }}
                navigation={{
                  nextEl: ".custom_next",
                  prevEl: ".custom_prev",
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="flex justify-center"
              >
                {dates.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Card
                      href="#"
                      className={`max-w-sm cursor-pointer max-sm:w-[100px] ${
                        selectedDate === item.date
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                          : "bg-white"
                      }`}
                      onClick={(e) => setSelectedDate(item.date)}
                    >
                      <h5
                        className={`${
                          selectedDate === item.date
                            ? "text-white"
                            : "text-black"
                        } text-md text-center font-semibold tracking-tight text-gray-900  `}
                      >
                        {item.date}
                      </h5>
                    </Card>
                  </SwiperSlide>
                ))}
              </SwiperComponent> */}
            </div>
            {/* <div className="sort-header max-sm:hidden flex flex-wrap text-sm justify-between px-8 py-2 bg-stone-100 rounded-lg my-6">
              <span className="cursor-pointer transition text-stone-600 ease-in-out hover:text-blue-600">
                Airlines
              </span>
              <span className="cursor-pointer transition text-stone-600 ease-in-out hover:text-blue-600">
                Departure
              </span>
              <span className="cursor-pointer transition text-stone-600 ease-in-out hover:text-blue-600">
                Duration
              </span>
              <span className="cursor-pointer transition text-stone-600 ease-in-out hover:text-blue-600">
                Arrival
              </span>
              <span className="cursor-pointer transition text-stone-600 ease-in-out hover:text-blue-600">
                Price
              </span>
            </div> */}
            <div className="mt-8"></div>
            {loader && <Loader />}
            {flights.length == 0 ? (
              <div className="mt-12 flex flex-col items-center">
                {/* <h1 className="text-2xl text-stone-600">No Flights Found!</h1> */}
                <NotFound />
              </div>
            ) : (
              <InfiniteScroll
                dataLength={flights.length} //This is important field to render the next data
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
                className="flex flex-col justify-center flex-wrap gap-4"
              >
                {flights.map((flight, index) => (
                  <FlightCard
                    key={index}
                    flight={flight}
                    source={source}
                    destination={destination}
                    selectedDate={selectedDate}
                    srcAddress={sourceAddress}
                    dstAddress={destinationAddress}
                    date={formatDate(date)}
                  />
                ))}
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
