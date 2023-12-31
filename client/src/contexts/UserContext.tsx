import { createContext, ReactNode, useState } from "react";
import { UserInfo } from "../utils/model";

interface Props {
  children: ReactNode;
}

// Define the context type
interface UserContextType {
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export function UserProvider({ children }: Props) {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
