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
      <SignLayout width="60rem" navLink="/signup" navTitle="Create account !">
        <Typography
          title="Enter your e-mail address and we will send you a link to reset your password"
          fontSize="2rem"
        />

        <form className="form__email" onSubmit={handleSubmit}>
          <Input
            label="enter your email"
            placeholder="email"
            name="email"
            handleChange={(e) => handleEmail(e.target.value)}
            defaultValue={email}
            error={errors.email}
          />
          <Button
            title="Send"
            width="100%"
            disabled={loading || (called && !error) || !email}
          />
        </form>
      </SignLayout>

      <style jsx>{`
      .form__email{
      padding : 0 3rem;
      margin: 2rem  0rem;
    }
      .
    `}</style>
    </>
  );
};

export default ForgetPassword;

export const getServerSideProps = (ctx) => unProtectedPage(ctx);
