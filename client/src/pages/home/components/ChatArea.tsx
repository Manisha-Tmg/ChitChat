import { useSelector } from "react-redux";

const ChatArea = () => {
  const selectedChats = useSelector((state: any) => state.user.selectedChat);
  return <> {selectedChats && <div>{selectedChats._id}</div>}</>;
};

export default ChatArea;
