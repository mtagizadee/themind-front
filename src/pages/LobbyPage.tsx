import React, { FC, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Box from "../components/ui/Box";
import useLobby from "../hooks/useLobby";
import PageLoader from "../components/PageLoader";
import { AxiosError } from "axios";
import { publicRoutes } from "../common/routes";
import { isNotEmpty } from "../validators";
import { Light, Mikasa, Power, Purple } from "../assets/players";
import { FiX, FiCopy } from "react-icons/fi";
import WarningModal from "../components/ui/WarningModal";
import useToggle from "../hooks/useToggle";
import Button from "../components/ui/Button";
import DefaultModal from "../components/ui/DefaultModal";
import useLoading from "../hooks/useLoading";
import Popup, { PopupType } from "../components/ui/Popup";
import { LobbiesController } from "../api";

type TLobbyPageParams = {
  id: string;
};

const LobbyPage = () => {
  const { id } = useParams<TLobbyPageParams>();
  const { lobby, isLoading, error } = useLobby(id as any);
  const [backWarningModal, openBackWarningModal, closeBackWarningModal] = useToggle();
  const [startWarningModal, openStartWarningModal, closeStartWarningModal] = useToggle();
  const [inviteModal, openInviteModal, closeInviteModal] = useToggle();

  // Handle loading and error
  if (isLoading) return <PageLoader />;
  if (error instanceof AxiosError && error.response?.status === 404)
    return <Navigate to={publicRoutes.notFoundPage} />;

  return (
    <>
      <div className="center-content full-screen">
        <Box className="box-700 relative">
          <FiX
            className="cursor-pointer absolute right-6 top-6 w-6 h-6"
            onClick={() => openBackWarningModal()}
          />
          <section>
            <h1> Lobby </h1>
            <p>
              Expires at: <time> {lobby.expiresAt} </time>
            </p>
            <hr className="mb-6 mt-3 border-gray-700" />
          </section>

          <section className="mb-6">
            <p className="text-sm">
              Players: {lobby.players.length} / {lobby.playersNumber}
            </p>
            <ul>
              {isNotEmpty(lobby.players)
                ? lobby.players.map((player, index) => (
                    // eslint-disable-line
                    <InvitedPlayer // eslint-disable-line
                      order={index + 1} // eslint-disable-line
                      isAdmin={player.id === lobby.authorId} // eslint-disable-line
                      key={player.id} // eslint-disable-line
                      nickname={player.nickname} // eslint-disable-line
                    /> // eslint-disable-line
                  )) // eslint-disable-line
                : null}
            </ul>
          </section>
          <div className="center-row gap-6">
            <Button onClick={() => openInviteModal()}> Invite a player </Button>
            <Button onClick={() => openStartWarningModal()}> Start </Button>
          </div>
        </Box>
      </div>
      <WarningModal
        visible={backWarningModal}
        onConfirm={() => {
          // TODO: Leave lobby
        }}
        onClose={() => closeBackWarningModal()}
      >
        Are you sure you want to leave the lobby?
      </WarningModal>
      <WarningModal
        visible={startWarningModal}
        onConfirm={() => {
          // TODO: Start the game
        }}
        onClose={() => closeStartWarningModal()}
      >
        Are you sure you want to start the game? You will not be able to invite anyone else after
        the game starts.
      </WarningModal>
      <InvitePlayerModal visible={inviteModal} onClose={() => closeInviteModal()} />
    </>
  );
};

interface IInvitePlayerModalProps {
  visible: boolean;
  onClose: () => void;
}

/**
 * Component for generating an invitation link for a lobby
 * @param IInvitePlayerModalProps
 * @returns JSX.Element
 */
const InvitePlayerModal: FC<IInvitePlayerModalProps> = ({ visible, onClose }) => {
  const [popup, setPopup] = useState(false);
  const [link, setLink] = useState("");
  const [coppied, setCoppied] = useState(false);
  const { id } = useParams<TLobbyPageParams>();
  const { execute, isLoading } = useLoading(
    async () => {
      if (id) {
        const link = await LobbiesController.generateInvitationLink(id);
        setLink(link);
      }
    },
    () => {
      setPopup(true);
    }
  );

  return (
    <>
      <DefaultModal title="Invite a player" visible={visible} onClose={onClose}>
        <Box className="center-row text-xm justify-between">
          <p>
            {isLoading
              ? "Loading..."
              : isNotEmpty(link)
              ? coppied
                ? "Link coppied to the clipboard..."
                : "Link is ready, click the icon to copy it..."
              : "Generate a link..."}
          </p>
          <FiCopy
            onClick={() => {
              // save link to the clipboard
              navigator.clipboard.writeText(link);
              setCoppied(true);
            }}
            className="cursor-pointer w-6 h-6"
          />
        </Box>
        <Button
          onClick={async () => {
            await execute();
          }}
        >
          Generate an invitation link
        </Button>
      </DefaultModal>
      <Popup
        onClose={() => setPopup(false)}
        visible={popup}
        type={PopupType.Error}
        message="Could not generate an invitation link, please try again later on..."
      />
    </>
  );
};

interface IInvitedPlayerProps {
  nickname: string;
  isAdmin: boolean;
  order: number;
}

/**
 * Map of order to player data
 * @important
 * This data is static and cannot be changed.
 * It is used only for image and description of the player in lobby
 */
const orderToPlayerData = {
  1: {
    image: Mikasa,
    description: "Oh, no. Not this again...",
  },
  2: {
    image: Power,
    description: "Do you want to play with me?",
  },
  3: {
    image: Purple,
    description: "Are we too young for this?",
  },
  4: {
    image: Light,
    description: "I want you to do it again...",
  },
};

/**
 * Component to display a joined player in the lobby
 * @param IInvitedPlayerProps
 * @returns JSX.Element
 */
const InvitedPlayer: FC<IInvitedPlayerProps> = ({ nickname, isAdmin, order }) => {
  const orderData = (orderToPlayerData as any)[order];

  return (
    <li>
      <div className="items-center p-3 flex hover:bg-gray-100 dark:hover:bg-gray-700">
        <img
          className="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0"
          src={orderData.image}
          alt={nickname}
        />
        <div className="text-gray-600 dark:text-gray-400">
          <div className="text-base font-normal"> {nickname} </div>
          <div className="text-sm font-normal">{orderData.description}</div>
          {isAdmin ? (
            <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
              <svg
                aria-hidden="true"
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                />
              </svg>
              Admin
            </span>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default LobbyPage;
