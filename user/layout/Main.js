import Container from "./Container";
import Header from "../components/header/Header";

const Main = ({ children, ...rest }) => {
  return (
    <>
      <Container position="relative">
        <Header />
        <main className="main" style={{ ...rest }}>
          {children}
        </main>
      </Container>
      <style jsx>
        {`
          .main {
            min-height: calc(100vh - 5rem);
            padding: 2.5rem 6rem;
          }
        `}
      </style>
    </>
  );
};

export default Main;
