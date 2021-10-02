import nextCookie from "next-cookies";

export const protectedPage = (ctx) => {
  const { token } = nextCookie(ctx);

  if (!token) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  if (ctx.params?.id) return { props: { id: ctx.params.id } };
  return { props: {} };
};

export const unProtectedPage = (ctx) => {
  const { token } = nextCookie(ctx);
  if (token) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
