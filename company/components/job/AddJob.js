import { useState } from "react";
import { useMutation } from "@apollo/client";
import Button from "../button/Button";
import Input from "../input/Input";
import { CREATE_JOB } from "../../apollo/Mutations/jobMutations";
import StyleSheet from "./job.module.scss";
import { ErrorNotification } from "../../utils/notifications";

const AddJob = ({ setNotification, setShowPop }) => {
  const [title, setTitle] = useState("");

  const [createJob, { loading }] = useMutation(CREATE_JOB, {
    update(cache, { data: { createJob } }) {
      cache.modify({
        fields: {
          jobs(existingTodos) {
            return [createJob, ...existingTodos];
          },
        },
      });
    },
    onCompleted: () => setShowPop(false),
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const resetJob = () => {
    setTitle("");
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    createJob({
      variables: {
        title,
      },
    });
  };

  return (
    <form className={StyleSheet.job} onSubmit={handleAddJob}>
      <Input
        label="Job"
        placeholder="job"
        name="job"
        type="text"
        handleChange={(e) => setTitle(e.target.value)}
        value={title}
        required
      />
      <div className={StyleSheet.job__btns}>
        <Button
          width="12rem"
          title="Add"
          marginLeft="1.5rem"
          disabled={!title || loading}
          icon="plus"
        />
        <Button
          width="12rem"
          type="reset"
          hovered
          title="Reset"
          disabled={!title}
          handleClick={() => resetJob()}
        />
      </div>
    </form>
  );
};

export default AddJob;
