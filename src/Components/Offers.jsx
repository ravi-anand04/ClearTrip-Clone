import React, { useState } from "react";

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetchOffers();
  }, []);

  return <div>Offers</div>;
};

export default Offers;
