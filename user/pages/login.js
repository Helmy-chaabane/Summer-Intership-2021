import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { UserContext } from "../context/userContext";
import { NotificationContext } from "../context/notificationContext";
import Cookies from "js-cookie";
import SignLayout from "../layout/SignLayout";
import Button from "../components/button/Button";
import Typography from "../components/typography/Typography";
import Input from "../components/input/Input";
import Navigate from "../components/navigate/Navigate";
import { LOGIN } from "../apollo/Mutations/userMutations";
import { loginValidation } from "../validations/userValidations";
import { ErrorNotification } from "../utils/notifications";
import { unProtectedPage } from "../utils/auth";

const Login = () => {
  const router = useRouter();
  const { setUser: set } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: ({ login }) => {
      const { user, token } = login;
      if (!user.isAdmin) {
        set(user);
        Cookies.set("token", token);
        router.push("/");
      } else {
        ErrorNotification(
          setNotification,
          new Error("Only normal users can access this platform")
        );
      }
    },
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const handleUser = (name, value) => {
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    const errors = loginValidation(user);
    if (!errors.valid) return setErrors(errors);
    login({ variables: { ...user } });
  };

  return (
    <>
      <SignLayout title="Welcome" width="65%">
        <Typography title="Sign in" fontSize="4rem" />
        <form className="login__form" onSubmit={handleSumbit}>
          <Input
            fontSize={1.6}
            name="email"
            placeholder="email"
            label="email"
            type="text"
            error={errors.email}
            defaultValue={user.email}
            handleChange={(e) => handleUser("email", e.target.value)}
            autoFocus
            required
          />
          <Input
            name="password"
            placeholder="password"
            label="password"
            fontSize={1.6}
            type="password"
            error={errors.password}
            handleChange={(e) => handleUser("password", e.target.value)}
            defaultValue={user.password}
            required
            autoComplete="off"
          />
          <Navigate
            title="Forget your password ?"
            to="/forgetpassword"
            margin="2rem 0"
          />
          <div className="login__btn">
            <Button title="Log in" width="100%" disabled={loading} />
          </div>
        </form>
      </SignLayout>

      <style jsx>{`
        .login__form {
          padding: 1rem 3rem;
        }
        .login__form__group {
          display: flex;
          justify-content: space-between;
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

export default Login;

export const getServerSideProps = (ctx) => unProtectedPage(ctx);
