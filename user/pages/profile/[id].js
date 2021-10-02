import { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { NotificationContext } from "../../context/notificationContext";
import { UserContext } from "../../context/userContext";
import Main from "../../layout/Main";
import { Grid, GridItem } from "../../components/grid";
import ProfileImage from "../../components/profile/ProfileImage";
import ProfileInfo from "../../components/profile/ProfileInfo";
import Edit from "../../components/profile/EditProfle";
import Post from "../../components/post/Post";
import Typography from "../../components/typography/Typography";
import Loading from "../../components/loading/Loading";
import Button from "../../components/button/Button";
import Popup from "../../components/popup/Popup";
import { USER_POSTS } from "../../apollo/Queries/postQueries";
import { protectedPage } from "../../utils/auth";
import { ErrorNotification } from "../../utils/notifications";

const Profile = ({ id }) => {
  const { user, setUser } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const [showPop, setShowPop] = useState(false);
  const { data, loading } = useQuery(USER_POSTS, {
    skip: !id,
    variables: { user: id },
    onError: (error) => ErrorNotification(setNotification, error),
  });

  return !loading && data ? (
    <>
      <Main title="Profile" icon="users">
        <div className="profile">
          <Grid padding=" 2rem 1rem" minWidth="65%" rowGap={20}>
            {
              <GridItem
                shadow
                padding="2rem 4rem"
                position="sticky"
                top={5}
                zIndex={4}
                overflow="auto"
              >
                <ProfileImage
                  user={data.userPosts.user}
                  currentUser={user}
                  setUser={setUser}
                  setNotification={setNotification}
                />
              </GridItem>
            }
            <Typography
              title="Posts"
              fontSize="1.7rem"
              borderBottom="1px solid gray"
            />

            {data.userPosts.posts.length ? (
              data.userPosts.posts.map((post) => (
                <GridItem shadow padding={20} key={post._id}>
                  <Post post={post} />
                </GridItem>
              ))
            ) : (
              <Typography
                title="You didn't post yet in any group"
                fontSize="1.6rem"
              />
            )}
          </Grid>
          <Grid padding=" 2rem 1rem" minWidth="35%">
            <GridItem
              padding="2rem"
              shadow
              display="flex"
              flexDirection="column"
            >
              <Typography
                title="Info"
                color="gray"
                fontSize="2rem"
                margin={0}
              />
              {data.userPosts.user && (
                <ProfileInfo user={data.userPosts.user} />
              )}
              {user?._id === data.userPosts.user?._id && (
                <div>
                  <Button
                    title="Edit profile"
                    icon="edit"
                    width="20rem"
                    float="right"
                    handleClick={() => setShowPop(true)}
                  />
                </div>
              )}
            </GridItem>
          </Grid>
        </div>
        <Popup
          show={showPop}
          title="Edit Profile"
          handleShow={() => setShowPop(false)}
        >
          {data.userPosts.user && (
            <Edit
              user={data.userPosts.user}
              setNotification={setNotification}
              setShowPop={setShowPop}
            />
          )}
        </Popup>
      </Main>
      <style jsx>{`
        .profile {
          display: flex;
          align-items: flex-start;
        }
      `}</style>
    </>
  ) : (
    <Loading loadingPage text="Loading user" font={1.5} />
  );
};

export default Profile;

export const getServerSideProps = (ctx) => protectedPage(ctx);
