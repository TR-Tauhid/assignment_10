import React from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import LoadingPage from "./LoadingPage";

const Login = () => {
  const navigate = useNavigate();

  const { createUserWithEmailPass, notify, loading } = useAuth();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const photoURL = formData.get("photoURL");
    const password = formData.get("password");
    const conformPassword = formData.get("conformPassword");

    if (password !== conformPassword) {
      notify("Password and conform password do not match...!!!", "error");
      return;
    }

    if (password.length < 6) {
      notify("Password must be at least 6 characters long...!!!", "error");
      return;
    }

    if (password.length > 20) {
      notify("Password must be at most 20 characters long...!!!", "error");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      notify(
        "Password must contain at least one uppercase letter...!!!",
        "error"
      );
      return;
    }

    if (!/[a-z]/.test(password)) {
      notify(
        "Password must contain at least one lowercase letter...!!!",
        "error"
      );
      return;
    }

    createUserWithEmailPass(email, password, name, photoURL)
      .then(async (result) => {
        const user = result.user;
        await updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        });
        navigate(-1);
        notify("Registration Successful...!!!", "success");
      })
      .catch((error) => {
        console.error(error);
        notify(error.message, "error");
      });
  };

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cholo | Register</title>
        <link rel="canonical" />
      </Helmet>
      <div className="hero  min-h-screen">
        <div className="hero-content flex-col gap-x-14 lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Welcome Traveller, please login to your account to continue your
              journey.
            </p>
          </div>

          <div className="card  w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset ">
                <legend className="fieldset-legend">Register Now...!!!</legend>

                <form onSubmit={handleFormSubmit}>
                  <label className="label mb-1 mt-4">Name*</label>
                  <input
                    type="name"
                    name="name"
                    className="input w-full"
                    placeholder="Enter your Name"
                    required
                  />
                  <label className="label mb-1 mt-4">Email*</label>
                  <input
                    type="email"
                    name="email"
                    className="input w-full"
                    placeholder="Email"
                    required
                  />
                  <label className="label mb-1 mt-4">Photo URL</label>
                  <input
                    type="url"
                    name="photoURL"
                    className="input w-full"
                    placeholder="Photo URL"
                  />
                  <label className="label mb-1 mt-4">Password*</label>
                  <input
                    type="password"
                    name="password"
                    className="input w-full"
                    placeholder="Password"
                    required
                  />
                  <label className="label mb-1 mt-4">Conform Password*</label>
                  <input
                    type="conformPassword"
                    name="conformPassword"
                    className="input w-full"
                    placeholder="Re-enter your Password"
                    required
                  />
                  <div>
                    <div className="flex gap-6 mt-4">
                      <h6>Already have an account?</h6>
                      <a
                        href="/login"
                        className="link link-primary font-medium"
                      >
                        Login Now..!!!
                      </a>
                    </div>
                  </div>
                  <button className="btn btn-neutral w-full mt-4" type="submit">
                    Register
                  </button>
                </form>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
