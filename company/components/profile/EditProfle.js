import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Button from "../button/Button";
import Input from "../input/Input";
import TextArea from "../textarea/TextArea";
import { UPDATE_USER } from "../../apollo/Mutations/userMutations";
import { JOBS } from "../../apollo/Queries/jobQueries";
import { ErrorNotification } from "../../utils/notifications";
import { editValidation } from "../../validations/profileValidation";
import StyleSheet from "./profile.module.scss";

const Edit = ({ user, setNotification, setShowPop }) => {
  const { phone, location, diploma, job, description, _id } = user;
  const [profile, setProfile] = useState({
    phone,
    location,
    diploma,
    job,
    description,
  });
  const [errors, setErrors] = useState({});

  const { data, loading } = useQuery(JOBS, {
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const [updateProfile] = useMutation(UPDATE_USER, {
    onCompleted: () => setShowPop(false),
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const handleInputs = (name, value) => {
    setProfile({ ...profile, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const resetProfile = () => {
    setProfile({ phone, location, diploma, job, description });
    setErrors({});
  };

  const handleEditProfile = (e) => {
    e.preventDefault();

    const errors = editValidation(profile);
    if (!errors.valid) return setErrors(errors);

    updateProfile({
      variables: {
        _id,
        ...profile,
      },
    });
  };
  const disabled =
    JSON.stringify({
      phone,
      location,
      diploma,
      job,
      description,
    }) === JSON.stringify(profile);

  return (
    <form className={StyleSheet.edit} onSubmit={handleEditProfile}>
      <Input
        label="Phone"
        placeholder="phone"
        name="phone"
        type="text"
        handleChange={(e) => handleInputs("phone", e.target.value)}
        required
        value={profile.phone}
        error={errors.phone}
      />
      <Input
        label="Location"
        placeholder="location"
        name="location"
        type="text"
        handleChange={(e) => handleInputs("location", e.target.value)}
        value={profile.location}
        required
        error={errors.location}
      />
      <Input
        label="Diploma"
        placeholder="diploma"
        name="diploma"
        type="text"
        handleChange={(e) => handleInputs("diploma", e.target.value)}
        value={profile.diploma}
        required
        error={errors.diploma}
      />

      <div className={StyleSheet.edit__select__wrapper}>
        <select
          name="pets"
          id="pet-select"
          className={[
            StyleSheet.edit__select,
            errors.job && StyleSheet.edit__select__error,
          ].join(" ")}
          value={profile.job}
          onChange={(e) => handleInputs("job", e.target.value)}
        >
          <option value="" className={StyleSheet.edit__select__option}>
            Choose a job
          </option>
          {data?.jobs.map(({ title, _id }) => (
            <option
              value={title}
              key={_id}
              className={StyleSheet.edit__select__option}
            >
              {title}
            </option>
          ))}
        </select>
        {errors.job && (
          <span className={StyleSheet.edit__select__error__text}>
            Job is required!
          </span>
        )}
      </div>

      <TextArea
        border
        value={profile.description}
        handleChange={(e) => handleInputs("description", e.target.value)}
        placeholder="Tell us more about you ...."
        padding={5}
      />
      <div className={StyleSheet.edit__btns}>
        <Button
          width="12rem"
          title="Confirm"
          marginLeft="1.5rem"
          disabled={disabled}
        />
        <Button
          width="12rem"
          type="reset"
          hovered
          title="Reset"
          disabled={disabled}
          handleClick={() => resetProfile()}
        />
      </div>
    </form>
  );
};

export default Edit;
