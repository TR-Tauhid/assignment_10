import React, { Component, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink, useLoaderData } from "react-router";
import { useAuth } from "../context/AuthContext";
import LoadingPage from "./LoadingPage";
import Slider from "react-slick";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const { loading, notify } = useAuth();
  const countriesData = useLoaderData();
  const [touristSpots, setTouristSpots] = useState();

  const fetchTouristSpots = async () => {
    try {
      const res = await fetch("https://cholo-backend.vercel.app/allTouristSpot");
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
    fetchTouristSpots();
  }, []);

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  const wordsToType = [
    "LET'S TRAVEL THE WORLD...!!! ",
    "QUENCH THE THIRST OF YOUR SOUL BY TRAVELING...!!!",
    "ENJOY TRAVELING WITH CHOLO...!!!",
  ];

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cholo | Home </title>
        <link rel="canonical" />
      </Helmet>

      <div className="text-xl md:text-5xl text-shadow-md text-shadow-zinc-50  text-center my-10 py-10 rounded-4xl shadow-inner shadow-gray-900">
        <Typewriter
          words={wordsToType}
          loop={true}
          cursor={true}
          cursorStyle="|"
          typeSpeed={20}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </div>

      {/* Slider here... */}

      <div className="max-w-screen mx-auto w-10/12 text-center min-h-32 h-fit text-2xl my-8">
        <h1 className="my-6">Heading for slider</h1>
        <div className="slider-container">
          <Slider className="" {...settings}>
            {countriesData.map((country, index) => {
              return (
                <div className="px-1">
                  <img
                    key={index}
                    src={country?.photoURL}
                    alt={country?.spotNames}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>

      {/* Countries Section here... */}
      <section>
        <div>
          <div className="text-center text-3xl">
            <h1>Countries to visit...</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-10 md:grid-cols-2">
            {countriesData.map((country, index) => {
              return (
                <NavLink
                  className="h-full"
                  to={`/viewDetails/${country?._id} `}
                  key={index}
                >
                  <div
                    key={index}
                    className="h-full text-shadow-xs text-shadow-white hover:scale-105 text-6xl card w-11/12 mx-auto shadow-sm border-2 border-black shadow-amber-600 bg-[#105dc959]"
                  >
                    <div className="card-body">
                      <h1 className="text-center mx-auto font-extrabold text-2xl">
                        {country?.country &&
                          country?.country.charAt(0).toUpperCase() +
                            country?.country.slice(1)}
                      </h1>
                      <table>
                        <tbody>
                          <tr>
                            <td className="md:pl-8 p-2 md:text-xl font-medium">
                              Spot Name
                            </td>
                            <td className="md:text-lg font-extralight">
                              :{" "}
                              {country?.spotNames &&
                                country?.spotNames.charAt(0).toUpperCase() +
                                  country?.spotNames.slice(1)}
                            </td>
                          </tr>
                          <tr>
                            <td className="md:pl-8 p-2 md:text-xl font-medium">
                              Location
                            </td>
                            <td className="md:text-lg font-extralight">
                              : {country?.location}
                            </td>
                          </tr>
                          <tr>
                            <td className="md:pl-8 p-2 md:text-xl font-medium">
                              Description
                            </td>
                            <td className="md:text-lg font-extralight">
                              : {country?.description.length > 150}
                            </td>
                          </tr>
                          <tr>
                            <td className="md:pl-8 p-2 md:text-xl font-medium">
                              Average Cost
                            </td>
                            <td className="md:text-lg font-extralight">
                              : {country?.averageCost} ৳
                            </td>
                          </tr>
                          <tr>
                            <td className="md:pl-8 p-2 md:text-xl font-medium">
                              Season
                            </td>
                            <td className="md:text-lg font-extralight">
                              : {country?.season}
                            </td>
                          </tr>
                          <tr>
                            <td className="md:pl-8 p-2 md:text-xl font-medium">
                              Travel Time
                            </td>
                            <td className="md:text-lg font-extralight">
                              : {country?.travelTime} Days.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <figure>
                      <img src={country?.photoURL} alt={country?.name} />
                    </figure>
                    <p>{country?.image}</p>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tourists Spot Section */}
      <section>
        <div className="w-full my-6 md:my-14">
          <h1 className="text-xl md:text-5xl text-center "> Tourists Spots</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-10 md:grid-cols-2">
            {touristSpots?.map((country, index) => {
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
      </section>
    </div>
  );
};

export default Home;
