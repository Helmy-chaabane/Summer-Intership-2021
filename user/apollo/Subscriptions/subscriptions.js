export const handleCommentSubscriptions = (cache, subData, id) => {
  const { data, status } = subData.commentChanged;
  const __ref = `Comment:${data._id}`;
  if (status === "DELETE") {
    cache.evict({ id: __ref });
    cache.gc();
  }
  cache.modify({
    id: cache.identify({ __ref: `Post:${id}` }),
    broadcast: true,
    fields: {
      comments(existingComments, { readField }) {
        return status === "ADD"
          ? [...existingComments, { __ref }]
          : existingComments.filter(
              (comment) => readField("_id", comment) !== data._id
            );
      },
      numberOfComments(existingNumber) {
        return status === "ADD" ? existingNumber + 1 : existingNumber - 1;
      },
    },
  });
};

export const handlePostSubscriptions = (cache, subData, id) => {
  const { data, status } = subData.postChanged;
  const __ref = `Post:${data._id}`;
  if (status === "DELETE") {
    cache.evict({ id: __ref });
    cache.gc();
  }
  cache.modify({
    id: cache.identify({ __ref: `Group:${id}` }),
    broadcast: true,
    fields: {
      posts(existingPosts, { readField }) {
        return status === "ADD"
          ? [{ __ref }, ...existingPosts]
          : existingPosts.filter((post) => readField("_id", post) !== data._id);
      },
      postNumbers(existingNumber) {
        return status === "ADD" ? existingNumber + 1 : existingNumber - 1;
      },
    },
  });
};
