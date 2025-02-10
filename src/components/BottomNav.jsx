import React from "react";

const BottomNav = ({ currentView, onNavigate }) => {
  return (
    <div className="fixed max-w-md  mx-auto bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around py-4">
          <button
            className={`flex flex-col items-center ${
              currentView === "home" ? "text-purple-500" : "text-gray-400"
            }`}
            onClick={() => onNavigate("home")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span className="text-sm">Home</span>
          </button>
          <button
            className={`flex flex-col items-center ${
              currentView === "explore" ? "text-purple-500" : "text-gray-400"
            }`}
            onClick={() => onNavigate("explore")}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M512 465.066667c-25.813333 0-46.933333 21.12-46.933333 46.933333s21.12 46.933333 46.933333 46.933333a46.933333 46.933333 0 0 0 0-93.866666zM512 85.333333C276.266667 85.333333 85.333333 276.266667 85.333333 512c0 235.52 190.933333 426.666667 426.666667 426.666667s426.666667-191.146667 426.666667-426.666667c0-235.733333-190.933333-426.666667-426.666667-426.666667z m93.44 520.106667L256 768l162.56-349.44L768 256l-162.56 349.44z" />
            </svg>
            <span className="text-sm">Explore</span>
          </button>
          <button 
            className={`flex flex-col items-center ${currentView === 'saved' ? 'text-purple-500' : 'text-gray-400'}`}
            onClick={() => onNavigate('saved')}
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
              />
            </svg>
            <span className="text-sm">Saved</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
