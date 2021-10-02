import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { UserContext } from "../../context/userContext";
import { NotificationContext } from "../../context/notificationContext";
import Main from "../../layout/Main";
import { GridItem } from "../../components/grid";
import ImageUplaod from "../../components/upload/ImageUpload";
import Typography from "../../components/typography/Typography";
import Input from "../../components/input/Input";
import TextArea from "../../components/textarea/TextArea";
import RadioBox from "../../components/radiobox/Radiobox";
import Button from "../../components/button/Button";
import { CREATE_GROUP } from "../../apollo/Mutations/groupMutations";
import { CREATE_USERGROUP } from "../../apollo/Mutations/userGroupMutations";
import { PRIVACY, ROLES } from "../../constants/enums";
import { createValidation } from "../../validations/groupValidation";
import {
  ErrorNotification,
  SuccessNotification,
  WarningNotification,
} from "../../utils/notifications";
import { protectedPage } from "../../utils/auth";

const CreateGroup = () => {
  const router = useRouter();
  const { setNotification } = useContext(NotificationContext);
  const { user, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [group, setGroup] = useState({
    imageCoder: "",
    image: null,
    title: "",
    description: "",
    privacy: PRIVACY.PUBLIC,
  });
  const [createUserGroup, { loading }] = useMutation(CREATE_USERGROUP, {
    onCompleted: ({ createUserGroup }) => {
      setUser((prevState) => ({
        ...prevState,
        groups: [...prevState.groups, createUserGroup],
      }));
      router.push("/groups");
      SuccessNotification(
        setNotification,
        `group '${group.title}' has been added!`
      );
    },
    onError: (error) => ErrorNotification(setNotification, error),
  });
  const [createGroup] = useMutation(CREATE_GROUP, {
    onCompleted: ({ createGroup }) => {
      createUserGroup({
        variables: {
          user: user._id,
          group: createGroup._id,
          accepted: true,
          role: ROLES.ADMIN,
        },
      });
    },
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const handleImage = (e) => {
    const file = e.currentTarget.files[0];
    try {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          setGroup((prevstate) => ({
            ...prevstate,
            imageCoder: e.target.result,
            image: file,
          }));
          setErrors((prevstate) => ({ ...prevstate, image: "" }));
        };
      }
    } catch (error) {
      WarningNotification(setNotification, error.message, 1400, true);
    }
  };

  const handleInputs = (name, value) => {
    setGroup((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevstate) => ({ ...prevstate, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = createValidation(group);
    if (!errors.valid) return setErrors(errors);
    const newGroup = { ...group };
    delete newGroup.imageCoder;
    createGroup({ variables: { ...newGroup, owner: user?._id } });
  };

  return (
    <>
      <Main title="Create Group" padding="3rem 0rem 0rem" icon="users">
        <form onSubmit={handleSubmit}>
          <div className="group__image">
            <ImageUplaod
              id="imageGroup"
              margin="0 auto"
              width="92%"
              height="35rem"
              handleChange={handleImage}
              image={group.imageCoder || "/group.png"}
              error={errors.image}
            />
          </div>

          <div className="group__details">
            <GridItem padding="3rem" shadow>
              <Typography
                title="Group details"
                fontSize="2rem"
                marginBottom="1.5rem"
              />

              <Input
                label="title"
                name="title"
                placeholder="title"
                fontWeight="600"
                required
                width="100%"
                handleChange={(e) => handleInputs("title", e.target.value)}
                error={errors.title}
              />
              <TextArea
                placeholder="Description..."
                minHeight={70}
                padding="1rem"
                border
                handleChange={(e) =>
                  handleInputs("description", e.target.value)
                }
              />
              <Typography
                title="Privacy"
                fontSize="2rem"
                margin="1.5rem 1.5rem 0"
              />
              <RadioBox
                id="public"
                value={PRIVACY.PUBLIC}
                name="privacy"
                title="PUBLIC"
                subTitle="Anyone can join this group"
                handleChange={(e) => handleInputs("privacy", e.target.value)}
                checked={group.privacy === PRIVACY.PUBLIC}
                fontSize="1.6rem"
              />
              <RadioBox
                id="private"
                value={PRIVACY.PRIVATE}
                name="privacy"
                title="PRIVATE"
                subTitle="Only admin approved-peaple can join"
                handleChange={(e) => handleInputs("privacy", e.target.value)}
                checked={group.privacy === PRIVACY.PRIVATE}
                fontSize="1.6rem"
              />
              <div className="btns">
                <Button
                  title="Create"
                  width="20rem"
                  disabled={loading || !group.title}
                />
                <Button title="Cancel" width="20rem" type="reset" hovered />
              </div>
            </GridItem>
          </div>
        </form>
      </Main>

      <style jsx>{`
        .group__details {
          margin: 3rem 5rem 0rem;
        }

        .btns {
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
          margin-top: 3rem;
        }
      `}</style>
    </>
  );
};

export default CreateGroup;

export const getServerSideProps = (ctx) => protectedPage(ctx);
