import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import ImageUpload from "../upload/ImageUpload";
import Typography from "../typography/Typography";
import { UPDATE_COMPANY } from "../../apollo/Mutations/userMutations";
import {
  ErrorNotification,
  WarningNotification,
} from "../../utils/notifications";
import StyleSheet from "./company.module.scss";

const CompanyImage = ({ company, setNotification }) => {
  const [image, setImage] = useState("");
  const [updateCompany] = useMutation(UPDATE_COMPANY, {
    /*  onCompleted: ({ updateUserCompany }) =>
    setUser((prev) => ({
      ...prev,
      company: { ...prev.company, imageUrl: updateUserCompany.imageUrl},
    })),*/
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const handleImage = (e) => {
    const file = e.currentTarget.files[0];
    try {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          updateCompany({
            variables: {
              _id: company?._id,
              image: file,
            },
          });
          setImage(e.target.result);
        };
      }
    } catch (error) {
      WarningNotification(setNotification, error.message, 1400, true);
    }
  };

  useEffect(() => {
    setImage(company?.imageUrl || "/user.png");
  }, [company]);

  return (
    <div className={StyleSheet.company}>
      <ImageUpload
        id="company_image"
        handleChange={handleImage}
        image={image}
        width="18rem"
        height="18rem"
      />
      <div className={StyleSheet.company__details}>
        <Typography
          title={company?.name || "Company"}
          fontSize="1.8rem"
          padding="0rem"
        />
        <p className={StyleSheet.company__descr}>{company?.description}</p>
      </div>
    </div>
  );
};

export default CompanyImage;
