import { useEffect } from "react";
import UserLogin from "../components/Authentication/UserLogin";
import UserRegister from "../components/Authentication/UserRegister";
import WelcomeContainer from "../components/WelcomeContainer";
import { formattedPageTitle } from "../constants/pageTitles.ts";

interface WelcomePagePropTypes {
  state: "login" | "register";
}

/**
 * Page containing the content used to populate the welcome page layout for login and register
 */
const WelcomePage = ({ state }: WelcomePagePropTypes) => {
  useEffect(() => {
    if (state === "login") {
      document.title = formattedPageTitle("LOGIN");
    } else if (state === "register") {
      document.title = formattedPageTitle("REGISTER");
    }
  }, [state]);

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
