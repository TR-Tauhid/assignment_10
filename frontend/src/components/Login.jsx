import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const authValue = useContext(AuthContext);

  const { signInWithEmail, googleSignIn, facebookSignIn } = authValue;

  const handleEmailLogin = () => {
    signInWithEmail()
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => console.error(error));
  };

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
                <label className="label">Email</label>
                <input type="email" className="input w-full" placeholder="Email" />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input w-full"
                  placeholder="Password"
                />
                <div>
                  <a className="link font-medium">Forgot password?</a>
                  <div className="flex gap-6 mt-4">
                    <h6>Don't have an account?</h6>
                    <a href="/register" className="link link-primary font-medium">
                      Register Now..!!!
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleEmailLogin}
                  className="btn btn-neutral mt-4"
                >
                  Login
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
