import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { NotificationContext } from "../context/notificationContext";
import Button from "../components/button/Button";
import Input from "../components/input/Input";
import Typography from "../components/typography/Typography";
import SignLayout from "../layout/SignLayout";
import SignSatus from "../constants/signStatus";
import { forgetPassswordValidation } from "../validations/userValidations";
import { FORGET_PASSWORD } from "../apollo/Mutations/userMutations";
import { unProtectedPage } from "../utils/auth";
import { ErrorNotification } from "../utils/notifications";

const ForgetPassword = () => {
  const router = useRouter();
  const { setNotification } = useContext(NotificationContext);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [forget, { loading, called, error }] = useMutation(FORGET_PASSWORD, {
    onCompleted: () => {
      router.push({
        pathname: "/signinfo",
        query: { page: SignSatus.forgetPassword },
      });
    },

    onError: (error) => ErrorNotification(setNotification, error),
  });
  const handleEmail = (email) => {
    setEmail(email);
    setErrors({ email: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = forgetPassswordValidation(email);
    if (!errors.valid) return setErrors(errors);
    forget({ variables: { email } });
  };
  return (
    <>
      <SignLayout width="60rem" navLink="/login" navTitle="Sign in">
        <Typography title="Forget your password ?" fontSize="3rem" />

        <form className="form__email" onSubmit={handleSubmit}>
          <Input
            label="enter your email"
            placeholder="email"
            name="email"
            handleChange={(e) => handleEmail(e.target.value)}
            defaultValue={email}
            error={errors.email}
            fontSize={1.7}
          />
          <Button
            title="Send"
            width="100%"
            marginTop="1rem"
            disabled={loading || (called && !error) || !email}
          />
        </form>
      </SignLayout>

      <style jsx>{`
      .form__email{
      padding : 0 1rem;
      margin: 2rem  0rem 1rem 0;
    }
      .
    `}</style>
    </>
  );
};

export default ForgetPassword;

export const getServerSideProps = (ctx) => unProtectedPage(ctx);
