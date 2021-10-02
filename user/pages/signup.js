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

const Singup = ({ owned }) => {
  const router = useRouter();
  const { setNotification } = useContext(NotificationContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    phone: "",
    owned,
  });

  console.log("owned", owned);
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
    signup({ variables: { ...newUser } });
  };

  return (
    <>
      <SignLayout
        title="Welcome"
        width="70%"
        navLink="/login"
        navTitle="Alreadry have account !"
      >
        <Typography title="Sign up" fontSize="4rem" />
        <form className="login__form" onSubmit={handleSumbit}>
          <div className="login__form__group">
            <Input
              name="name"
              placeholder="fullname"
              label="fullname"
              type="text"
              fontSize={1.6}
              error={errors.name}
              defaultValue={user.name}
              handleChange={(e) => handleUser("name", e.target.value)}
              required
              autoFocus
              width="30rem"
            />
            <Input
              name="phone"
              placeholder="phone"
              label="Phone Number"
              type="text"
              fontSize={1.6}
              error={errors.phone}
              defaultValue={user.phone}
              handleChange={(e) => handleUser("phone", e.target.value)}
              required
              width="30rem"
            />
          </div>
          <Input
            name="email"
            placeholder="email"
            label="email"
            fontSize={1.6}
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
              fontSize={1.6}
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
              fontSize={1.6}
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
            title="By checking this you agree on the privacy policy, terms, conditions and the notifications settings!"
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
          margin-bottom: 1rem;
        }

        .login__btn {
          margin-top: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default Singup;

export async function getServerSideProps(ctx) {
  unProtectedPage(ctx);
  const { owned } = ctx.query;

  if (!owned) {
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
      owned,
    },
  };
}
