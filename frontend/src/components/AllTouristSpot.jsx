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

  
  const handleCountrySpots = async () => {
    try {
      const res = await fetch("http://localhost:5000/countries");
      const data = await res.json();
      if (res.ok) {
        setTouristSpots(touristSpots, ...data);
      } else {
        console.error("Error fetching tourist spots:", data.message);
      }
    } catch (error) {
      notify("Error fetching tourist spots:", error.message);
    }
  };
  const handleTouristSpots = async () => {
    try {
      const res = await fetch("http://localhost:5000/allTouristSpot",);
      const data = await res.json();
      if (res.ok) {
        setTouristSpots(data);
      } else {
        console.error("Error fetching tourist spots:", data.message);
      }
    } catch (error) {
      notify(`Error fetching tourist spots:, ${error.message}`, "error");
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
    handleCountrySpots();
  });

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }
  return (
    <div>
      {/* Sorting function here... */}

      <div className="text-center my-4">
        <div className="dropdown dropdown-start">
          <div tabIndex={0} role="button" className="btn m-1">
            Click ⬇️
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu  rounded-box z-1 w-52 p-2 shadow-sm gap-y-2"
          >
            <li>
              <a
                className="bg-blur border-2 border-black"
                onClick={() => handleSort("averageCost")}
              >
                Average Cost
              </a>
            </li>
            <li>
              <a
                className="bg-blur border-2 border-black"
                onClick={() => handleSort("country")}
              >
                Country
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-10 md:grid-cols-2">
        {touristSpots.map((country, index) => {
          return (
            <NavLink
              className="h-full"
              to={`/viewDetails/${country?._id} `}
              key={index}
            >
              <div
                key={index}
                className="h-full text-shadow-xs text-shadow-[#e8ffec5d] hover:scale-105 text-6xl card w-11/12 mx-auto shadow-sm border-2 border-black shadow-amber-600 bg-[#105dc959]"
              >
                <div className="card-body">
                  <h1 className="text-center mx-auto font-extrabold text-2xl">
                    {country?.spotNames &&
                      country?.spotNames.charAt(0).toUpperCase() +
                        country?.spotNames.slice(1)}
                  </h1>
                  <table>
                    <tbody>
                      <tr>
                        <td className="md:pl-8 md:p-2 md:text-xl font-medium">
                          Country Name
                        </td>
                        <td className="md:text-lg font-extralight">
                          :{" "}
                          {country?.country &&
                            country?.country.charAt(0).toUpperCase() +
                              country?.country.slice(1)}
                        </td>
                      </tr>
                      <tr>
                        <td className="md:pl-8 md:p-2 md:text-xl font-medium">
                          Location
                        </td>
                        <td className="md:text-lg font-extralight">
                          : {country?.location}
                        </td>
                      </tr>
                      <tr>
                        <td className="md:pl-8 md:p-2 md:text-xl font-medium">
                          Average Cost
                        </td>
                        <td className="md:text-lg font-extralight">
                          : {country?.averageCost} ৳
                        </td>
                      </tr>
                      <tr>
                        <td className="md:pl-8 md:p-2 md:text-xl font-medium">
                          Season
                        </td>
                        <td className="md:text-lg font-extralight">
                          : {country?.season}
                        </td>
                      </tr>
                      <tr>
                        <td className="md:pl-8 md:p-2 md:text-xl font-medium">
                          Travel Time
                        </td>
                        <td className="md:text-lg font-extralight">
                          : {country?.travelTime} Days.
                        </td>
                      </tr>
                      <tr>
                        <td className="md:pl-8 md:p-2 md:text-xl font-medium">
                          Total Visitors
                        </td>
                        <td className="md:text-lg font-extralight">
                          : {country?.totalVisitors}
                        </td>
                      </tr>
                      <tr>
                        <td className="md:pl-8 md:p-2 md:text-xl font-medium">
                          Description
                        </td>
                        <td className="md:text-lg font-extralight">
                          :{" "}
                          {country?.description.length > 20
                            ? country.description.slice(0, 20)
                            : country.description}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <figure>
                  <img src={country?.photoURL} alt={country?.spotNames} />
                </figure>
                <p>{country?.image}</p>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default AllTouristSpot;
