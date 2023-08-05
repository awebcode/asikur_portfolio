// import { Email, Facebook, Instagram, Twitter } from "@material-ui/icons";
import { logoutAction } from "@/actions/userAction";
import db from "@/utils/db";
import { Apple } from "@material-ui/icons";
import { GitHub, Google, Email, Facebook, Instagram, Twitter } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const LoginWithOtherMethod = (props) => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { data: session } = useSession();
  const [sessions, setSession] = useState(null);
  // const{user} = useSelector(e=>e.user)
  // console.log("sessions", sessions);

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession({ cookie: { name: "session-token" } });
      setSession(session);
    }
    fetchSession();
  }, []);
  const handleSignOut = async () => {
    await signOut();
    dispatch(logoutAction());
    toast.warning("Logged Out😭😭");
    navigate.push("/");

    // Cookies.remove("next-auth.session-token");
  };
  async function handleGoogleSignin() {
    await signIn("google", {
      callbackUrl: "/set-password",
    });
  }

  // Github Login
  async function handleGithubSignin() {
    await signIn("github", {
      callbackUrl: "/set-password",
    });
  }
  async function handleFacebookSignin() {
    await signIn("facebook", {
      callbackUrl: "/set-password",
    });
  }
  async function handleTwitterSignin() {
    await signIn("twitter", {
      callbackUrl: "/set-password",
    });
  }

  return (
    <div className="btn-login-main">
      <div className="container">
        <div className="btn-login-div">
          {/* <p>{session?.user?.id}</p>
          <p>{session?.user?.name}</p>
          <p>{session?.user?.email}</p>
          <p>{session?.user?.emailVerified}</p>
          {session?.user?.avatar && (
            <img
              src={session?.user?.avatar}
              style={{ height: "100px", width: "100px" }}
            />
          )} */}
          <h3 style={{ padding: "10px 0px" }}>Or</h3>
          <button className="btn-login google" onClick={handleGoogleSignin}>
            <Image
              src={"/google2.png"}
              alt="google"
              height={25}
              width={25}
              style={{ animation: "none", margin: "0px 8px 0px 0px" }}
            ></Image>
            With Google
          </button>
          <button className="btn-login github" onClick={handleGithubSignin}>
            <Image
              src={"/github.png"}
              alt="github"
              height={25}
              width={25}
              style={{ animation: "none", margin: "0px 8px 0px 0px" }}
            ></Image>
            Login With Github
          </button>
          <button className="btn-login facebook" onClick={handleFacebookSignin}>
            <Image
              src={"/fb.png"}
              alt="Facebook"
              height={25}
              width={25}
              style={{ animation: "none", margin: "0px 8px 0px 0px" }}
            ></Image>
            Login With Facebook
          </button>

          <button className="btn-login twitter" onClick={handleTwitterSignin}>
           
              <Image
                src={"/twitter.png"}
                alt="twitter"
                height={25}
                width={25}
                style={{ animation: "none", margin: "0px 8px 0px 0px" }}
              ></Image>
            
            Login With Twitter
          </button>
        </div>
      </div>
    </div>
  );
};
