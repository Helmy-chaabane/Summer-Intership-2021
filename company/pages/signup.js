import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { NotificationContext } from "../context/notificationContext";
import Button from "../components/button/Button";
import Typography from "../components/typography/Typography";
import Input from "../components/input/Input";
import SignLayout from "../layout/SignLayout";
import CheckBox from "../components/checkbox/CheckBox";
import SignSatus from "../constants/signStatus";
import { signupValidation } from "../validations/userValidations";
import { SIGNUP } from "../apollo/Mutations/userMutations";
import { ErrorNotification } from "../utils/notifications";
import { unProtectedPage } from "../utils/auth";

const Singup = () => {
  const router = useRouter();
  const { setNotification } = useContext(NotificationContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [signup, { loading, called, error }] = useMutation(SIGNUP, {
    onCompleted: () => {
      router.push({
        pathname: "/signinfo",
        query: { page: SignSatus.signUpCompleted },
      });
    },
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const handleUser = (name, value) => {
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    const errors = signupValidation(user);
    if (!errors.valid) return setErrors(errors);
    const newUser = { ...user };
    delete newUser.terms;
    delete newUser.confirmPassword;
    signup({ variables: { ...newUser, isAdmin: true } });
  };

  return (
    <>
      <SignLayout
        title="Welcome"
        width="75%"
        navLink="/login"
        navTitle="Alreadry have account !"
      >
        <Typography title="Sign up" fontSize="4rem" />
        <form className="login__form" onSubmit={handleSumbit}>
          <Input
            name="name"
            placeholder="fullname"
            label="fullname"
            type="text"
            error={errors.name}
            defaultValue={user.name}
            handleChange={(e) => handleUser("name", e.target.value)}
            required
            autoFocus
          />
          <Input
            name="email"
            placeholder="email"
            label="email"
            type="text"
            error={errors.email}
            defaultValue={user.email}
            handleChange={(e) => handleUser("email", e.target.value)}
            required
          />
          <div className="login__form__group">
            <Input
              name="password"
              placeholder="password"
              label="password"
              type="password"
              width="30rem"
              error={errors.password}
              defaultValue={user.password}
              handleChange={(e) => handleUser("password", e.target.value)}
              required
              autoComplete="off"
            />
            <Input
              name="confirm password"
              placeholder="confirm password"
              label="confirm password"
              type="password"
              width="30rem"
              error={errors.confirmPassword}
              defaultValue={user.confirmPassword}
              handleChange={(e) =>
                handleUser("confirmPassword", e.target.value)
              }
              required
              autoComplete="off"
            />
          </div>

          <CheckBox
            title="Do you accept our terms!"
            id="terms"
            name="terms"
            handleCheck={(e) => handleUser("terms", e.target.checked)}
            error={errors.terms}
            defaultValue={user.terms}
          />
          <div className="login__btn">
            <Button
              title="Sign up"
              width="100%"
              disabled={loading || (called && !error)}
            />
          </div>
        </form>
      </SignLayout>

      <style jsx>{`
        .login__form__group {
          display: flex;
          justify-content: space-between;
          align-items: start;
        }

        .login__btn {
          margin-top: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default Singup;

export const getServerSideProps = (ctx) => unProtectedPage(ctx);
