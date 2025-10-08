import {createContext, ReactNode, useEffect, useState} from "react";
import { ID } from "react-native-appwrite";
import { account } from "../lib/appwrite";

export const UserContext = createContext(null);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [authChecked, setAuthChecked] = useState(false);
    async function login(email: string, password: string) {
        try {
            await account.createEmailPasswordSession(email, password);
            const response = await account.get();
            setUser(response);
        } catch (e) {
            //console.log(e.message);
            throw Error(e.message);
        }
    }

    async function register(email: string, password: string) {
        try {
            await account.create(ID.unique(), email, password);
            await login(email, password);
        } catch (e) {
            //console.log(e.message);
            throw Error(e.message);
        }
    }

    async function logout() {
        await account.deleteSession("current");
        setUser(null);
    }

    async function getInitialUserValue() {
        try {
            const user = await account.get();
            setUser(user);
        }
        catch (e) {
            setUser(null);
        }
        finally {
            setAuthChecked(true);
        }
    }

    useEffect(() => {
        getInitialUserValue();
    }, []);
    return (
        <UserContext.Provider value={{user, login, register, logout, authChecked}}>
            {children}
        </UserContext.Provider>
    )
}