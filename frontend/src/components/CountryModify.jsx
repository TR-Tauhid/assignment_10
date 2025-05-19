import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import swal from "sweetalert";
import { NavLink, useLoaderData } from "react-router-dom";

const CountryModify = () => {
  const { user, notify } = useAuth();
  const countryDataFromLoader = useLoaderData();
  const [countryData, setCountryData] = useState(countryDataFromLoader);
  const [editingSpot, setEditingSpot] = useState();

  const handleAddCountriesBtn = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const countryDetails = {
      photoURL: form.get("photoURL"),
      spotNames: form.get("spotNames"),
      country: form.get("country"),
      location: form.get("location"),
      description: form.get("description"),
      averageCost: form.get("averageCost"),
      season: form.get("season"),
      travelTime: form.get("travelTime"),
      email: user?.email,
      name: user?.displayName,
      uid: user?.uid,
    };

    await fetch("http://localhost:5000/countries", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(countryDetails),
    }).then((res) => {
      if (res.ok) {
        notify(
          "Country Tourist Spot have been added successfully..!!!",
          "success"
        );
      } else {
        notify(`${res.statusText}`, "error");
      }
    });
  };

  const handleEditBtn = (id) => {
    setEditingSpot(countryData.find((country) => country._id === id));
  };

  const handleDeleteBtn = async (id) => {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Once DELETED, you will not be able to recover this Country Spot data..!!!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if (willDelete) {
        const res = await fetch(`http://localhost:5000/countries/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (data.deletedCount > 0) {
          notify("The tourist spot has been deleted...!!!", "success");
          swal("Your tourist spot has been deleted!", {
            icon: "success",
          });
          setCountryData(countryData.filter((country) => country._id !== id));
        }
      } else {
        swal("Your tourist spot info is safe!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateCountryBtn = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const updateCountrySpotDetail = {
      ...(String(editingSpot?.photoURL) !== String(form.get("photoURL")) && {
        photoURL: form.get("photoURL"),
      }),
      ...(String(editingSpot?.spotNames) !== String(form.get("spotNames")) && {
        spotNames: form.get("spotNames"),
      }),
      ...(String(editingSpot?.country) !== String(form.get("country")) && {
        country: form.get("country"),
      }),
      ...(String(editingSpot?.location) !== String(form.get("location")) && {
        location: form.get("location"),
      }),
      ...(String(editingSpot?.description) !==
        String(form.get("description")) && {
        description: form.get("description"),
      }),
      ...(String(editingSpot?.averageCost) !==
        String(form.get("averageCost")) && {
        averageCost: form.get("averageCost"),
      }),
      ...(String(editingSpot?.season) !== String(form.get("season")) && {
        season: form.get("season"),
      }),
      ...(String(editingSpot?.travelTime) !==
        String(form.get("travelTime")) && {
        travelTime: form.get("travelTime"),
      }),
    };
    try {
      const willUpdate = await swal({
        title: "Are you sure?",
        text: "Once UPDATED, you will not be able to recover this Country Spot data..!!!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if (willUpdate) {
        const res = await fetch(
          `http://localhost:5000/countries/${editingSpot._id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify(updateCountrySpotDetail),
          }
        );
        const data = await res.json();

        if (data.modifiedCount) {
          notify("The tourist spot has been updated...!!!", "success");
          swal("Your tourist spot has been updated..!!!", {
            icon: "success",
          });
          const updateCountryList = {
            ...editingSpot,
            ...updateCountrySpotDetail,
          };
          setCountryData((countries) =>
            countries.map((country) =>
              country._id === editingSpot?._id ? updateCountryList : country
            )
          );
          setEditingSpot(updateCountryList);
        }
      } else {
        swal("Your tourist spot info is safe!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Modify Country Details</h1>
      <div>
        <details className="collapse bg-base-100 border-base-300 border">
          <summary className="collapse-title font-semibold">
            Add a Travelling destination of a South East Asian Countries.
          </summary>
          <div className="collapse-content text-sm">
            <form
              onSubmit={handleAddCountriesBtn}
              className="flex justify-center mx-auto"
            >
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 gap-4 grow flex flex-col">
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

                <select
                  name="country"
                  defaultValue="Select Country"
                  className="select"
                >
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

                <select
                  name="season"
                  defaultValue="Select Seasonality"
                  className="select"
                >
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
        </details>
      </div>

      {/* Show Countries tourist spot list... */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countryData?.map((countrySpot, index) => (
          <div key={index}>
            <div key={index} className="card bg-base-100 w-96 shadow-sm">
              <div className="card-body">
                <h1>{countrySpot.spotNames}</h1>
                <h1>{countrySpot.country}</h1>
                <h1>{countrySpot.location}</h1>
                <h1>{countrySpot.description}</h1>
                <h1>{countrySpot.averageCost}</h1>
                <h1>{countrySpot.season}</h1>
                <h1>{countrySpot.travelTime}</h1>
                <h1>{countrySpot.email}</h1>
                <h1>{countrySpot.name}</h1>
              </div>

              <figure>
                <img src={countrySpot.photoURL} alt={countrySpot.name} />
              </figure>

              <p>{countrySpot.image}</p>

              <div>
                {/*Updating Modal here... */}

                <dialog id="my_modal_1" className="modal ">
                  <div className="modal-box w-full">
                    <div>
                      <form
                        key={editingSpot?._id || "new-form"}
                        method="dialog"
                        onSubmit={handleUpdateCountryBtn}
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
                              defaultValue={editingSpot?.photoURL}
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
                              defaultValue={editingSpot?.spotNames}
                              required
                            />
                            <span>Tourists Spot Name</span>
                          </label>

                          <select
                            name="country"
                            defaultValue="Select Country"
                            className="select"
                          >
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
                              defaultValue={editingSpot?.location}
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
                              defaultValue={editingSpot?.description}
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
                              defaultValue={editingSpot?.averageCost}
                              required
                            />
                            <span>Average Cost in Taka</span>
                          </label>

                          <select
                            name="season"
                            defaultValue={editingSpot?.season}
                            className="select"
                          >
                            <option disabled={true}>Select Season</option>
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
                              name="travelTime"
                              className="input"
                              placeholder="Travel Time in Hours"
                              defaultValue={editingSpot?.travelTime}
                              required
                            />
                            <span>Travel Time in Hours</span>
                          </label>
                          <button
                            onClick={() => {
                              document.getElementById("my_modal_1").close();
                            }}
                            type="submit"
                            className="btn btn-primary w-full mt-4"
                          >
                            Update
                          </button>
                        </fieldset>
                      </form>
                    </div>
                    <div className="modal-action">
                      <form method="dialog" className="w-11/12 mx-auto">
                        <button className="btn btn-primary w-full">
                          Close
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
            <div>
              <NavLink to={`/viewDetails/${countrySpot._id} `}>
                <button className="btn btn-primary">View Details</button>
              </NavLink>

              <button
                className="btn"
                onClick={() => {
                  handleEditBtn(countrySpot._id);
                  document.getElementById("my_modal_1").showModal();
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteBtn(countrySpot._id)}
                className="btn btn-warning bg-red-700 text-white border-amber-50 border-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryModify;
