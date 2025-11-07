import React from "react";

const ConfirmModal = ({
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Yes",
  cancelLabel = "Cancel",
  danger = false,
  isProcessing = false,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm mx-4 p-6 text-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        {message && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {message}
          </p>
        )}
        <div className="mt-6 flex justify-center space-x-4">
          {cancelLabel ? (
            <button onClick={onClose} className="btn btn-secondary flex-1">
              {cancelLabel}
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={onConfirm}
            disabled={isProcessing}
            className={`btn flex-1 ${
              danger
                ? "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {isProcessing ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
