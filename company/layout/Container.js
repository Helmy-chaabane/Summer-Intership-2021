const Container = ({ children, ...rest }) => {
  return (
    <>
      <div className="container" style={{ ...rest }}>
        {children}
      </div>
      <style jsx>{`
        .container {
          min-height: 100vh;
          max-width: 100vw;
        }
      `}</style>
    </>
  );
};

export default Container;
