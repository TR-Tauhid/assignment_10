import React from "react";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { useAuth } from "../context/AuthContext";

const ViewDetails = () => {
  const { loading } = useAuth();

  const touristSpot = useLoaderData();
  const {
    averageCost,
    country,
    season,
    location,
    travelTime,
    description,
    spotNames,
    photoURL,
    name,
    _id,
  } = touristSpot;
  
  console.log(touristSpot);

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cholo | View Details</title>
        <link rel="canonical" />
      </Helmet>

      <div className="w-full">
          <div className="h-full mx-auto my-14 text-shadow-xs text-shadow-white text-6xl card w-10/12 shadow-sm border-2 border-black shadow-amber-600 bg-[#105dc959]">
            <div className="card-body">
              <h1 className="text-center mx-auto font-extrabold text-2xl">
                {spotNames &&
                  spotNames.charAt(0).toUpperCase() + spotNames.slice(1)}
              </h1>
              <table className="md:w-1/2 mx-auto md:text-2xl">
                <tbody>
                  <tr>
                    <td className="md:pl-8 p-2 font-medium">
                      Country Name
                    </td>
                    <td className="font-extralight">
                      :{" "}
                      {country &&
                        country.charAt(0).toUpperCase() + country.slice(1)}
                    </td>
                  </tr>
                  <tr>
                    <td className="md:pl-8 p-2 font-medium">
                      Location
                    </td>
                    <td className="font-extralight">: {location}</td>
                  </tr>
                  <tr>
                    <td className="md:pl-8 p-2 font-medium">
                      Average Cost
                    </td>
                    <td className="font-extralight">
                      : {averageCost} ৳
                    </td>
                  </tr>
                  <tr>
                    <td className="md:pl-8 p-2 font-medium">
                      Season
                    </td>
                    <td className="font-extralight">: {season}</td>
                  </tr>
                  <tr>
                    <td className="md:pl-8 p-2 font-medium">
                      Travel Time
                    </td>
                    <td className="font-extralight">
                      : {travelTime} Days.
                    </td>
                  </tr>
                  <tr>
                    <td className="md:pl-8 p-2 font-medium">
                      Description
                    </td>
                    <td className="font-extralight">
                      : {description}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <figure>
              <img src={photoURL} alt={name} />
            </figure>
          </div>
      </div>
    </div>
  );
};

export default ViewDetails;

{
  /* <p>{name}</p>
<p>{email}</p>
<p>{description}</p>
<p>{averageCost}</p>
<p>{country}</p>
<p>{season}</p>
<p>{totalVisitors}</p>
<p>{location}</p>
<p>{travelTime}</p> */
}
