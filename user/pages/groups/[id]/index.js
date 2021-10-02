import { useContext } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { NotificationContext } from "../../../context/notificationContext";
import Loading from "../../../components/loading/Loading";
import Main from "../../../layout/Main";
import { Grid, GridItem } from "../../../components/grid";
import Typography from "../../../components/typography/Typography";
import PostInput from "../../../components/post/PostInput";
import Post from "../../../components/post/Post";
import GroupInfos from "../../../components/group/GroupInfos";
import { GROUP } from "../../../apollo/Queries/groupQueries";
import { DELETE_POST } from "../../../apollo/Mutations/postMutations";
import { POST_SUBSCRIPTION } from "../../../apollo/Subscriptions/postSub";
import { handlePostSubscriptions } from "../../../apollo/Subscriptions/subscriptions";
import { protectedPage } from "../../../utils/auth";
import { ErrorNotification } from "../../../utils/notifications";
import { UserContext } from "../../../context/userContext";

const Group = ({ id }) => {
  const { user } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  useSubscription(POST_SUBSCRIPTION, {
    variables: { groupId: id },
    onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) =>
      handlePostSubscriptions(cache, data, id),
    fetchPolicy: "no-cache",
    shouldResubscribe: false,
  });

  const { data, loading } = useQuery(GROUP, {
    variables: { _id: id, user: user?._id },
    skip: !id || !user,
    onError: (error) => ErrorNotification(setNotification, error),
    fetchPolicy: "network-only",
  });

  const [deletePost] = useMutation(DELETE_POST, {
    onError: (error) => ErrorNotification(setNotification, error, 2500),
    fetchPolicy: "no-cache",
  });

  const handleDeletePost = (_id) => {
    deletePost({
      variables: {
        _id,
      },
    });
  };

  return !loading && data ? (
    <>
      <Main title={`Groups/${data.group.title}`}>
        <div className="group">
          <div className="group__posts">
            <Grid rowGap={25} padding={10} scrollable position="relative">
              <GridItem shadow padding="2rem 4rem" overflow="auto">
                <PostInput groupId={data.group._id} />
              </GridItem>

              {data.group.posts.length ? (
                data.group.posts.map((post) => (
                  <GridItem shadow padding={20} key={post._id}>
                    <Post
                      handleDelete={() => handleDeletePost(post._id)}
                      post={post}
                      groupDisplay
                      role={data?.group.users[0].role}
                    />
                  </GridItem>
                ))
              ) : (
                <Typography
                  title="No posts yet in this group, be the first one :)"
                  fontSize="1.7rem"
                />
              )}
            </Grid>
          </div>
          <div className="group__details">
            <Grid rowGap={20} padding="1rem" zIndex={1} minWidth="100%">
              <GroupInfos
                id={data.group._id}
                img={data.group.imageUrl}
                members={data.group.members}
                pending={data.group.pending}
                postNumbers={data.group.postNumbers}
                privacy={data.group.privacy}
                key={data.group._id}
                title={data.group.title}
                description={data.group.description}
                role={data.group.users[0].role}
              />
            </Grid>
          </div>
        </div>
      </Main>
      <style jsx>
        {`
          .group {
            display: flex;
            margin-top: 2rem;
          }

          .group__posts {
            flex: 1;
          }

          .group__details {
            flex: 0 0 30%;
          }
        `}
      </style>
    </>
  ) : (
    <Loading text="Loading Groups" loadingPage font={2} />
  );
};

export default Group;

export const getServerSideProps = (ctx) => protectedPage(ctx);
