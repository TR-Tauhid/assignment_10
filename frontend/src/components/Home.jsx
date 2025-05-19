import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cholo | Home </title>
        <link rel="canonical" />
      </Helmet>
      <h1 className="text-3xl">🔹Home Page here..!!!</h1>

      {/* Countries Section here... */}
      <section>
        <div>
          <Link to="/countrie">
            <h1>Countries...</h1>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
