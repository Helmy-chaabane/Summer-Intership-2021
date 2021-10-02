import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { UserContext } from "../context/userContext";
import { NotificationContext } from "../context/notificationContext";
import Image from "next/image";
import { Grid, GridItem } from "../components/grid";
import Main from "../layout/Main";
import Loading from "../components/loading/Loading";
import Post from "../components/post/Post";
import Typography from "../components/typography/Typography";
import { FEEDS } from "../apollo/Queries/postQueries";
import { protectedPage } from "../utils/auth";
import { ErrorNotification } from "../utils/notifications";

const Home = () => {
  const { user } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const router = useRouter();
  const { data, loading } = useQuery(FEEDS, {
    skip: !user,
    fetchPolicy: "cache-first",
    pollInterval: 2500,
    onError: (error) => ErrorNotification(setNotification, error),
  });

  return !loading && data ? (
    <>
      <Main title="News Feed" icon="feed">
        <div className="feed">
          <Grid minWidth="70%" padding={5}>
            {data && data.posts.length ? (
              data.posts.map((post) => (
                <GridItem shadow padding={20} key={post._id}>
                  <Post post={post} />
                </GridItem>
              ))
            ) : (
              <Typography title="No Posts yet" fontSize="1.6rem" />
            )}
          </Grid>
          <Grid padding={5} minWidth="30%">
            <GridItem shadow padding="2rem">
              <Typography title="My Groups" fontSize="2rem" />
              <ul className="group__list">
                {user?.groups.map(({ group, _id }) => (
                  <li
                    className="group__item"
                    key={_id}
                    onClick={() => router.push("/groups/" + group._id)}
                  >
                    <Image
                      src={group.imageUrl || "/group.png"}
                      width={50}
                      height={50}
                      alt="group images"
                    />
                    <Typography
                      title={group.title}
                      fontSize="1.6rem"
                      flex="1"
                    />
                    <span className="item__mem">{group.members} members</span>
                  </li>
                ))}
              </ul>
            </GridItem>
          </Grid>
        </div>
      </Main>

      <style jsx>{`
        .feed {
          display: flex;
          align-items: flex-start;
        }
        .group__list {
          list-style: none;
          max-height: 50rem;
          overflow: auto;
        }

        .group__item {
          display: flex;
          align-items: center;
          margin-top: 1.6rem;
          cursor: pointer;
        }
        .item__mem {
          color: gray;
          font-size: 1.4rem;
        }
      `}</style>
    </>
  ) : (
    <Loading loadingPage text="Loading posts" font={1.5} />
  );
};

export default Home;

export const getServerSideProps = (ctx) => protectedPage(ctx);
