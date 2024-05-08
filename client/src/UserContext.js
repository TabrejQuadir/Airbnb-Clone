import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext= createContext({});

export function UserContextProvider({children}) {
    const [user, setUser]= useState(null);
    const [ready, setReady]= useState(false);
    
    useEffect(() => {
        // Check if user data is already available
        if (!user) {
            axios.get("/profile")
                .then(({ data }) => {
                    setUser(data);
                    setReady(true);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                    setReady(true); // Set ready state even if there's an error to prevent blocking the app
                });
        } else {
            // If user data is already available, set ready state to true
            setReady(true);
        }
    }, [user]);
    return(
       <UserContext.Provider value={{user, setUser, ready, setReady}}>
       {children}
       </UserContext.Provider>
    )
}