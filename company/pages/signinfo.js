import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import Loading from "../components/loading/Loading";
import Typography from "../components/typography/Typography";
import SignLayout from "../layout/SignLayout";
import SignStatus from "../constants/signStatus";
import { ACCOUNT_VALIDATION } from "../apollo/Mutations/userMutations";
//import { unProtectedPage } from "../utils/auth";

const SignInfo = ({ token, title, navLink, navTitle, color }) => {
  const [accountValidation, { data }] = useMutation(ACCOUNT_VALIDATION);

  useEffect(() => {
    if (token) accountValidation({ variables: { token } });
  }, [token, accountValidation]);

  return !token || data ? (
    <SignLayout navTitle={navTitle} navLink={navLink}>
      <Typography
        title={data?.verifyAccount || title}
        color={color}
        fontSize="2rem"
      />
    </SignLayout>
  ) : (
    <Loading loadingPage font={1.5} text="Loading" />
  );
};

export default SignInfo;
export async function getServerSideProps(ctx) {
  //  unProtectedPage(ctx);
  const { token, page } = ctx.query;
  let title = "";
  let navTitle = "";
  let navLink = "";
  let color = "green";
  switch (page) {
    case SignStatus.signUpCompleted:
      title =
        "Thank you for signing up, we sent you an email so you can verify your account";
      break;

    case SignStatus.signUpVerification:
      title =
        "thank you for verifying you account, you can access your account now";
      navTitle = "login";
      navLink = "/login";
      break;

    case SignStatus.forgetPassword:
      title = "We sent you an email to reset your password";
      break;
    case SignStatus.passwordValidation:
      title = "Your password has been updated";
      navTitle = "login";
      navLink = "/login";
      break;
    default:
      title = "Error";
      navTitle = "login";
      navLink = "/login";
      color = "red";
  }

  return {
    props: {
      token: token ? token : "",
      title,
      navTitle,
      navLink,
      color,
    },
  };
}
