import { FC, ReactElement, useState } from "react";
import Parse from "../../../parseconfig.ts";
import { Button } from "@mantine/core";

export const UserLogin: FC<{}> = (): ReactElement => {
  // State variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<
    Parse.Object | null | undefined
  >(null);

  const doUserLogIn = async function (): Promise<boolean> {
    // Note that these values come from state variables that we've declared before
    const usernameValue: string = username;
    const passwordValue: string = password;
    try {
      const loggedInUser: Parse.User = await Parse.User.logIn(
        usernameValue,
        passwordValue
      );
      // logIn returns the corresponding ParseUser object
      alert(
        `Success! User ${loggedInUser.get("username")} has successfully signed in!`
      );
      // To verify that this is in fact the current user, `current` can be used
      const currentUser: Parse.User | undefined = Parse.User.current();
      console.log(loggedInUser === currentUser);
      // Clear input fields
      setUsername("");
      setPassword("");
      // Update state variable holding current user
      getCurrentUser();
      return true;
    } catch (error: any) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  // Function that will return current user and also update current username
  const getCurrentUser = async function (): Promise<
    Parse.User | null | undefined
  > {
    const currentUser: Parse.User | null | undefined =
      await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
  };

  return (
    <div>
      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
      />
      <Button
        onClick={() => doUserLogIn()}
        className="form_button"
        color={"#208AEC"}
        size="large"
      >
        Log In
      </Button>
    </div>
  );
};
