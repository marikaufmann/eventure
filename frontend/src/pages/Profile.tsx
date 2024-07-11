import { useMutation, useQuery, useQueryClient } from "react-query";
import * as apiClient from "@/api-client";
import { UserType } from "../../../backend/src/shared/types";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppContext } from "../hooks/use-app-context";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import "react-phone-number-input/style.css";
import { useForm } from "react-hook-form";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { EditFormData } from "../types";

const Profile = () => {
  const { isLoggedIn, setIsLoginOpened } = useAppContext();
  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [phoneEdit, setPhoneEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);

  const { data: user, refetch } = useQuery<UserType>(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  const queryClient = useQueryClient();

  const { mutate: logOut } = useMutation(apiClient.logout, {
    onError: (err: Error) => {
      toast({ description: err.message, variant: "destructive" });
    },
    onSuccess: async () => {
      navigate("/");
      await queryClient.invalidateQueries("validateSession");
    },
  });

  const { mutate: editUser } = useMutation(apiClient.editUserData, {
    onError: (err: Error) => {
      toast({ description: err.message, variant: "destructive" });
    },
    onSuccess: async () => {
      toast({
        description: "Your details updated successfully",
        variant: "default",
      });
      await refetch();
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      setIsLoginOpened(true);
    }
  }, [isLoggedIn, navigate, setIsLoginOpened]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<EditFormData>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone || "",
    },
  });

  const onSubmit = handleSubmit((formData: EditFormData) => {
    if (formData.phone === null) {
      formData.phone = "";
    }

    if (user?._id) {
      editUser({ formData, userId: user._id });
    }
  });

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("phone", user.phone || "");
    }
  }, [user, setValue]);

  return (
    <div className="bg-background w-full min-h-screen h-full flex flex-col text-black max-w-[1700px] mx-auto pb-32 pt-5 overflow-x-auto">
      <h1 className="text-5xl font-bold  md:px-5">Account</h1>
      <p className="text-gray-600 text-xl mt-2 font-light  md:px-5">
        Welcome back, {user?.firstName}
      </p>
      <div className="mt-16 flex flex-col shadow-2xl shadow-primary/10 pt-2  pb-12 rounded-lg  md:px-5 w-[1000px]">
        <div>
          <h2 className="text-3xl">Personal information</h2>
          <p className="text-gray-600 font-light">
            Verify your personal details.
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-10 mt-10 h-full">
          <div className="flex items-start gap-4 w-full">
            <div className="flex flex-col gap-2 sm:w-[600px] w-[440px] ">
              <h2 className="font-medium text-lg">Name</h2>
              <div className="flex gap-4 items-center">
                {user?.picture ? (
                  <div className="rounded-full bg-primary/20 w-14 h-14 items-center justify-center flex text-xl text-primary">
                    <img
                      src={user && user.picture}
                      alt="profile picture"
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <div className="rounded-full bg-primary/20 w-14 h-14 items-center justify-center flex  text-primary ">
                    <span className="text-3xl ">
                      {user?.firstName.slice(0, 1).toUpperCase()}
                    </span>
                  </div>
                )}
                <label htmlFor="edit_firstName" className="flex-1">
                  <input
                    {...register("firstName", {
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message: "First name can only contain letters.",
                      },
                    })}
                    type="text"
                    id="edit_firstName"
                    name="firstName"
                    autoComplete="given-name"
                    aria-label="first name"
                    defaultValue={user?.firstName}
                    placeholder={user?.firstName}
                    disabled={!nameEdit}
                    className={`${
                      nameEdit ? "border-primary/50" : "border-primary/20"
                    } border  w-full rounded-lg flex-1 px-2 h-[40px] focus:outline-primary`}
                  />
                  {errors.firstName && (
                    <div className="text-primary text-sm">
                      {errors.firstName.message}
                    </div>
                  )}
                </label>
                <label htmlFor="edit_lastName" className="flex-1 ">
                  <input
                    {...register("lastName", {
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message: "First name can only contain letters.",
                      },
                    })}
                    type="text"
                    id="edit_lastName"
                    name="lastName"
                    autoComplete="family-name"
                    aria-label="last name"
                    defaultValue={user?.lastName}
                    placeholder={user?.lastName}
                    disabled={!nameEdit}
                    className={`${
                      nameEdit ? "border-primary/50" : "border-primary/20"
                    } border  w-full rounded-lg flex-1 px-2 h-[40px] focus:outline-primary`}
                  />
                  {errors.lastName && (
                    <div className="text-primary text-sm">
                      {errors.lastName.message}
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="cursor-pointer">
              {nameEdit ? (
                <span
                  onClick={() => {
                    onSubmit();
                    setNameEdit((prev) => !prev);
                  }}
                  className="text-primary"
                >
                  Save changes
                </span>
              ) : (
                <span
                  onClick={() => {
                    setNameEdit((prev) => !prev);
                  }}
                  className="text-gray-700"
                >
                  Edit
                </span>
              )}
            </div>
          </div>
          <div className="flex items-start gap-4 w-full">
            <label
              htmlFor="edit_email"
              className="flex flex-col gap-2   sm:w-[600px] w-[440px]"
            >
              Email
              <input
                {...register("email")}
                type="email"
                id="edit_email"
                name="email"
                autoComplete="email"
                aria-label="email"
                defaultValue={user?.email}
                placeholder={user?.email}
                disabled={!emailEdit}
                className={`${
                  emailEdit ? "border-primary/50" : "border-primary/20"
                } border  w-full rounded-lg  px-2 h-[40px] focus:outline-primary`}
                style={{ height: "40px" }}
              />
              {errors.email && (
                <div className="text-primary text-sm">
                  {errors.email.message}
                </div>
              )}
            </label>
            <div className="cursor-pointer">
              {emailEdit ? (
                <span
                  onClick={() => {
                    onSubmit();
                    setEmailEdit((prev) => !prev);
                  }}
                  className="text-primary"
                >
                  Save changes
                </span>
              ) : (
                <span
                  onClick={() => setEmailEdit((prev) => !prev)}
                  className="text-gray-700"
                >
                  Edit
                </span>
              )}
            </div>
          </div>
          <div className="flex items-start gap-4 w-full">
            <label htmlFor="phone" className="flex flex-col gap-2 sm:w-[600px] w-[440px]">
              Phone
              <PhoneInputWithCountry
                control={control}
                defaultValue={user?.phone || ""}
                placeholder={user?.phone || ""}
                disabled={!phoneEdit}
                rules={{
                  validate: (val: string) => !val || isPossiblePhoneNumber(val),
                }}
                id="phone"
                name="phone"
                autoComplete="tel"
                aria-label="phone number"
                className={`${
                  phoneEdit ? "border-primary/50" : "border-primary/20"
                } border  w-full rounded-lg px-2 h-[40px] focus:outline-primary `}
              />
              {errors.phone && (
                <div className="text-primary text-sm">
                  {errors.phone.message}
                </div>
              )}
            </label>
            <div className="cursor-pointer">
              {phoneEdit ? (
                <span
                  onClick={() => {
                    onSubmit();
                    setPhoneEdit((prev) => !prev);
                  }}
                  className="text-primary"
                >
                  {" "}
                  Save changes
                </span>
              ) : (
                <span
                  onClick={() => setPhoneEdit((prev) => !prev)}
                  className="text-gray-700"
                >
                  {user?.phone ? "Edit" : "Add"}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-start gap-4 w-full ">
            <label
              htmlFor="edit_password"
              className="flex flex-col  gap-2 sm:w-[600px] w-[440px]"
            >
              Password
              <input
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 30,
                    message:
                      "Password is too long - must be 30 characters or less",
                  },
                })}
                type="password"
                id="edit_password"
                name="password"
                autoComplete="new-password"
                aria-label="password"
                disabled={!passwordEdit}
                className={`${
                  passwordEdit ? "border-primary/50" : "border-primary/20"
                } border  w-full rounded-lg px-2 h-[40px] focus:outline-primary `}
                placeholder={"••••••••••••••••••"}
              />
              {errors.password && (
                <div className="text-primary text-sm">
                  {errors.password.message}
                </div>
              )}
            </label>
            <div className="cursor-pointer">
              {passwordEdit ? (
                <span
                  onClick={() => {
                    onSubmit();
                    setPasswordEdit((prev) => !prev);
                  }}
                  className="text-primary"
                >
                  {" "}
                  Save changes
                </span>
              ) : (
                <span
                  onClick={() => setPasswordEdit((prev) => !prev)}
                  className="text-gray-700"
                >
                  Update
                </span>
              )}
            </div>
          </div>
        </form>
        <button
          onClick={() => logOut()}
          className="flex gap-3 items-center bg-black text-white font-medium rounded-lg py-2 px-6 justify-center w-[170px] hover:bg-black/80 shadow-lg mt-16 hover:shadow-xl"
        >
          <LogOut className="rotate-180 h-5 w-5 " /> Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;
