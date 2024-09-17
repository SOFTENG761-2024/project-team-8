import UserLogin from "../components/Authentication/UserLogin";
import UserRegister from "../components/Authentication/UserRegister";
import WelcomeContainer from "../components/WelcomeContainer";

interface WelcomePagePropTypes {
  state: "login" | "register";
}
const WelcomePage = ({ state }: WelcomePagePropTypes) => {
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
