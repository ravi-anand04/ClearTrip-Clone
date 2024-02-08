import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import FlightSearch from "./Pages/FlightSearch";
import FlightDetails from "./Pages/FlightDetails";
import HotelSearch from "./Pages/HotelSearch";
import HotelDetails from "./Pages/HotelDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights/search" element={<FlightSearch />} />
          <Route path="/flight" element={<FlightDetails />} />
          <Route path="/hotels/search" element={<HotelSearch />} />
          <Route path="/hotel" element={<HotelDetails />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
