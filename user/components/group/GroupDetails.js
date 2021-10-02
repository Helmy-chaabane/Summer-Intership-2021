import { useState } from "react";
import Input from "../input/Input";
import RadioBox from "../radiobox/Radiobox";
import TextArea from "../textarea/TextArea";
import Typography from "../typography/Typography";
import Button from "../button/Button";
import { PRIVACY } from "../../constants/enums";

const GroupDetails = ({ id, privacy, title, description, updateGroup }) => {
  const [error, setError] = useState("");
  const [group, setGroup] = useState({
    title,
    description,
    privacy,
  });

  const handleInputs = (name, value) => {
    setGroup((prev) => ({ ...prev, [name]: value }));
  };

  const handleGroupSubmit = (e) => {
    e.preventDefault();
    if (!group.title) return setError("Title is required!");
    updateGroup({
      variables: {
        _id: id,
        ...group,
      },
    });
  };

  return (
    <>
      <form onSubmit={handleGroupSubmit}>
        <div className="borders">
          <Typography
            title="Details"
            fontSize="1.6rem"
            fontWeight="600"
            marginBottom="1.5rem"
          />
          <Input
            placeholder="Title ..."
            label="Title"
            name="title"
            handleChange={(e) => {
              handleInputs("title", e.currentTarget.value);
              setError("");
            }}
            fontSize={1.3}
            error={error}
            defaultValue={title}
          />
          <TextArea
            placeholder="descritpion ..."
            border
            fontSize="1.2rem"
            defaultValue={description}
            padding=".5rem"
            handleChange={(e) =>
              handleInputs("description", e.currentTarget.value)
            }
          />
        </div>
        <div className="borders">
          <Typography
            title="Privacy"
            fontSize="1.6rem"
            fontWeight="600"
            marginTop="1rem"
          />
          <RadioBox
            id="public"
            value={PRIVACY.PUBLIC}
            name="privacy"
            title="PUBLIC"
            handleChange={(e) => handleInputs("privacy", e.currentTarget.value)}
            checked={group.privacy === PRIVACY.PUBLIC}
            radius={2}
            fontSize="1.1rem"
          />
          <RadioBox
            id="private"
            value={PRIVACY.PRIVATE}
            name="privacy"
            title="PRIVATE"
            handleChange={(e) => handleInputs("privacy", e.currentTarget.value)}
            checked={group.privacy === PRIVACY.PRIVATE}
            radius={2}
            fontSize="1.1rem"
          />
          <Button
            title="Save"
            fontSize="1.3rem"
            width="10rem"
            float="right"
            margin="2rem"
            disabled={
              JSON.stringify({
                title,
                description,
                privacy,
              }) === JSON.stringify(group)
            }
          />
        </div>
      </form>

      <style jsx>{`
        .borders {
          border: 1px solid rgba(0, 0, 0, 0.2);
          padding: 1rem;
          margin-top: 1rem;
        }
      `}</style>
    </>
  );
};

export default GroupDetails;
