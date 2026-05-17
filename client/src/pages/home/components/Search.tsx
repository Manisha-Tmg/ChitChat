import type React from "react";

function Search({
  searchKey,
  setSearchKey,
}: {
  searchKey: string;
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="user-search-area">
      <input
        type="text"
        className="user-search-text"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <i className="fa fa-search user-search-btn" aria-hidden="true"></i>
    </div>
  );
}

export default Search;
