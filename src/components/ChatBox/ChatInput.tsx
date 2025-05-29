// interface IProps {
//   onChat: (message: string) => void;
// }
const ChatInput = () => {
  return (
    <div className="flex items-center gap-2 border-t border-gray-200 bg-[#f0f0f0] p-3">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none"
      />
      <button className="cursor-pointer rounded-full bg-primary/70 p-2 text-white transition hover:bg-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
  );
};

export default ChatInput;
