import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import useToken from "../../hooks/useToken";

const SocialLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);
  const [token] = useToken(user?.user?.email);

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);
  return (
    <div onClick={() => signInWithGoogle()}>
      <button className="btn btn-outline w-[83%] mt-[-10px] mb-5 mx-auto font-bold text-primary flex text-2xl">
        GOOGLE
      </button>
    </div>
  );
};

export default SocialLogin;
