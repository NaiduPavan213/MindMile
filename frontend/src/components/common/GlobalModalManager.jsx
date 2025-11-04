import React from "react";
import { useModal } from "../contexts/ModalContext";
import { useAuth } from "../contexts/AuthContext";

// Import all possible modals
import LogoutModal from "./LogoutModal";
import AskQuestionModal from "../modals/AskQuestionModal";
import ShareProjectModal from "../modals/ShareProjectModal";
import WriteArticleModal from "../modals/WriteArticleModal";
import ShareModal from "../modals/ShareModal";
import SendModal from "../modals/SendModal";

const GlobalModalManager = () => {
  const { type, props, closeModal } = useModal();

  const auth = useAuth();

  const handleLogout = async () => {
    try {
      await auth.logout();
    } catch (e) {
      // ignore
    }
    closeModal();
    // Use a hard redirect to ensure we land on the login page regardless of router setup
    try {
      window.location.href = "/login";
    } catch (e) {
      // fallback: do nothing
    }
  };

  switch (type) {
    case "logout":
      return <LogoutModal onClose={closeModal} onConfirm={handleLogout} />;

    case "askQuestion":
      if (!props.onPostQuestion) return null;
      return (
        <AskQuestionModal
          onClose={closeModal}
          onPostQuestion={props.onPostQuestion}
        />
      );

    case "shareProject":
      if (!props.onShareProject) return null;
      return (
        <ShareProjectModal
          onClose={closeModal}
          onShareProject={props.onShareProject}
        />
      );

    case "writeArticle":
      if (!props.onWriteArticle) return null;
      return (
        <WriteArticleModal
          onClose={closeModal}
          onWriteArticle={props.onWriteArticle}
        />
      );

    case "share":
      if (!props.post) return null;
      return <ShareModal post={props.post} onClose={closeModal} />;

    case "send":
      if (!props.post) return null;
      return <SendModal post={props.post} onClose={closeModal} />;

    default:
      return null;
  }
};

export default GlobalModalManager;
