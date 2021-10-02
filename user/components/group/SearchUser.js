import { useQuery } from "@apollo/client";
import { useState } from "react";
import Input from "../input/Input";
import { USERS } from "../../apollo/Queries/userQueries";
import StyleSheet from "./group.module.scss";
import Loading from "../loading/Loading";
import Avatar from "../avatar/Avatar";

const SeachUser = ({ addingUser, idInput }) => {
  const [search, setSearch] = useState("");
  const { data, loading } = useQuery(USERS, {
    skip: !search,
    variables: {
      verified: true,
      isGroupAdmin: true,
      search,
    },
  });

  const handleAddingUser = (user) => {
    addingUser(user);
    setSearch("");
  };
  return (
    <div className={StyleSheet.search}>
      <Input
        placeholder="invite"
        label="Name or email "
        name="invites"
        handleChange={(e) => setSearch(e.target.value)}
        fontSize={1.3}
        id={idInput}
        value={search}
      />
      <ul
        className={[
          StyleSheet.search__list,
          data?.users.length && StyleSheet.search__list__appear,
        ].join(" ")}
      >
        {data && loading ? (
          <Loading text="Loading users" color="gray" />
        ) : (
          data?.users.map((user) => (
            <li
              className={StyleSheet.search__item}
              key={user._id}
              onClick={() => handleAddingUser(user)}
            >
              <Avatar
                img={user.imageUrl || "/user.png"}
                title={user.name}
                radius="30px"
                fontTitle="1.2rem"
                color="currentColor"
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SeachUser;
