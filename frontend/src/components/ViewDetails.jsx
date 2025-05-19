import React from "react";
import { Helmet } from "react-helmet";

import { useLoaderData } from "react-router-dom";

const ViewDetails = () => {
  const touristSpot = useLoaderData();
  const {
    averageCost,
    country,
    season,
    totalVisitors,
    location,
    travelTime,
    description,
    spotNames,
    photoURL,
    name,
    email,
  } = touristSpot;
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cholo | View Details</title>
        <link rel="canonical"  />
      </Helmet>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={photoURL} alt={spotNames} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{spotNames}</h2>
          <p>{name}</p>
          <p>{email}</p>
          <p>{description}</p>
          <p>{averageCost}</p>
          <p>{country}</p>
          <p>{season}</p>
          <p>{totalVisitors}</p>
          <p>{location}</p>
          <p>{travelTime}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
