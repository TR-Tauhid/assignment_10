import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet";

const AllTouristSpot = () => {
  const { notify } = useAuth();
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

  useEffect(() => {
    handleTouristSpots();
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Tourist Spot</title>
        <link rel="canonical"  />
      </Helmet>
      {touristSpots.map((touristSpot, index) => (
        <NavLink to={`/viewDetails/${touristSpot._id} `} key={index}>
          <div key={index} className="card bg-base-100 w-96 shadow-sm">
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
  );
};

export default AllTouristSpot;
