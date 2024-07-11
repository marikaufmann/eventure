import { createContext, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "@/api-client";
import Toast from "@/components/Toast";
import SignIn from "@/components/SignIn";
import Register from "@/components/Register";
export type ToastPayloadType = {
  message: string;
  type: "ERROR" | "SUCCESS";
};

export type AppContextType = {
  isLoggedIn: boolean;
  showToast: (payload: ToastPayloadType) => void;
  isLoginOpened: boolean;
  setIsLoginOpened: (payload: boolean) => void;
  isRegisterOpened: boolean;
  setIsRegisterOpened: (payload: boolean) => void;
  setIsFormClosed: (payload: boolean) => void;
  isFormClosed: boolean;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastPayloadType | undefined>(undefined);
  const [isLoginOpened, setIsLoginOpened] = useState<boolean>(false);
  const [isRegisterOpened, setIsRegisterOpened] = useState<boolean>(false);
  const [isFormClosed, setIsFormClosed] = useState<boolean>(false);
  const { isError } = useQuery("validateSession", apiClient.validateSession, {
    retry: false,
  });
  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
        showToast: (payload: ToastPayloadType) => setToast(payload),
        isLoginOpened,
        setIsLoginOpened,
        isRegisterOpened,
        setIsRegisterOpened,
        setIsFormClosed,
        isFormClosed,
      }}
    >
      {children}
      {isLoginOpened && <SignIn />}
      {isRegisterOpened && (
        <Register        
        />
      )}
      {toast && (
        <div className="z-50 absolute bottom-5 right-5">
          <Toast
            setShowToast={setToast}
            message={toast.message}
            type={toast.type}
          />
        </div>
      )}
    </AppContext.Provider>
  );
};
