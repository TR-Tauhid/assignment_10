import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const authValue = useContext(AuthContext);

  const { createUserWithEmailPass } = authValue;

  const handleRegisterBtn = () => {
    createUserWithEmailPass(email, password)
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
                <form action="">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Email"
                  />
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input w-full"
                    placeholder="Password"
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
                  <button
                    onClick={handleRegisterBtn}
                    className="btn btn-neutral mt-4"
                    type="submit"
                  >
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
