import React, { useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from '../../firebase.init';
import SocialLogin from "../Shared/SocialLogin";
import useToken from "../../hooks/useToken";

const Register = () => {
  const [passwordMatchError, setPassswordMatchError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [updateProfile] = useUpdateProfile(auth);
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user] =
    useCreateUserWithEmailAndPassword(auth);
    const [token] = useToken(user?.user?.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    setPassswordMatchError("");
    setPasswordError("");
    if (password !== confirmPassword) {
      setPassswordMatchError("*password did'nt match");
      return;
    }

    if (password.length < 6 || password.length > 10) {
      if (password.length < 6) {
        setPasswordError("*password is too short(pass>=6)");
        return;
      } else {
        setPasswordError("*password is very long(pass<=10)");
        return;
      }
    }
    const isExistsNumber = /^(?=.*[0-9])/.test(password);
    if (!isExistsNumber) {
      setPasswordError("*password must have at least one number");
      return;
    }
    const isExistsSpecialCharacter = /^(?=.*[!@#$%^&*])/.test(password);
    if (!isExistsSpecialCharacter) {
      setPasswordError("*password must have at least one special character");
      return;
    }
    const isExistsOneSmallLetter = /^(?=.*[a-z])/.test(password);
    if (!isExistsOneSmallLetter) {
      setPasswordError("*password must have at least one small letter");
      return;
    }
    const isExistsOneUpperLetter = /^(?=.*[A-Z])/.test(password);
    if (!isExistsOneUpperLetter) {
      setPasswordError("*password must have at least one upper case letter");
      return;
    }
    setPassswordMatchError("");
    setPasswordError("");
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
  };
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [navigate, user]);
  return (
    <>
      <div className="flow-root">
        <div className="card mx-auto mt-36 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  name="name"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
              </div>
              <small className="text-red-700">{passwordError}</small>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="confirm password"
                  className="input input-bordered"
                  name="confirmPassword"
                  required
                />
              </div>
              <small className="text-red-700">{passwordMatchError}</small>
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Register
                </button>
              </div>
            </div>
          </form>
          <SocialLogin></SocialLogin>
        </div>
        <Link to="/login" className="block text-center underline text-blue-700 mt-3">
          already have an account?
        </Link>
      </div>
    </>
  );
};

export default Register;