import {useRef} from "react";
import Parse from "../../../parseconfig.ts";
const UserRegister = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const handleSignup = async (e) =>{
        e.preventDefault()
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const email = emailRef.current.value;

        const user = new Parse.User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);

        user.signUp().then((user)=>{
            console.log('User created successfully with name: ' + user.getUsername() + " and email: " + user.getEmail());
        }).catch((error)=>{
            console.log("Error: " + error.code + " " + error.message);
        })

    }


    return <form onSubmit={handleSignup}>
        <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" ref={usernameRef} required/>
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" ref={passwordRef} required/>
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" ref={emailRef} required/>
        </div>
        <button type="submit">Sign Up</button>
    </form>;
}; export default UserRegister