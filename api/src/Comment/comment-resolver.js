const commentResolver = {
  user(parent, args, { User, message }, info) {
    return User.findById(parent.user);
  },
  post(parent, args, { Post }, info) {
    return Post.findById(parent.post);
  },
};

export default commentResolver;
