import UserLogin from "../components/Authentication/UserLogin";
import WelcomeContainer from "../components/WelcomeContainer";

const LoginPage = () => {
  return (
    <WelcomeContainer title="Login">
      <UserLogin />
    </WelcomeContainer>
  );
};

export default LoginPage;
