import UserLogin from "../components/Authentication/UserLogin";
import UserRegister from "../components/Authentication/UserRegister";
import WelcomeContainer from "../components/WelcomeContainer";
import { useEffect } from "react";
import { formattedPageTitle } from "../constants/pageTitles.ts";

interface WelcomePagePropTypes {
  state: "login" | "register";
}
const WelcomePage = ({ state }: WelcomePagePropTypes) => {
  const path = location.pathname;

  useEffect(() => {
    if (path.includes("login")) {
      document.title = formattedPageTitle("LOGIN");
    } else if (path.includes("register")) {
      document.title = formattedPageTitle("REGISTER");
    }
  }, [path]);

  return (
    <>
      {state === "login" && (
        <WelcomeContainer title="Login">
          <UserLogin />
        </WelcomeContainer>
      )}
      {state === "register" && (
        <WelcomeContainer title="Create Account">
          <UserRegister />
        </WelcomeContainer>
      )}
    </>
  );
};

export default WelcomePage;
