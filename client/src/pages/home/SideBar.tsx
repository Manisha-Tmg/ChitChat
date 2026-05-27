import { useState } from "react";
import Search from "./components/Search";
import UserList from "./components/UserList";
import type { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
};
const SideBar = ({ socket }: Props) => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <div className="app-sidebar">
      <Search searchKey={searchKey} setSearchKey={setSearchKey}></Search>
      <UserList
        searchKey={searchKey}
        socket={socket}
        // onlineUser={onlineUser}
      ></UserList>
    </div>
  );
};

export default SideBar;
