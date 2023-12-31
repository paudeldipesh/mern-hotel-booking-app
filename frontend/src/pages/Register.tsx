import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../utils/apiClient";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const { mutate } = useMutation(apiClient.register, {
    onSuccess: () => {
      console.log("registration successful");
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1 capitalize">
          first name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required." })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1 capitalize">
          last name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required." })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>

      <label className="text-gray-700 text-sm font-bold flex-1 capitalize">
        email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          autoComplete="off"
          {...register("email", { required: "This field is required." })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1 capitalize">
        password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          autoComplete="off"
          {...register("password", {
            required: "This field is required.",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1 capitalize">
        confirm password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          autoComplete="off"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required.";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded capitalize"
        >
          create account
        </button>
      </span>
    </form>
  );
}
