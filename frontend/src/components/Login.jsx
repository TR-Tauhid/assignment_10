import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";


const Login = () => {
  const authValue = useContext(AuthContext);
  const navigete = useNavigate();

  const { signInWithEmailPass, googleSignIn, facebookSignIn } = authValue;

  const handleFormSubmit = (e) => {
    console.log("Form submitted");
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    signInWithEmailPass(email, password)
      .then(() => {
        navigete(-1);
      })
      .catch((error) => console.error(error));
  };

  const handleGoogleBtn = () => {
    googleSignIn()
      .then(() => { navigete(-1) })
      .catch((error) => console.error(error));
  };

  const handleFacebookBtn =() => {
    facebookSignIn()
      .then(() => { navigete(-1) })
      .catch(error => console.error(error));
  }

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col gap-x-14 lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>

            <p className="py-6">
              Welcome Traveller, please login to your account to continue your
              journey.
            </p>
          </div>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset space-y-3.5">
                <form onSubmit={handleFormSubmit}>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input w-full"
                    placeholder="Email"
                    required
                  />
                  <label className="label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="input w-full"
                    placeholder="Password"
                    required
                  />
                  <div>
                    <a className="link font-medium">Forgot password?</a>
                    <div className="flex gap-6 mt-4">
                      <h6>Don't have an account?</h6>
                      <a
                        href="/register"
                        className="link link-primary font-medium"
                      >
                        Register Now..!!!
                      </a>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-neutral w-full mt-4">
                    Login
                  </button>
                </form>
              </fieldset>
              <h3 className="text-center">or</h3>

              <div className="flex flex-col gap-4 mt-4">
                <button onClick={handleGoogleBtn} className="btn bg-white text-black border-[#e5e5e5]">
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>

                <button onClick={handleFacebookBtn} className="btn bg-[#1A77F2] text-white border-[#005fd8]">
                  <svg
                    aria-label="Facebook logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="white"
                      d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"
                    ></path>
                  </svg>
                  Login with Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
