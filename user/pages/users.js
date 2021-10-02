import { Fragment, useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { NotificationContext } from "../context/notificationContext";
import Main from "../layout/Main";
import Loading from "../components/loading/Loading";
import Input from "../components/input/Input";
import Avatar from "../components/avatar/Avatar";
import { Table, TableItem, TableContainer } from "../components/table";
import { USERS } from "../apollo/Queries/userQueries";
import { ErrorNotification } from "../utils/notifications";
import { formatDates } from "../utils/dates";
import { useRouter } from "next/router";

const Users = () => {
  const router = useRouter();
  const { setNotification } = useContext(NotificationContext);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const { data, loading } = useQuery(USERS, {
    variables: { verified: true },
    onCompleted: ({ users }) => setUsers(users),
    onError: (error) => ErrorNotification(setNotification, error),
  });

  useEffect(() => {
    if (data) {
      setUsers(
        data.users.filter(
          (user) =>
            user.name.toLowerCase().startsWith(search.toLowerCase()) ||
            user.email.toLowerCase().startsWith(search.toLowerCase())
        )
      );
    } else setUsers([]);
  }, [search, data]);

  const titles = ["Name", "Email", "Join date"];

  return !loading && data ? (
    <>
      <Main>
        <Input
          width="25%"
          label="Search"
          placeholder="search"
          name="search"
          type="text"
          float="right"
          handleChange={(e) => setSearch(e.target.value)}
        />
        <Table titles={titles}>
          {users.map(({ _id, imageUrl, name, date, email }) => (
            <TableContainer clickable key={_id}>
              <TableItem handleClick={() => router.push("/profile/" + _id)}>
                <Avatar
                  img={imageUrl}
                  title={name}
                  radius={50}
                  fontTitle="1.4rem"
                  color="#000"
                />
              </TableItem>
              <TableItem handleClick={() => router.push("/profile/" + _id)}>
                {email}
              </TableItem>
              <TableItem handleClick={() => router.push("/profile/" + _id)}>
                {formatDates(date)}
              </TableItem>
            </TableContainer>
          ))}
        </Table>
      </Main>
      <style jsx>{`
        .members__request {
          display: flex;
          align-items: center;
        }

        .member__request {
          flex: 1;
          background: #fff;
          text-align: center;
          padding: 1.5rem 0rem;
          font-size: 1.7rem;
          cursor: pointer;
          font-weight: 500;
        }
        .member__request:not(:last-child) {
          border-right: 1px solid rgba(0, 0, 0, 0.2);
          border-top-right-radius: 10px;
        }
      `}</style>
    </>
  ) : (
    <Loading text="Loading members" loadingPage font={1.5} />
  );
};

export default Users;
