import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { NotificationContext } from "../context/notificationContext";
import Main from "../layout/Main";
import Loading from "../components/loading/Loading";
import Popup from "../components/popup/Popup";
import Input from "../components/input/Input";
import TextArea from "../components/textarea/TextArea";
import Options from "../components/options/Options";
import Avatar from "../components/avatar/Avatar";
import Tab from "../components/tabs/Tab";
import { Table, TableItem, TableContainer } from "../components/table";
import Button from "../components/button/Button";
import { INVITATIONS } from "../apollo/Queries/invitationQueries";
import {
  CREATE_INVITATION,
  UPDATE_INVITATION,
} from "../apollo/Mutations/invitationMutations";
import { DELETE_USER, UPDATE_USER } from "../apollo/Mutations/userMutations";
import { inviteValidation } from "../validations/inviteValidation";
import { ErrorNotification } from "../utils/notifications";
import { formatDates } from "../utils/dates";
import { protectedPage } from "../utils/auth";

const Users = () => {
  const router = useRouter();
  const { setNotification } = useContext(NotificationContext);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [accepted, setAccepted] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const [errors, setErrors] = useState({});
  const [invitation, setInvitation] = useState({
    emails: "",
    description: "",
  });

  const { loading, data } = useQuery(INVITATIONS, {
    variables: { accepted, isPending },
    onCompleted: ({ invitations }) => setInvitations(invitations),
    onError: (error) => ErrorNotification(setNotification, error),
    fetchPolicy: "network-only",
  });

  const [deleteU] = useMutation(DELETE_USER, {
    onCompleted: ({ deleteUser }) =>
      setInvitations((prev) =>
        prev.filter((invi) => invi.user._id !== deleteUser._id)
      ),
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const [updateU] = useMutation(UPDATE_USER, {
    onCompleted: ({ updateUser }) =>
      setInvitations((prev) =>
        prev.filter((invi) => invi.user._id !== updateUser._id)
      ),
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const [userBlockState] = useMutation(UPDATE_USER, {
    onCompleted: ({ updateUser }) => {
      let invites = [...invitations];
      let index = invites.findIndex((inv) => inv.user?._id === updateUser._id);
      let invi = invites[index];
      invites[index] = {
        ...invi,
        user: { ...invi.user, isBlocked: !invi.user.isBlocked },
      };
      setInvitations(invites);
    },
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const [invite, { loading: sendingInvite }] = useMutation(CREATE_INVITATION, {
    onCompleted: ({ createInvitation }) => {
      setShow(false);
      setInvitations((prev) => [...prev, ...createInvitation]);
    },
    onError: (error) => ErrorNotification(setNotification, error, 2500),
  });

  const [updateInvitation] = useMutation(UPDATE_INVITATION, {
    onCompleted: ({ updateInvitation }) =>
      updateU({
        variables: {
          _id: updateInvitation.user._id,
          isPending: true,
        },
      }),
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const handleInviteInputs = (name, value) => {
    setInvitation((presState) => ({ ...presState, [name]: value }));
    if (name === "emails") setErrors({ email: "" });
  };

  const handleInvite = (e) => {
    e.preventDefault();
    const emails = invitation.emails.replace(/\s+/g, " ").trim().split(" ");
    const errors = inviteValidation(emails);
    if (!errors.valid) return setErrors(errors);

    invite({
      variables: {
        emails,
        description: invitation.description,
      },
    });
  };

  const deleteUser = (_id) => {
    console.log(_id);
    deleteU({
      variables: {
        _id,
      },
    });
  };
  const updateUser = (_id) => {
    updateInvitation({
      variables: {
        _id,
        isPending: false,
        accepted: true,
        acceptedDate: Date.now(),
      },
    });
  };

  const userState = (invi) => {
    userBlockState({
      variables: {
        _id: invi.user._id,
        isBlocked: !invi.user.isBlocked,
      },
    });
  };

  useEffect(() => {
    if (data) {
      setInvitations(
        data.invitations.filter(
          ({ email, user }) =>
            email.toLowerCase().startsWith(search.toLowerCase()) ||
            user?.name.toLowerCase().startsWith(search.toLowerCase())
        )
      );
    }
  }, [search, data]);

  const titles =
    accepted || isPending
      ? accepted
        ? ["Name", "Email", "Accept Date", "Status", "Action"]
        : ["Name", "Email", "Request Date", "Action"]
      : ["Email", "Date"];

  return (
    <>
      <Main title="Users" icon="user">
        <div className="users__btn">
          <Input
            width="30rem"
            label="Search"
            placeholder="search"
            name="search"
            type="text"
            icon={({ style }) => <i className={"fa fa-search " + style} />}
            fontSize={1.6}
            float="right"
            handleChange={(e) => setSearch(e.target.value)}
          />
          <Button
            title="Invite users"
            handleClick={() => setShow(!show)}
            width="20rem"
            icon="plus"
          />
        </div>

        <Tab
          titles={[
            {
              text: "Accpeted",
              id: "acc",
              fct: () => {
                setAccepted(true);
                setIsPending(false);
              },
              checked: true,
            },
            {
              text: "Invited",
              id: "inv",
              fct: () => {
                setAccepted(false);
                setIsPending(false);
              },
            },
          ]}
        />
        {/*<div className="invitations__request">
          <div
            className="invitation__request"
            style={{ background: (!accepted || isPending) && "#b8c8d7" }}
            onClick={() => {}}
          >
            Accpeted
          </div>
          <div
            className="invitation__request"
            style={{ background: (accepted || isPending) && "#b8c8d7" }}
            onClick={() => {
              setAccepted(false);
              setIsPending(false);
            }}
          >
            Invited
          </div>
          <div
            className="invitation__request"
            style={{ background: (accepted || !isPending) && "#b8c8d7" }}
            onClick={() => {
              setAccepted(false);
              setIsPending(true);
            }}
          >
            Pending
          </div>
          </div>*/}
        {!loading ? (
          <Table titles={titles}>
            {invitations.map((invi) => (
              <TableContainer
                key={invi._id}
                clickable={accepted}
                dark={invi.user?.isBlocked}
              >
                {(accepted || isPending) && (
                  <TableItem
                    handleClick={() =>
                      accepted && router.push("/profile/" + invi?.user._id)
                    }
                  >
                    <Avatar
                      img={invi.user?.imageUrl}
                      title={invi.user?.name}
                      radius={50}
                      fontTitle="1.4rem"
                      color="#000"
                    />
                  </TableItem>
                )}
                <TableItem
                  handleClick={() =>
                    accepted && router.push("/profile/" + invi?.user._id)
                  }
                >
                  {invi.email}
                </TableItem>
                <TableItem
                  handleClick={() =>
                    accepted && router.push("/profile/" + invi?.user._id)
                  }
                >
                  {formatDates(invi.acceptedDate || invi.invitationDate)}
                </TableItem>
                {accepted && (
                  <>
                    <TableItem
                      handleClick={() =>
                        accepted && router.push("/profile/" + invi?.user._id)
                      }
                    >
                      {invi.user?.isBlocked ? "Blocked" : "UnBlocked"}
                    </TableItem>
                    <TableItem>
                      <Options
                        options={[
                          {
                            text: invi.user?.isBlocked
                              ? "Unblock user"
                              : "Block user",
                            fct: () => userState(invi),
                          },
                        ]}
                        relative
                      />
                    </TableItem>
                  </>
                )}
                {isPending && (
                  <TableItem>
                    <Options
                      options={[
                        {
                          text: "Delete",
                          fct: () => deleteUser(invi.user?._id),
                        },
                        { text: "update", fct: () => updateUser(invi._id) },
                      ]}
                      relative
                    />
                  </TableItem>
                )}
              </TableContainer>
            ))}
          </Table>
        ) : (
          <Loading loadingPage text="Loading users" font={1.5} />
        )}

        <Popup
          show={show}
          title="Invite people"
          handleShow={() => setShow(false)}
        >
          <p
            style={{
              color: "#43425D",
              fontSize: "1.9rem",
              padding: "1rem 2rem 0rem",
            }}
          >
            People you add will get an email that gives them access to this
            platform and to view all your groups and events.
          </p>
          <form className="invite__form" onSubmit={handleInvite}>
            <Input
              label="Email(s)"
              placeholder="email"
              name="search"
              handleChange={(e) => handleInviteInputs("emails", e.target.value)}
              error={errors.email}
            />
            <TextArea
              border
              placeholder="Add a message here"
              padding="1rem"
              handleChange={(e) =>
                handleInviteInputs("description", e.target.value)
              }
            />
            <Button
              title="invite"
              float="right"
              width="20rem"
              marginTop="1rem"
              disabled={sendingInvite || !invitation.emails}
            />
          </form>
        </Popup>
      </Main>

      <style jsx>
        {`
          .users__btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .invitations__request {
            display: flex;
            align-items: center;
          }

          .invitation__request {
            flex: 1;
            background: #fff;
            text-align: center;
            padding: 1.5rem 0rem;
            font-size: 1.7rem;
            cursor: pointer;
            font-weight: 500;
          }
          .invitation__request:not(:last-child) {
            border-right: 1px solid rgba(0, 0, 0, 0.2);
            border-top-right-radius: 10px;
          }

          .invite__form {
            padding: 2rem;
          }
        `}
      </style>
    </>
  );
};

export default Users;

export const getServerSideProps = (ctx) => protectedPage(ctx);
