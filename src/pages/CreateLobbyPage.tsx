import React, { useState } from "react";
import Popup, { PopupType } from "../components/ui/Popup";
import Box from "../components/ui/Box";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { ErrorKey, TValidationError, VALIDATION_ERROR_INITIAL_STATE } from "../common/types";
import { useNavigate } from "react-router";
import { isInteger, isNotEmpty, MAX_NUMBER_OF_PLAYERS, MIN_NUMBER_OF_PLAYERS } from "../validators";
import useLoading from "../hooks/useLoading";
import { LobbiesController } from "../api";
import { privateRoutes } from "../common/routes";

const CreateLobbyPage = () => {
  const [error, setError] = useState<TValidationError>(VALIDATION_ERROR_INITIAL_STATE);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  const { execute, isLoading } = useLoading(
    async (numberOfPlayers: number) => {
      const lobbyId = await LobbiesController.create(numberOfPlayers);
      navigate(privateRoutes.lobbiesRoutes.lobby(lobbyId));
    },
    () => {
      setPopup(true);
    }
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const numberOfPlayers = Number(event.currentTarget.numberOfPlayers.value);

    if (!isNotEmpty(numberOfPlayers)) {
      setError({ key: ErrorKey.NOPR, message: "Number of players is required" });
      return;
    }

    // check if the number of players is an integer
    if (!isInteger(numberOfPlayers)) {
      setError({ key: ErrorKey.NOPNI, message: "Number of players must be an integer" });
      return;
    }

    // check if the number of players is between 2 and 4
    if (numberOfPlayers < MIN_NUMBER_OF_PLAYERS || numberOfPlayers > MAX_NUMBER_OF_PLAYERS) {
      setError({
        key: ErrorKey.NOL,
        message: `Number of players must be between ${MIN_NUMBER_OF_PLAYERS} and ${MAX_NUMBER_OF_PLAYERS}`,
      });
      return;
    }

    setError(VALIDATION_ERROR_INITIAL_STATE);
    await execute(numberOfPlayers);
  };

  return (
    <>
      <div className="center-content full-screen">
        <Box className="box-600">
          <h1 className="text-center">Create Lobby</h1>
          <form onSubmit={onSubmit}>
            <Input
              error={error.key !== ErrorKey.NE}
              errorMessage={error.message}
              className="my-4"
              name="numberOfPlayers"
              label="Enter the number of players in the lobby"
              placeholder="2-4"
              type="number"
            />

            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Box>
      </div>
      <Popup
        type={PopupType.Error}
        message="Could not create a lobby, please try again later on..."
        onClose={() => setPopup(false)}
        visible={popup}
      />
    </>
  );
};

export default CreateLobbyPage;
