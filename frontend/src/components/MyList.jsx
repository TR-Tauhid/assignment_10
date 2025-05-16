import React, { useContext } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const MyList = () => {
  const touristSpots = useLoaderData();
  const authValue = useContext(AuthContext);
  const { user, notify } = authValue;
  const userID = user?.uid;

  const handleUpdateFormSubmit = async (e) => {
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
      uid: user.uid,
    };

    try {
      const res = await fetch("http://localhost:5000/myList", {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
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

  const handleDeleteBtn = async () => {
    
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {touristSpots.map(
          (touristSpot, index) =>
            touristSpot.uid === userID && (
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
                  <img src={touristSpot.photoURL} alt={touristSpot.name} />
                </figure>
                <p>{touristSpot.image}</p>

                <div>
                  <button
                    className="btn"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    Edit
                  </button>
                  <button onClick={handleDeleteBtn} className="btn btn-warning bg-red-700 text-white border-amber-50 border-2">Delete </button>
                  <dialog id="my_modal_1" className="modal ">
                    <div className="modal-box w-full">
                      <div>
                        <form
                          method="dialogue"
                          onSubmit={handleUpdateFormSubmit}
                          className=" flex justify-center mx-auto"
                        >
                          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 gap-4 grow flex flex-col">
                            <legend className="fieldset-legend">
                              Update Tourist Spot
                            </legend>

                            <label className="floating-label">
                              <input
                                type="url"
                                name="photoURL"
                                className="input"
                                placeholder="Image URL here"
                                defaultValue={touristSpot.photoURL}
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
                                defaultValue={touristSpot.spotNames}
                                required
                              />
                              <span>Tourists Spot Name</span>
                            </label>

                            <label className="floating-label">
                              <input
                                type="text"
                                name="country"
                                className="input"
                                placeholder="Country Name"
                                defaultValue={touristSpot.country}
                                required
                              />
                              <span>Country Name</span>
                            </label>

                            <label className="floating-label">
                              <input
                                type="text"
                                name="location"
                                className="input"
                                placeholder="Location"
                                defaultValue={touristSpot.location}
                                required
                              />
                              <span>Location</span>
                            </label>

                            <label className="floating-label">
                              <textarea
                                row="30"
                                col="50"
                                type="text"
                                name="description"
                                className="textarea"
                                placeholder="Short Description"
                                defaultValue={touristSpot.description}
                                required
                              />
                              <span>Short Description</span>
                            </label>

                            <label className="floating-label">
                              <input
                                type="number"
                                name="averageCost"
                                className="input"
                                placeholder="Average Cost"
                                defaultValue={touristSpot.averageCost}
                                required
                              />
                              <span>Average Cost in Taka</span>
                            </label>

                            <select
                              name="season"
                              defaultValue={touristSpot.season}
                              className="select"
                            >
                              <option disabled={true}>Select Season</option>
                              <option value={"Summer"}>Summer</option>
                              <option value={"Rainy"}>Rainy</option>
                              <option value={"Autumn"}>Autumn</option>
                              <option value={"Late- Autumn"}>
                                Late- Autumn
                              </option>
                              <option value={"Winter"}>Winter</option>
                              <option value={"Spring"}>Spring</option>
                            </select>

                            <label className="floating-label">
                              <input
                                type="number"
                                name="travelTime"
                                className="input"
                                placeholder="Travel Time in Hours"
                                defaultValue={touristSpot.travelTime}
                                required
                              />
                              <span>Travel Time in Hours</span>
                            </label>

                            <label className="floating-label">
                              <input
                                type="number"
                                name="totalVisitors"
                                className="input"
                                placeholder="Total Visitors"
                                defaultValue={touristSpot.totalVisitors}
                                required
                              />
                              <span>Total Visitors</span>
                            </label>
                            <button
                              onClick={() =>
                                document.getElementById("my_modal_1").close()
                              }
                              type="submit"
                              className="btn btn-primary w-full mt-4"
                            >
                              Update Tourist Spot
                            </button>
                          </fieldset>
                        </form>
                      </div>
                      <div className="modal-action">
                        <form method="dialog" className="w-11/12 mx-auto">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-primary w-full">
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
                <NavLink to={`/viewDetails/${touristSpot._id} `} key={index}>
                  <button className="btn btn-primary">View Details</button>
                </NavLink>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default MyList;
