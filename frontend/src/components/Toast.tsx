import { ToastPayloadType } from "@/contexts/AppContext";
import React, { useEffect } from "react";

const Toast = ({
  type,
  message,
  setShowToast,
}: {
  type: string;
  message: string;
  setShowToast: React.Dispatch<
    React.SetStateAction<ToastPayloadType | undefined>
  >;
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowToast(undefined);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [setShowToast]);
  const styles = type === "ERROR" ? "text-red-400" : "text-green-400";
  return (
    <div className={styles}>
      <div>{message}</div>
    </div>
  );
};

export default Toast;
