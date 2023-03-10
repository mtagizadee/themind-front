import React, { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "../components/ui/Box";
import useLobby from "../hooks/useLobby";
import PageLoader from "../components/PageLoader";
import { privateRoutes } from "../common/routes";
import { isNotEmpty } from "../validators";
import { Light, Mikasa, Power, Purple } from "../assets/players";
import { FiX, FiCopy } from "react-icons/fi";
import WarningModal from "../components/ui/WarningModal";
import useToggle from "../hooks/useToggle";
import Button from "../components/ui/Button";
import DefaultModal from "../components/ui/DefaultModal";
import useLoading from "../hooks/useLoading";
import { PopupType } from "../components/ui/Popup";
import { LobbiesController } from "../api";
import useUser from "../hooks/useUser";
import { fixResponseDate, objectsAreEqual } from "../common/helpers";
import { lobbyCleaner } from "../common/types";
import usePopup from "../hooks/usePopup";
import { orderToPlayerData } from "../common/constants";
import ProfileImage from "../components/ui/ProfileImage";

type TLobbyPageParams = {
  id: string;
};

const LobbyPage = () => {
  const { id } = useParams<TLobbyPageParams>();
  const [backWarningModal, openBackWarningModal, closeBackWarningModal] = useToggle();
  const [startWarningModal, openStartWarningModal, closeStartWarningModal] = useToggle();
  const [inviteModal, openInviteModal, closeInviteModal] = useToggle();
  const { displayPopup } = usePopup();
  const navigate = useNavigate();
  const { id: clientId } = useUser();
  const { lobby, startGame } = useLobby(id as any, displayPopup);

  if (objectsAreEqual(lobby, lobbyCleaner())) return <PageLoader />;
  const isAuthor = lobby.authorId === clientId;

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
              Expires at: <time> {fixResponseDate(lobby.expiresAt)} </time>
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
                    <InvitedPlayer
                      order={index + 1}
                      isAdmin={player.id === lobby.authorId}
                      key={player.id}
                      nickname={player.nickname}
                    />
                  ))
                : null}
            </ul>
          </section>
          {isAuthor ? (
            <div className="center-row gap-6">
              <Button onClick={() => openInviteModal()}> Invite a player </Button>
              <Button onClick={() => openStartWarningModal()}> Start </Button>
            </div>
          ) : null}
        </Box>
      </div>
      <WarningModal
        visible={backWarningModal}
        onConfirm={() => {
          navigate(privateRoutes.lobbiesRoutes.create);
        }}
        onClose={() => closeBackWarningModal()}
      >
        Are you sure you want to leave the lobby?
      </WarningModal>
      <WarningModal
        visible={startWarningModal}
        onConfirm={() => {
          startGame();
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
  const { displayPopup } = usePopup();
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
      displayPopup(
        "Could not generate an invitaion link, please try again later on...",
        PopupType.Error
      );
    }
  );

  return (
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
            if (isNotEmpty(link)) {
              navigator.clipboard.writeText(link);
              setCoppied(true);
            }
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
  );
};

interface IInvitedPlayerProps {
  nickname: string;
  isAdmin: boolean;
  order: number;
}

/**
 * Component to display a joined player in the lobby
 * @param IInvitedPlayerProps
 * @returns JSX.Element
 */
const InvitedPlayer: FC<IInvitedPlayerProps> = ({ nickname, isAdmin, order }) => {
  const orderData = (orderToPlayerData as any).lobby[order];

  return (
    <li>
      <div className="items-center p-3 flex hover:bg-gray-100 dark:hover:bg-gray-700">
        <ProfileImage image={orderData.image} nickname={nickname} />
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
