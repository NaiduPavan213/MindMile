import React, { useState, useRef } from "react";
import { useModal } from "../contexts/ModalContext";
import { useAuth } from "../contexts/AuthContext";

const mockComments = [
  {
    author: "Anjali Gupta",
    avatarUrl: "https://picsum.photos/seed/anjali/100/100",
    text: "This is such a great insight! Thanks for sharing.",
  },
  {
    author: "Raj Singh",
    avatarUrl: "https://picsum.photos/seed/mentor/100/100",
    text: "Have you considered how this applies to smaller, fine-tuned models?",
  },
];

const ActionButton = ({ icon, label, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center flex-1 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium space-x-2 transition-colors duration-200 ${
      isActive
        ? "text-purple-600 dark:text-purple-400"
        : "text-gray-600 dark:text-gray-400"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const Post = (props) => {
  const { author, title, avatarUrl, time, content, likes } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const commentInputRef = useRef(null);
  const { openModal } = useModal();
  const { user: authUser } = useAuth();
  // UI state for compactness
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const TEXT_TRUNCATE_LENGTH = 300; // characters before truncation
  // State for comments
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentsList, setCommentsList] = useState(mockComments);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLiked(!isLiked);
  };

  const handleCommentClick = () => {
    setIsCommentsOpen(!isCommentsOpen);
    // Use timeout to ensure the input is visible before focusing
    setTimeout(() => {
      commentInputRef.current?.focus();
    }, 0);
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        author: authUser?.name || "You",
        avatarUrl:
          authUser?.avatarUrl || "https://picsum.photos/seed/user/100/100",
        text: newComment,
      };
      setCommentsList([...commentsList, newCommentObj]);
      setNewComment("");
    }
  };

  return (
    <div className="card p-4 w-full">
      {/* Post Header */}
      <div className="flex items-start space-x-3">
        <button
          onClick={() => console.log(`View profile of ${author}`)}
          className="focus:outline-none"
        >
          <img
            src={avatarUrl}
            alt={author}
            className="w-12 h-12 rounded-full"
          />
        </button>
        <div className="flex-1">
          <button
            onClick={() => console.log(`View profile of ${author}`)}
            className="font-bold text-gray-900 dark:text-white text-left hover:underline focus:outline-none"
          >
            {author}
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
          </button>
          {isOptionsOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => console.log("Save post")}
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Save Post
              </button>
              <button
                onClick={() => console.log("Report post")}
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Report Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="mt-4 text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
        {content ? (
          <>
            {content.length > TEXT_TRUNCATE_LENGTH && !isTextExpanded ? (
              <div className="whitespace-pre-wrap">
                {content.slice(0, TEXT_TRUNCATE_LENGTH)}...{" "}
              </div>
            ) : (
              <div className="whitespace-pre-wrap">{content}</div>
            )}
            {content.length > TEXT_TRUNCATE_LENGTH && (
              <button
                onClick={() => setIsTextExpanded(!isTextExpanded)}
                className="mt-2 text-sm text-purple-600 dark:text-purple-400 font-medium"
              >
                {isTextExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </>
        ) : null}
      </div>

      {/* Media (images/videos) */}
      {props.media && props.media.length > 0 && (
        // media container: constrained to avoid huge vertical growth and never exceed card width
        <div className="mt-4 space-y-3 w-full max-h-[400px] overflow-hidden rounded">
          {props.media.map((m, idx) => {
            // m could be { data: <base64|string|object>, contentType }
            let src = "";
            if (!m) return null;
            if (typeof m.data === "string") {
              src = `data:${m.contentType};base64,${m.data}`;
            } else if (m.data && m.data.data) {
              // Buffer-like object from Node.js serialized to { type: 'Buffer', data: [...] }
              try {
                const bytes = m.data.data; // array
                const binary = bytes
                  .map((b) => String.fromCharCode(b))
                  .join("");
                src = `data:${m.contentType};base64,${btoa(binary)}`;
              } catch (e) {
                src = "";
              }
            }

            if (!src) return null;

            const commonMediaClass =
              "w-full max-w-full rounded object-contain block";
            // ensure media do not exceed a reasonable height and fit responsively
            if (m.contentType.startsWith("image")) {
              return (
                <div
                  key={idx}
                  className="w-full flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`media-${idx}`}
                    className={`${commonMediaClass} max-h-[400px]`}
                  />
                </div>
              );
            }
            if (m.contentType.startsWith("video")) {
              return (
                <div
                  key={idx}
                  className="w-full flex items-center justify-center overflow-hidden"
                >
                  <video
                    controls
                    src={src}
                    className={`${commonMediaClass} max-h-[400px]`}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      )}

      {/* Post Stats */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-500 dark:text-gray-400">
        <span>{likeCount} Likes</span>
        <span>{commentsList.length} Comments</span>
      </div>

      {/* Post Actions */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-1 flex justify-around">
        <ActionButton
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.97l-1.9 3.8a2 2 0 00.382 2.375l2.28 2.28M7 20H4a2 2 0 01-2-2v-6a2 2 0 012-2h3"
              ></path>
            </svg>
          }
          label="Like"
          onClick={handleLike}
          isActive={isLiked}
        />
        <ActionButton
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
          }
          label="Comment"
          onClick={handleCommentClick}
        />
        <ActionButton
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              ></path>
            </svg>
          }
          label="Share"
          onClick={() => openModal("share", { post: props })}
        />
        <ActionButton
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          }
          label="Send"
          onClick={() => openModal("send", { post: props })}
        />
      </div>

      {/* Comment Section */}
      {isCommentsOpen && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* New Comment Form */}
          <form
            onSubmit={handlePostComment}
            className="flex items-start space-x-3 mb-4"
          >
            <img
              src={
                authUser?.avatarUrl || "https://picsum.photos/seed/user/100/100"
              }
              alt={authUser?.name || "You"}
              className="w-9 h-9 rounded-full"
            />
            <div className="flex-1">
              <input
                ref={commentInputRef}
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full bg-gray-100 dark:bg-gray-700 border border-transparent rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:bg-white dark:focus:bg-gray-600"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white font-semibold text-sm py-2 px-4 rounded-full hover:bg-purple-700 disabled:opacity-50"
              disabled={!newComment.trim()}
            >
              Post
            </button>
          </form>

          {/* Existing Comments */}
          <div className="space-y-4">
            {commentsList.map((comment, index) => (
              <div key={index} className="flex items-start space-x-3">
                <img
                  src={comment.avatarUrl}
                  alt={comment.author}
                  className="w-9 h-9 rounded-full"
                />
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex-1">
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">
                    {comment.author}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
