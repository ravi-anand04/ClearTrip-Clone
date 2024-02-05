import React, { useEffect, useState } from "react";
import {
  base_url,
  headers,
  mobileDownload,
  offerCards,
  packages,
  popularDestinations,
} from "../constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Dropdown, Label, Sidebar, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Hotel = () => {
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

  const [query, setQuery] = useState("");
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState({});

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [travellers, setTravellers] = useState("1 Room, 1 Adult");

  useEffect(() => {
    const getHotels = setTimeout(async () => {
      if (!query) {
        setHotels([]);
        return;
      }

      const res = await fetch(
        `${base_url}/hotel?search={"location":"${query}"}&limit=5`,
        { method: "GET", headers }
      );
      // if (!res.ok) throw new Error("Could not retrieve hotels.");
      const resJSON = await res.json();
      // console.log("Hotels", resJSON);
      setHotels(resJSON.data.hotels);
    }, 500);

    return () => clearTimeout(getHotels);
  }, [query]);

  const navigate = useNavigate("");

  const redirectHotelSearch = () => {
    if (query.includes("-")) {
      console.log("Selected Hotel", selectedHotel);
      navigate(`/hotel/${selectedHotel._id}`);
      return;
    }
    navigate(
      `/hotels/search?query=${query}&checkIn=${checkIn}&checkOut=${checkOut}&travellers=${travellers}`
    );
  };

  return (
    <div className="main-content">
      <section className="flex items-center gap-8">
        <div className="hotels">
          <h1 className="text-3xl font-semibold mt-2">Search Hotels</h1>
          <h1 className="font-semibold mt-2 text-stone-600">
            Enjoy hassle free bookings with Cleartrip
          </h1>
          <div className="booking-card">
            <div className="booking-card flex flex-col px-8 py-6 border-2 rounded-xl shadow-lg shadow-slate-200 my-6 relative">
              <section className="flex flex-col">
                <div className="where flex flex-col border rounded-md mb-4">
                  <input
                    className="flex-1 rounded-md bg-slate-50 px-4 py-2"
                    placeholder="Enter city?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    list="optionsList"
                  />
                  <div
                    className={`suggestions text-sm ${
                      hotels.length || "hidden"
                    } flex flex-col border border-stone-300 p-2`}
                  >
                    {hotels.map((hotel) => (
                      <div
                        key={hotel._id}
                        onClick={() => {
                          setQuery(hotel.name + " - " + hotel.location);
                          setSelectedHotel(hotel);
                        }}
                        className="hover:bg-stone-100 px-4 py-2"
                      >
                        {hotel.name} - {hotel.location}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <div className="submit mt-6">
                <div className="date-picker flex gap-6">
                  <input
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    type="date"
                    className="rounded-lg border-stone-300 px-8 py-3 w-1/2"
                  />

                  <input
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    type="date"
                    className="rounded-lg border-stone-300 px-8 py-3 w-1/2"
                  />
                  <select className="rounded-lg border-stone-300 px-4 py-3">
                    <option value="1 Room, 1 Adult">1 Room, 1 Adult</option>
                  </select>
                </div>
                <Button
                  gradientMonochrome="failure"
                  className="rounded-md w-1/3 text-lg mt-4 mx-auto"
                  onClick={redirectHotelSearch}
                >
                  Search Hotels
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="offers flex flex-col gap-4">
          <div className="card border-stone-400 shadow-xl w-[300px]">
            <Slider {...carouselSettings}>
              {offerCards.map((card) => (
                <img key={card.id} src={card.url} alt="" />
              ))}
            </Slider>
          </div>
          <h1 className="text-xl font-semibold mt-6">More Offers</h1>
          <div className="card border-stone-400 shadow-xl p-5">
            {/* {offers.length > 0 ? (
              <div>
                <h1>Sorry, no offers as of now.</h1>
                <h1>Come back later</h1>
              </div>
            ) : (
              <div>
                <h1>Sorry, no offers as of now.</h1>
                <h1>Come back later</h1>
              </div>
                <div>
                  <h1>OneCard NCEMI Offer!</h1>
                  <h1>
                    Up to 10% off + NCEMI on Flights with OneCard Credit Card EMI!
                  </h1>
                  <h1>Use Coupon Code ONECARDEMI</h1>
                </div>
            )} */}
          </div>
        </div>
      </section>
      <div className="popular-searches mt-6">
        <h1 className="text-2xl font-semibold">Popular searches</h1>
        <div className="searches flex gap-6 mt-6 flex-wrap bg-red-100 p-4 rounded-md">
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
          <h1>Cross btn</h1>
        </div>
      </div>
      <div className="offers-container flex flex-wrap justify-between my-4 space-y-12 items-end">
        {packages.map((card) => (
          <img
            key={card.id}
            loading="lazy"
            src={card.url}
            className="w-72 cursor-pointer"
          />
        ))}
      </div>
      <div className="app-download my-16">
        <img src={mobileDownload} alt="" className="cursor-pointer" />
      </div>
      <div className="popular-destinations justify-center flex flex-wrap gap-8 my-8">
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
        <div className="px-4 py-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            Why book hotels online on Cleartrip?
          </h2>
          <p className="mb-4">
            Looking for online hotel booking sites? Your search ends here. From
            guest houses to resorts, from budget-friendly to luxury, whether for
            business or for leisure, Cleartrip is your go-to hotel booking app.
            Our curated, verified list of 400,000+ hotels across 28,000+ cities
            from around the globe ensures you have enough options to choose from
            and complete your online hotel booking at ease. Find a list of hotel
            chains such as oyo rooms, fabhotels, treebo hotels, etc. Seamlessly
            book hotels in Delhi, hotels in Mumbai, hotels in Bangalore, hotels
            in Goa and many more.
          </p>

          <h3 className="text-xl font-bold mb-2">
            With an array of filters and sorting options, you can simplify the
            search for your hotel room booking.
          </h3>
          <p className="mb-4">
            It shows all the details of your preferred hotel, like description,
            highlights, photos, amenities, room types, rates all in one place.
            Additional features like pay-at-hotel, express checkout and free
            cancellations make the process of booking a hotel effortless.
          </p>

          <h3 className="text-xl font-bold mb-2">
            How to find and book hotels online on Cleartrip?
          </h3>
          <ol className="list-decimal list-inside mb-4">
            <li>Click on the 'hotels' tab on the homepage</li>
            <li>
              Type in the city/ locality/ landmark/ hotel name in the search bar
            </li>
            <li>Fill in the check-in and check-out dates</li>
            <li>Choose the number of travellers and hit enter</li>
          </ol>
          <p className="mb-4">
            You can further narrow down your hotel booking search list by using
            filters like price, star rating, traveller rating, amenities and
            even preferences like hill-view or couple-friendly hotels. For every
            kind of stay, Cleartrip has a hotel.
          </p>

          <h3 className="text-xl font-bold mb-2">
            How to Search for cheap hotels on Cleartrip?
          </h3>
          <p className="mb-4">
            Cleartrip offers never-seen-before discounts on hotels, making your
            luxurious stay pocket-friendly. Once you search for your preferred
            location or city, you can use an array of filters to refine your
            search. Enter the price range for your hotel room booking and get
            options accordingly. Compare, choose and complete your hotel booking
            by clicking on the 'Book Now' button.
          </p>

          <p className="mb-4">
            So go ahead and book that long-awaited staycation, friends' trip,
            family holiday, or just a much-needed weekend getaway! Cleartrip has
            got you covered.
          </p>

          <h2 className="text-2xl font-bold mb-4">
            What are the best offers available for hotel booking on Cleartrip?
          </h2>
          <p className="mb-2">
            Here are some unmissable deals on hotel bookings. Use the mentioned
            coupon codes when you make your hotel booking and get exciting
            discounts.
          </p>

          <ul className="list-disc list-inside mb-4">
            <li className="font-bold">
              15% Off Upto INR 10,000/- on Domestic and International Hotels -
              CTHOTEL
            </li>
            <li className="font-bold">
              Upto 35% off on Hotels with AU Bank Credit Card - AUCC
            </li>
          </ul>

          <p className="mb-4">
            Great deals that run all year round, so you can book whenever you
            wish!
          </p>

          <ul className="list-disc list-inside mb-4">
            <li className="font-bold">
              20% Off Upto INR 15,000/- on International Hotels - CTINTL
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">
            What are the benefits of booking hotels on Cleartrip?
          </h2>
          <ul className="list-disc list-inside mb-4">
            <li>Diverse range of hotels - from pocket-friendly to luxury</li>
            <li>
              Best offers using bank cards like Axis, ICICI, Kotak, Slice, Bank
              of Baroda, CITI, Federal, etc.
            </li>
            <li>Wallet cashbacks on Paytm and Mobikwik</li>
            <li>Exciting deals and discounts throughout the year</li>
            <li>Cancellation policies in case of last minute changes</li>
            <li>Upgrades on your stay</li>
            <li>EMI options</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hotel;