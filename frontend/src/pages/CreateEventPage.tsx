import { toast } from "@/components/ui/use-toast";
import { useAppContext } from "@/hooks/use-app-context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const {
    isLoggedIn,
    setIsLoginOpened,
    isLoginOpened,
    isRegisterOpened,
    isFormClosed,
    setIsFormClosed,
  } = useAppContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn && !isLoginOpened && !isRegisterOpened && isFormClosed) {
      navigate("/");
      setIsFormClosed(false);
      toast({
        description: "Please sign in to create events.",
        variant: "destructive",
      });
    } else if (!isLoggedIn && !isLoginOpened && !isRegisterOpened) {
      setIsLoginOpened(true);
    }
  }, [isLoggedIn, isFormClosed]);
  return (
    <div className="bg-background w-full min-h-screen h-full flex flex-col text-black max-w-[1700px] mx-auto pb-32">
      CreateEvent
    </div>
  );
};

export default CreateEvent;
