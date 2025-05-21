import React from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink, useLoaderData } from "react-router";
import { useAuth } from "../context/AuthContext";
import LoadingPage from "./LoadingPage";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const { loading } = useAuth();
  const countriesData = useLoaderData();

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  const wordsToType = [
    "LET'S TRAVEL THE WORLD...!!! ",
    "QUENCH THE THIRST OF YOUR SOUL...!!!",
    "ENJOY TRAVELING WITH CHOLO...!!!",
  ];

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cholo | Home </title>
        <link rel="canonical" />
      </Helmet>

      <div className="text-5xl text-shadow-md text-shadow-zinc-50  text-center my-10 py-10 rounded-4xl shadow-inner shadow-gray-900">
        <Typewriter
          words={wordsToType}
          loop={true}
          cursor={true}
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
          onLoopDone={() => console.log("All loops done!")}
        />
      </div>

      {/* Countries Section here... */}
      <section>
        <div>
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
                    className="h-full text-shadow-xs text-shadow-white hover:scale-105 text-6xl card w-96 shadow-sm border-2 border-black shadow-amber-600 bg-[#105dc959]"
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
                            <td className="md:pl-8 p-2 md:text-xl font-medium">
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
    </div>
  );
};

export default Home;
