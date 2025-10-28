import React from 'react';

const LogoutModal = ({ onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm mx-4 p-6 text-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Confirm Logout</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    Are you sure you want to log out of your MindMile account?
                </p>
                <div className="mt-6 flex justify-center space-x-4">
                    <button 
                        onClick={onClose} 
                        className="btn btn-secondary flex-1"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="btn bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 flex-1"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;