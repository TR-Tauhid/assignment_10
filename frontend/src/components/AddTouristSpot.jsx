import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Helmet } from "react-helmet";

const AddTouristSpot = () => {
  const { notify, user } = useAuth();

  const handleTouristForm = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const touristDetails = {
      photoURL: form.get("photoURL"),
      spotNames: form.get("spotNames"),
      country: form.get("country"),
      location: form.get("location"),
      description: form.get("description"),
      averageCost: form.get("averageCost"),
      season: form.get("season"),
      travelTime: form.get("travelTime"),
      totalVisitors: form.get("totalVisitors"),
      email: user?.email,
      name: user?.displayName,
      uid: user?.uid,
    };

    try {
      const res = await fetch("http://localhost:5000/addTouristSpot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(touristDetails),
      });
      if (res.ok) {
        notify(`Tourist Spot ${res.statusText} Successfully...!!! `, "success");
      } else {
        notify(`Failed to add tourist spot: ${res.statusText}`, "error");
      }
    } catch (error) {
      notify(`Failed to add tourist spot: ${error.message}`, "error");
    }
  };

  return (
    <div className="w-full ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cholo | Add Tourist Spot</title>
        <link rel="canonical"  />
      </Helmet>
      <form
        onSubmit={handleTouristForm}
        className="w-1/2 flex justify-center mx-auto"
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 gap-4 grow flex flex-col">
          <legend className="fieldset-legend">Add Tourist Spot</legend>

          <label className="floating-label">
            <input
              type="url"
              name="photoURL"
              className="input"
              placeholder="Image URL here"
              required
            />
            <span>Image URL</span>
          </label>

          <label className="floating-label">
            <input
              type="text"
              name="spotNames"
              className="input"
              placeholder="Tourists Spot Name"
              required
            />
            <span>Tourists Spot Name</span>
          </label>

          <select name="country" defaultValue="Select Country" className="select">
            <option disabled={true}>Select Country</option>
            <option value={"bangladesh"}>Bangladesh</option>
            <option value={"thailand"}>Thailand</option>
            <option value={"indonesia"}>Indonesia</option>
            <option value={"malaysia"}>Malaysia</option>
            <option value={"vietnam"}>Vietnam</option>
            <option value={"cambodia"}>Cambodia</option>
          </select>

          <label className="floating-label">
            <input
              type="text"
              name="location"
              className="input"
              placeholder="Location"
              required
            />
            <span>Location</span>
          </label>

          <select name="season" defaultValue="Select Seasonality" className="select">
            <option disabled={true}>Select Seasonality</option>
            <option value={"Summer"}>Summer</option>
            <option value={"Rainy"}>Rainy</option>
            <option value={"Autumn"}>Autumn</option>
            <option value={"Late- Autumn"}>Late- Autumn</option>
            <option value={"Winter"}>Winter</option>
            <option value={"Spring"}>Spring</option>
          </select>
          
          <label className="floating-label">
            <input
              type="number"
              name="averageCost"
              className="input"
              placeholder="Average Cost"
              required
            />
            <span>Average Cost in Taka</span>
          </label>


          <label className="floating-label">
            <input
              type="number"
              name="travelTime"
              className="input"
              placeholder="Travel Time in Hours"
              required
            />
            <span>Travel Time in Days</span>
          </label>

          <label className="floating-label">
            <input
              type="number"
              name="totalVisitors"
              className="input"
              placeholder="Total Visitors"
              required
            />
            <span>Total Visitors Per Year</span>
          </label>

            <label className="floating-label">
            <textarea
              row="30"
              col="50"
              type="text"
              name="description"
              className="textarea"
              placeholder="Short Description"
              required
            />
            <span>Short Description</span>
          </label>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Add Tourist Spot
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddTouristSpot;
