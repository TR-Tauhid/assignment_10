import { React, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import swal from "sweetalert";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet";

const MyList = () => {
  const { user, notify } = useAuth();
  const touristSpotsData = useLoaderData();
  const [touristSpots, setTouristSpots] = useState(touristSpotsData);
  const [editTouristSpot, setEditTouristSpot] = useState();
  const userID = user?.uid;

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const updatedTouristSpotDetail = {
      ...(String(editTouristSpot.photoURL) !== String(form.get("photoURL")) && {
        photoURL: form.get("photoURL"),
      }),
      ...(String(editTouristSpot.spotNames) !==
        String(form.get("spotNames")) && { spotNames: form.get("spotNames") }),
      ...(String(editTouristSpot.country) !== String(form.get("country")) && {
        country: form.get("country"),
      }),
      ...(String(editTouristSpot.location) !== String(form.get("location")) && {
        location: form.get("location"),
      }),
      ...(String(editTouristSpot.description) !==
        String(form.get("description")) && {
        description: form.get("description"),
      }),
      ...(String(editTouristSpot.averageCost) !==
        String(form.get("averageCost")) && {
        averageCost: form.get("averageCost"),
      }),
      ...(String(editTouristSpot.season) !== String(form.get("season")) && {
        season: form.get("season"),
      }),
      ...(String(editTouristSpot.travelTime) !==
        String(form.get("travelTime")) && {
        travelTime: form.get("travelTime"),
      }),
      ...(String(editTouristSpot.totalVisitors) !==
        String(form.get("totalVisitors")) && {
        totalVisitors: form.get("totalVisitors"),
      }),
    };

    try {
      const willUpdate = await swal({
        title: "Are you sure?",
        text: "Once updated, these changes will be permanent...!!!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if (willUpdate) {
        const res = await fetch(
          `http://localhost:5000/myList/${editTouristSpot._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "Application/json",
            },
            body: JSON.stringify(updatedTouristSpotDetail),
          }
        );
        if (res.ok) {
          const updatedItem = {
            ...editTouristSpot,
            ...updatedTouristSpotDetail,
          };

          setTouristSpots((Spots) =>
            Spots.map((spot) => {
              return spot._id === updatedItem._id ? updatedItem : spot;
            })
          );
          setEditTouristSpot(updatedItem);
          notify(`Tourist Spot updated Successfully...!!! `, "success");
          swal("Tourist Spot updated Successfully...!!!", {
            icon: "success",
          });
        } else {
          notify(`Failed to add tourist spot: ${res.statusText}`, "error");
        }
      } else {
        swal("Tourist Spot is not updated ...!!!");
      }
    } catch (error) {
      notify(`Failed to update tourist spot: ${error.message}`, "error");
    }
  };

  const handleEditBtn = (id) => {
    const arr = touristSpots.find((touristSpot) => {
      return touristSpot._id === id;
    });
    setEditTouristSpot(arr);
  };

  const handleDeleteBtn = async (id) => {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Once DELETED, you will not be able to recover this tourist spot data..!!!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if (willDelete) {
        const res = await fetch(`http://localhost:5000/myList/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.deletedCount > 0) {
          notify("The tourist spot has been deleted...!!!", "success");
          swal("Your tourist spot has been deleted!", {
            icon: "success",
          });
          setTouristSpots(
            touristSpots.filter((touristSpot) => touristSpot._id !== id)
          );
        } else {
          swal("Your tourist spot info is safe!");
        }
      }
    } catch (err) {
      notify(err.message, "error");
    }
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cholo | My List</title>
        <link rel="canonical"  />
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {touristSpots.map(
          (touristSpot, index) =>
            touristSpot.uid === userID && (
              <div
                key={index}
                className="card bg-base-100 w-96 shadow-sm space-y-3"
              >
                <div className="card-body">
                  <div className="card-body p-0">
                    <h1>{touristSpot.spotNames}</h1>
                    <h1>{touristSpot.country}</h1>
                    <h1>{touristSpot.location}</h1>
                    <h1>{touristSpot.description}</h1>
                    <h1>{touristSpot.averageCost}</h1>
                    <h1>{touristSpot.season}</h1>
                    <h1>{touristSpot.travelTime}</h1>
                    <h1>{touristSpot.totalVisitors}</h1>
                    <h1>{touristSpot.email}</h1>
                    <h1>{touristSpot.name}</h1>
                  </div>
                </div>

                <figure>
                  <img src={touristSpot.photoURL} alt={touristSpot.name} />
                </figure>

                <div>
                  <button
                    className="btn"
                    onClick={() => {
                      handleEditBtn(touristSpot._id);
                      document.getElementById("my_modal_1").showModal();
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteBtn(touristSpot._id)}
                    className="btn btn-warning bg-red-700 text-white border-amber-50 border-2"
                  >
                    Delete
                  </button>
                </div>
                <NavLink to={`/viewDetails/${touristSpot._id} `} key={index}>
                  <button className="btn btn-primary">View Details</button>
                </NavLink>
                {/* Modal here... */}
                <dialog id="my_modal_1" className="modal ">
                  <div className="modal-box w-full">
                    <div>
                      <form
                        key={editTouristSpot?._id || "new-form"}
                        method="dialog"
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
                              defaultValue={editTouristSpot?.photoURL}
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
                              defaultValue={editTouristSpot?.spotNames}
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
                              defaultValue={editTouristSpot?.country}
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
                              defaultValue={editTouristSpot?.location}
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
                              defaultValue={editTouristSpot?.description}
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
                              defaultValue={editTouristSpot?.averageCost}
                              required
                            />
                            <span>Average Cost in Taka</span>
                          </label>

                          <select
                            name="season"
                            defaultValue={editTouristSpot?.season}
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
                              defaultValue={editTouristSpot?.travelTime}
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
                              defaultValue={editTouristSpot?.totalVisitors}
                              required
                            />
                            <span>Total Visitors</span>
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
            )
        )}
      </div>
    </div>
  );
};

export default MyList;
