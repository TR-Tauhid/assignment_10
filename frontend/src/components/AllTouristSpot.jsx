import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { NavLink } from "react-router";

const AllTouristSpot = () => {
  const authValue = useContext(AuthContext);
  const { notify } = authValue;
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
      {touristSpots.map((touristSpot, index) => (
        <NavLink to={`/viewDetails/${touristSpot._id} `} key={index}>
          <div key={index} className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">{touristSpot.name}</h2>
              <h2 className="card-title">{touristSpot.email}</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
            </div>
            <figure>
              <img
                src={touristSpot.photoURL}
                alt={touristSpot.name}
              />
            </figure>
            <p>{touristSpot.image}</p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default AllTouristSpot;
