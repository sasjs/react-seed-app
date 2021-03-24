import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import SASjs, { SASjsConfig } from "@sasjs/adapter";

interface SASContextProps {
  isUserLoggedIn: boolean;
  checkingSession: boolean;
  userName: string;
  sasService: SASjs;
  setIsUserLoggedIn: null | Dispatch<SetStateAction<boolean>>;
  login: ((userName: string, password: string) => Promise<boolean>) | null;
  logout: (() => void) | null;
  request: ((requestProps: { url: string; data: any }) => Promise<any>) | null;
  startupData: any;
}

const sasService = new SASjs({
  serverUrl: "",
  appLoc: "/Public/app/react-seed-app",
  serverType: "SASVIYA",
  debug: false,
} as SASjsConfig);

export const SASContext = createContext<SASContextProps>({
  isUserLoggedIn: false,
  checkingSession: false,
  userName: "",
  sasService,
  setIsUserLoggedIn: null,
  login: null,
  logout: null,
  request: null,
  startupData: null,
});

const SASProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(false);
  const [userName, setUserName] = useState("");
  const [startupData, setStartupData] = useState(null);

  const fetchStartupData = useCallback(() => {
    sasService.request("services/common/appinit", null).then((response: any) => {
      setStartupData(response);
    });
  }, []);

  const login = useCallback((userName, password) => {
    return sasService
      .logIn(userName, password)
      .then(
        (res: { isLoggedIn: boolean; userName: string }) => {
          setIsUserLoggedIn(res.isLoggedIn);
          return true;
        },
        (err) => {
          console.error(err);
          setIsUserLoggedIn(false);
          return false;
        }
      )
      .catch((e) => {
        if (e === 403) {
          console.error("Invalid host");
        }
        return false;
      });
  }, []);

  const logout = useCallback(() => {
    sasService.logOut().then(() => {
      setIsUserLoggedIn(false);
    });
  }, []);

  const request = useCallback(({ url, data }) => {
    return sasService.request(url, data, {}, () => setIsUserLoggedIn(false))
  }, []);

  useEffect(() => {
    setCheckingSession(true);
    sasService.checkSession().then((response) => {
      setCheckingSession(false);
      setIsUserLoggedIn(response.isLoggedIn);
    });
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      setUserName(sasService.getUserName());
      if (!startupData) {
        fetchStartupData();
      }
    }
  }, [isUserLoggedIn, startupData, fetchStartupData]);

  return (
    <SASContext.Provider
      value={{
        isUserLoggedIn,
        checkingSession,
        userName,
        sasService,
        setIsUserLoggedIn,
        login,
        logout,
        request,
        startupData,
      }}
    >
      {children}
    </SASContext.Provider>
  );
};

export default SASProvider;
