import { useState } from "react";
import { useMutation } from "@apollo/client";
import Button from "../button/Button";
import Input from "../input/Input";
import TextArea from "../textarea/TextArea";
import { UPDATE_COMPANY } from "../../apollo/Mutations/userMutations";
import { ErrorNotification } from "../../utils/notifications";
import { editCompanyValidation } from "../../validations/companyValidation";
import StyleSheet from "./company.module.scss";

const Edit = ({ company: C, setNotification, setShowPop, setUser }) => {
  const intialStateCompany = {
    name: C?.name ? C.name : "",
    email: C?.email ? C.email : "",
    phone: C?.phone ? C.phone : "",
    address: C?.address ? C.address : "",
    description: C?.description ? C.description : "",
  };
  const [company, setCompany] = useState(intialStateCompany);
  const [errors, setErrors] = useState({});
  const [updateCompany] = useMutation(UPDATE_COMPANY, {
    onCompleted: ({ updateUserCompany }) => {
      setUser((prev) => ({ ...prev, company: updateUserCompany.company })),
        setShowPop(false);
    },
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const handleInputs = (name, value) => {
    setCompany({ ...company, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const resetCompany = () => {
    setCompany(intialStateCompany);
    setErrors({});
  };

  const handleEditCompany = (e) => {
    e.preventDefault();
    const errors = editCompanyValidation(company);
    if (!errors.valid) return setErrors(errors);

    updateCompany({
      variables: {
        _id: C?._id,
        ...company,
      },
    });
  };

  const disabled =
    JSON.stringify(intialStateCompany) === JSON.stringify(company);

  return (
    <form className={StyleSheet.edit} onSubmit={(e) => handleEditCompany(e)}>
      <Input
        label="Name"
        placeholder="name"
        name="name"
        type="text"
        handleChange={(e) => handleInputs("name", e.target.value)}
        required
        value={company.name}
        error={errors.name}
      />
      <Input
        label="Email"
        placeholder="email"
        name="email"
        type="text"
        handleChange={(e) => handleInputs("email", e.target.value)}
        required
        value={company.email}
        error={errors.email}
      />
      <Input
        label="Phone"
        placeholder="phone"
        name="phone"
        type="text"
        handleChange={(e) => handleInputs("phone", e.target.value)}
        required
        value={company.phone}
        error={errors.phone}
      />
      <Input
        label="Address"
        placeholder="address"
        name="address"
        type="text"
        handleChange={(e) => handleInputs("address", e.target.value)}
        value={company.address}
        required
        error={errors.address}
      />

      <TextArea
        border
        value={company.description}
        handleChange={(e) => handleInputs("description", e.target.value)}
        placeholder="Company description...."
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
          handleClick={() => resetCompany()}
        />
      </div>
    </form>
  );
};

export default Edit;
