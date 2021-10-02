import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { NotificationContext } from "../context/notificationContext";
import Button from "../components/button/Button";
import Input from "../components/input/Input";
import Typography from "../components/typography/Typography";
import SignLayout from "../layout/SignLayout";
import SignSatus from "../constants/signStatus";
import { resetPassswordValidation } from "../validations/userValidations";
import { RESET_PASSWORD } from "../apollo/Mutations/userMutations";
import { ErrorNotification } from "../utils/notifications";

const ResetPassword = ({ token }) => {
  const router = useRouter();
  const { setNotification } = useContext(NotificationContext);
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [reset, { loading, called, error }] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      router.push({
        pathname: "/signinfo",
        query: { page: SignSatus.passwordValidation },
      });
    },

    onError: (error) => ErrorNotification(setNotification, error),
  });

  const handlePasswords = (name, value) => {
    setPasswords({ ...passwords, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = resetPassswordValidation(passwords);
    if (!errors.valid) return setErrors(errors);
    reset({
      variables: {
        token,
        password: passwords.password,
      },
    });
  };

  return (
    <>
      <SignLayout
        width="50rem"
        navLink="/login"
        navTitle="Login"
        success={called && !error}
        successMessage="Password has been changed successfully!"
      >
        <Typography title="Reset Password" />
        <form className="form__passwords" onSubmit={handleSubmit}>
          <Input
            label="New password"
            placeholder="password"
            name="password"
            type="password"
            handleChange={(e) => handlePasswords("password", e.target.value)}
            defaultValue={passwords.password}
            error={errors.password}
          />
          <Input
            label="confirm password"
            placeholder="confirmPassword"
            name="confirmPassword"
            type="password"
            handleChange={(e) =>
              handlePasswords("confirmPassword", e.target.value)
            }
            defaultValue={passwords.confirmPassword}
            error={errors.confirmPassword}
          />
          <Button
            title="Confirm"
            width="100%"
            disabled={loading || (called && !error)}
          />
        </form>
      </SignLayout>

      <style jsx>{`
        .form__passwords {
          margin-top: 4rem;
        }
      `}</style>
    </>
  );
};

export default ResetPassword;

export async function getServerSideProps({ query }) {
  const { token } = query;

  if (!token) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
}
