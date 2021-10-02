const invitationResolver = {
  user(parent, args, { User }, info) {
    return User.findById(parent.user);
  },
};

export default invitationResolver;
