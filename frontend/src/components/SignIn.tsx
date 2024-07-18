import { X } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useMutation, useQueryClient } from "react-query";
import { LoginFormData } from "../types";
import { useForm } from "react-hook-form";
import { FaSignInAlt } from "react-icons/fa";
import * as apiClient from "@/api-client";
import Loader from "./Loader";
import { useAppContext } from "@/hooks/use-app-context";
import { useLocation } from "react-router-dom";

const SignIn = () => {
  const { setIsLoginOpened, setIsRegisterOpened, setIsFormClosed } =
    useAppContext();
  const path = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>();
  const { mutate: login, isLoading } = useMutation(apiClient.logIn, {
    onError: (err: Error) => {
      toast({ description: err.message, variant: "destructive" });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateSession");
      setIsLoginOpened(false);
    },
  });
  const onSubmit = handleSubmit((data: LoginFormData) => {
    login(data);
  });
  return (
    <div className="inset-0 fixed bg-black/50  flex items-center justify-center z-[60] max-xsm:px-4">
      <div className="rounded-sm bg-white max-w-md w-full h-fit px-6 py-12 flex flex-col relative shadow-2xl ">
        <button
          className="absolute top-6 right-6 rounded-full bg-gray-100 shadow-2xl p-1 hover:bg-gray-200"
          onClick={() => {
            setIsLoginOpened(false);
            if (
              path.pathname === "/organize/create-event" ||
              path.pathname === "/organize/manage-events"
            ) {
              setIsFormClosed(true);
            }
          }}
        >
          <X className=" text-black" />
        </button>
        <div className="text-black font-bold text-2xl  flex gap-3 items-center  mb-8">
          {path.pathname === "/organize/create-event" ||
          path.pathname === "/organize/manage-events" ? (
            <h1>Sign in to continue</h1>
          ) : (
            <h1>Sign in to Eventure</h1>
          )}

          <FaSignInAlt className="" />
        </div>
        <a href={apiClient.getGoogleOauthUrl(path.pathname)}>
          <button className="py-3 items-center flex mb-8 gap-2 justify-center font-medium border border-black/50 hover:border-black rounded-sm  hover:shadow hover:bg-black/5 text-black w-full">
            <img
              className="w-[22px] h-[22px]"
              src={`${import.meta.env.VITE_CLOUDINARY_ASSETS_URL}/google.webp`}
              alt=""
            />
            Continue with Google
          </button>
        </a>
        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <form
          action=""
          className="flex flex-col gap-4 text-black"
          onSubmit={onSubmit}
        >
          <label htmlFor="login_email">
            <h2 className="text-black/80">Email Address</h2>

            <input
              {...register("email", {
                required: "Email is required.",
              })}
              type="email"
              id="login_email"
              aria-label="email"
              autoComplete="email"
              className="p-2 border w-full rounded-sm border-gray-200 focus:outline-none"
            />
          </label>
          {errors.email && (
            <div className="text-primary text-sm -mt-1">
              {errors.email.message}
            </div>
          )}
          <label htmlFor="login_password">
            <h2 className="text-black/80">Password</h2>
            <input
              {...register("password", {
                required: "Password is required.",
              })}
              type="password"
              id="login_password"
              aria-label="password"
              autoComplete="password"
              className="p-2 border w-full rounded-sm border-gray-200 focus:outline-none"
            />
          </label>
          {errors.password && (
            <div className="text-primary text-sm -mt-1">
              {errors.password.message}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white text-lg flex justify-center items-center hover:shadow rounded-sm h-[60px] hover:bg-black/70"
          >
            {isLoading ? <Loader styles={"w-5 h-5"} /> : "Sign in"}
          </button>
          <p className="text-black/60 text-center">
            Don't have an account?&nbsp;
            <span
              className="underline underline-offset-4 cursor-pointer hover:text-black/90"
              onClick={() => {
                setIsLoginOpened(false);
                setIsRegisterOpened(true);
              }}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
