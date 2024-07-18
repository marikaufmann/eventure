import { RegisterFormData } from "../types";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";

import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "@/api-client";
import { useToast } from "./ui/use-toast";
import Loader from "./Loader";
import { useAppContext } from "@/hooks/use-app-context";
import { useLocation } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
const Register = () => {
  const { setIsLoginOpened, setIsRegisterOpened, setIsFormClosed } =
    useAppContext();
  const path = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<RegisterFormData>();
  const { mutate: registerUser, isLoading } = useMutation(apiClient.register, {
    onError: (err: Error) => {
      toast({ description: err.message, variant: "destructive" });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateSession");
      setIsRegisterOpened(false);
    },
  });
  const onSubmit = handleSubmit((data: RegisterFormData) => {
    registerUser(data);
  });
  return (
    <div className="inset-0 fixed bg-black/50 z-[90] flex items-center justify-center max-xsm:px-4">
      <div className="rounded-sm bg-white max-w-md w-full h-fit px-6 py-12 flex flex-col relative shadow-2xl">
        <button
          className="absolute top-6 right-6 rounded-full bg-gray-100 shadow-2xl p-1 hover:bg-gray-200"
          onClick={() => {
            setIsRegisterOpened(false);
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
        <div className="text-black font-bold text-2xl mb-10 flex gap-3 items-center">
          {path.pathname === "/organize/create-event" ||
          path.pathname === "/organize/manage-events" ? (
            <h1>Sign up to continue</h1>
          ) : (
            <h1>Sign up to Eventure</h1>
          )}

          <FaSignInAlt className="" />
        </div>

        <form
          action=""
          className="flex flex-col gap-4 text-black"
          onSubmit={onSubmit}
        >
          <label htmlFor="register_firstName">
            <h2 className="text-black/80">First Name</h2>
            <input
              {...register("firstName", {
                required: "First name is required.",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "First name can only contain letters.",
                },
              })}
              type="text"
              id="register_firstName"
              autoComplete="given-name"
              aria-label="first name"
              className="p-2 border w-full rounded-sm border-gray-200 focus:outline-none"
            />
          </label>
          {errors.firstName && (
            <div className="text-primary text-sm -mt-1">
              {errors.firstName.message}
            </div>
          )}
          <label htmlFor="register_lastName">
            <h2 className="text-black/80">Last Name</h2>

            <input
              {...register("lastName", {
                required: "Last name is required.",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Last name can only contain letters.",
                },
              })}
              type="text"
              id="register_lastName"
              autoComplete="family-name"
              aria-label="last name"
              className="p-2 border w-full rounded-sm border-gray-200 focus:outline-none"
            />
          </label>
          {errors.lastName && (
            <div className="text-primary text-sm -mt-1">
              {errors.lastName.message}
            </div>
          )}
          <label htmlFor="register_email">
            <h2 className="text-black/80">Email Address</h2>

            <input
              {...register("email", {
                required: "Email is required.",
              })}
              type="email"
              id="register_email"
              autoComplete="email"
              aria-label="email"
              className="p-2 border w-full rounded-sm border-gray-200 focus:outline-none"
            />
          </label>
          {errors.email && (
            <div className="text-primary text-sm -mt-1">
              {errors.email.message}
            </div>
          )}
          <label htmlFor="register_password">
            <h2 className="text-black/80">Password</h2>

            <input
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              id="register_password"
              autoComplete="new-password"
              aria-label="password"
              className="p-2 border w-full rounded-sm border-gray-200 focus:outline-none"
            />
          </label>
          {errors.password && (
            <div className="text-primary text-sm -mt-1">
              {errors.password.message}
            </div>
          )}
          <label htmlFor="register_confirmPassword">
            <h2 className="text-black/80">Confirm Password</h2>

            <input
              {...register("confirmPassword", {
                required: "This field is required.",
                validate: (val) => {
                  if (!val) {
                    return "This field is required";
                  } else if (val !== watch("password")) {
                    return "Passwords don't match.";
                  }
                },
              })}
              type="password"
              id="register_confirmPassword"
              aria-label="confirm password"
              className="p-2 border w-full rounded-sm border-gray-200 focus:outline-none"
            />
          </label>
          {errors.confirmPassword && (
            <div className="text-primary text-sm -mt-1">
              {errors.confirmPassword.message}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white rounded-sm h-[60px] flex justify-center items-center hover:bg-black/70 text-lg"
          >
            {isLoading ? <Loader styles={"w-5 h-5"} /> : "Sign up"}
          </button>
          <p className="text-black/60 text-center">
            Already have an account?&nbsp;
            <span
              className="underline underline-offset-4 cursor-pointer hover:text-black/90"
              onClick={() => {
                setIsRegisterOpened(false);
                setIsLoginOpened(true);
              }}
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
