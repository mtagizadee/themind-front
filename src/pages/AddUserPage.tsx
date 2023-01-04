import React, { FormEvent, useContext, useState } from "react";
import { ErrorKey, TValidationError, VALIDATION_ERROR_INITIAL_STATE } from "../common/types";
import Box from "../components/ui/Box";
import Input from "../components/ui/Input";
import { lengthRange, isNotEmpty, NICKNAME_MIN_LENGTH, NICKNAME_MAX_LENGTH } from "../validators";
import { AuthController } from "../api";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import Popup, { PopupType } from "../components/ui/Popup";

const AddUserPage = () => {
  const [error, setError] = useState<TValidationError>(VALIDATION_ERROR_INITIAL_STATE);
  const { authorize } = useContext(AuthContext);
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nickname = event.currentTarget.nickname.value;

    if (!isNotEmpty(nickname)) {
      setError({ key: ErrorKey.NR, message: "Nickname is required" });
      return;
    }

    // check the length of the nickname
    const length = lengthRange(NICKNAME_MIN_LENGTH, NICKNAME_MAX_LENGTH);
    if (!length(nickname)) {
      setError({
        key: ErrorKey.NL,
        message: `Nickname must be between ${NICKNAME_MIN_LENGTH} and ${NICKNAME_MAX_LENGTH} characters`,
      });
      return;
    }

    setError(VALIDATION_ERROR_INITIAL_STATE);
    try {
      const authToken = await AuthController.addUser(nickname);

      localStorage.setItem("authToken", authToken);
      authorize();

      navigate("/create-lobby");
    } catch (error) {
      setPopup(true);
    }
  };

  return (
    <>
      <div className="center-content full-screen">
        <Box className="w-full max-w-[600px] ">
          <h1 className="text-center"> Welcome ! </h1>
          <form onSubmit={onSubmit}>
            <Input
              error={error.key !== ErrorKey.NE}
              errorMessage={error.message}
              className="my-6"
              name="nickname"
              label="Enter your nickname"
            />
            <button type="submit"> Submit </button>
          </form>
        </Box>
      </div>
      <Popup
        type={PopupType.Error}
        message="Could not add your nickname, please try again later on..."
        onClose={() => setPopup(false)}
        visible={popup}
      />
    </>
  );
};

export default AddUserPage;
