import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 max-sm:p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4">
              Popular Domestic Flight Routes
            </h2>
            <ul className="pl-4 max-sm:pl-0">
              <li>Delhi Goa flights</li>
              <li>Mumbai Delhi flights</li>
              <li>Delhi Kolkata flights</li>
              <li>Pune Delhi flights</li>
              <li>Bangalore Delhi flights</li>
              <li>Mumbai Bangalore flights</li>
              <li>Chennai Delhi flights</li>
              <li>Kolkata Delhi flights</li>
              <li>Delhi Mumbai flights</li>
              <li>Delhi Bangalore flights</li>
              <li>Mumbai Goa flights</li>
            </ul>
          </div>

          <div className="max-sm:hidden">
            <h2 className="text-xl font-bold mb-4">
              Popular International Flight Routes
            </h2>
            <ul className="pl-4">
              <li>Delhi Singapore flights</li>
              <li>Delhi Bangkok flights</li>
              <li>Mumbai Dubai flights</li>
              <li>Delhi Dubai flights</li>
              <li>Delhi to London flights</li>
              <li>Delhi to Toronto flights</li>
              <li>Delhi to New York flights</li>
              <li>Bangalore to Singapore flights</li>
              <li>Delhi to Paris flights</li>
              <li>Mumbai to Paris flights</li>
              <li>Delhi to Hong Kong flights</li>
            </ul>
          </div>

          <div className="max-sm:hidden">
            <h2 className="text-xl font-bold mb-4">Popular Hotels</h2>
            <ul className="pl-4">
              <li>Goa hotels</li>
              <li>Mumbai hotels</li>
              <li>Bangalore hotels</li>
              <li>Chennai hotels</li>
              <li>Nainital hotels</li>
              <li>Jaipur hotels</li>
              <li>Manali hotels</li>
              <li>Shimla hotels</li>
              <li>Pune hotels</li>
              <li>Hyderabad hotels</li>
              <li>Mahabaleshwar hotels</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Popular Hotel Chains</h2>
            <ul className="pl-4 max-sm:pl-0">
              <li>Taj group</li>
              <li>Sarovar group of hotels</li>
              <li>V resorts</li>
              <li>Fortune hotels</li>
              <li>Carlson hotels</li>
              <li>Concept</li>
              <li>Royal orchid hotels</li>
              <li>Lemon tree hotels</li>
              <li>Ginger</li>
              <li>Club Mahindra</li>
              <li>Clarks Inn group of hotels</li>
            </ul>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"></div> */}
      </div>
    </footer>
  );
};

export default Footer;
