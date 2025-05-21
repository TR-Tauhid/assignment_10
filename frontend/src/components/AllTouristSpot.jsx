import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet";
import LoadingPage from "./LoadingPage";

const AllTouristSpot = () => {
  const { notify, loading } = useAuth();
  const [touristSpots, setTouristSpots] = useState([]);
  const handleTouristSpots = async () => {
    try {
      const res = await fetch("http://localhost:5000/allTouristSpot");
      const data = await res.json();
      if (res.ok) {
        setTouristSpots(data);
      } else {
        console.error("Error fetching tourist spots:", data.message);
      }
    } catch (error) {
      notify("Error fetching tourist spots:", error.message);
    }
  };

  const handleSort = (sortingOption) => {
    if (sortingOption === "averageCost") {
      const sortedTouristSpot = [...touristSpots].sort((a, b) => {
        return parseFloat(a.averageCost) - parseFloat(b.averageCost);
      });
      setTouristSpots(sortedTouristSpot);
    } else if (sortingOption === "country") {
      const sortedTouristSpot = [...touristSpots].sort((a, b) => {
        return a.country.localeCompare(b.country);
      });
      setTouristSpots(sortedTouristSpot);
    }
  };

  useEffect(() => {
    handleTouristSpots();
  });

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }
  return (
    <div>
      {/* Sorting function here... */}

      <div>
        <div className="dropdown dropdown-start">
          <div tabIndex={0} role="button" className="btn m-1">
            Click ⬇️
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu  rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <a onClick={() => handleSort("averageCost")}>Average Cost</a>
            </li>
            <li>
              <a onClick={() => handleSort("country")}>Country</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Helmet>
          <meta charSet="utf-8" />
          <title>All Tourist Spot</title>
          <link rel="canonical" />
        </Helmet>
        {touristSpots.map((touristSpot, index) => (
          <NavLink to={`/viewDetails/${touristSpot._id} `} key={index}>
            <div key={index} className="card  w-96 shadow-sm">
              <div className="card-body">
                <h1>{touristSpot.spotNames}</h1>
                <h1>{touristSpot.country}</h1>
                <h1>{touristSpot.location}</h1>
                <h1>{touristSpot.description}</h1>
                <h1>{touristSpot.averageCost}</h1>
                <h1>{touristSpot.season}</h1>
                <h1>{touristSpot.travelTime}</h1>
                <h1>{touristSpot.totalVisitors}</h1>
                <h1>{touristSpot.email}</h1>
                <h1>{touristSpot.name}</h1>
              </div>
              <figure>
                <img src={touristSpot.photoURL} alt={touristSpot.name} />
              </figure>
              <p>{touristSpot.image}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AllTouristSpot;
