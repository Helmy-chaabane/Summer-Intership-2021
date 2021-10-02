import Container from "./Container";
import Typography from "../components/typography/Typography";
import Navigate from "../components/navigate/Navigate";

const SignLayout = ({ title, width, navTitle, navLink, children }) => {
  return (
    <>
      <Container display="flex" justifyContent="center" alignItems="center">
        <div className="sign__container">
          {title && (
            <Typography title={title} fontSize="6.5rem" marginRight="4rem" />
          )}
          <div className="sign__wrapper">
            {children}
            {navLink && navTitle && (
              <div className="sign__link">
                <Navigate title={navTitle} to={navLink} />
              </div>
            )}
          </div>
        </div>
      </Container>
      <style jsx>{`
        .sign__container {
          width: ${width};
          display: flex;
          align-items: center;
        }
        .sign__wrapper {
          flex: 1;
          box-shadow: 0 0.6rem 2rem 0 rgba(0, 0, 0, 0.4);
          border-radius: 2rem;
          overflow: hidden;
          padding: 2rem;
        }

        .sign__link {
          justify-self: flex-end;
          margin-top: 2.5rem;
          float: right;
        }
      `}</style>
    </>
  );
};

export default SignLayout;
