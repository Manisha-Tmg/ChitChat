import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../redux/loaderSlice";
import { setUser } from "../../redux/userSlice";
import { uploadProfilePic } from "../../apiCalls/users";
import moment from "moment";

const Profile = () => {
  const users = useSelector((state: any) => state.user.user);
  const [image, setImage] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (users?.profilePic) {
      setImage(users.profilePic);
    }
  }, [users]);
  function getInitials() {
    const f = users?.firstname?.charAt(0)?.toUpperCase() || "";
    const l = users?.lastname?.charAt(0)?.toUpperCase() || "";

    return f + l;
  }

  function getFullname() {
    const fname = users?.firstname
      ? users.firstname.charAt(0).toUpperCase() +
        users.firstname.slice(1).toLowerCase()
      : "";

    const lname = users?.lastname
      ? users.lastname.charAt(0).toUpperCase() +
        users.lastname.slice(1).toLowerCase()
      : "";

    return `${fname} ${lname}`.trim();
  }
  const onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };
  };

  const updateProfilePic = async () => {
    try {
      dispatch(showLoader());
      const response = await uploadProfilePic(image);
      dispatch(hideLoader());

      if (response.success) {
        toast.success(response.message);
        dispatch(setUser(response.data));
      } else {
        toast.error(response.message);
      }
    } catch (err: any) {
      toast.error(err.message);
      dispatch(hideLoader());
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-pic-container">
        {image && (
          <img
            src={image}
            alt="Profile Pic"
            className="user-profile-pic-upload"
          />
        )}
        {!image && (
          <div className="user-default-profile-avatar">{getInitials()}</div>
        )}
      </div>

      <div className="profile-info-container">
        <div className="user-profile-name">
          <h1>{getFullname()}</h1>
        </div>
        <div>
          <b>Email: </b> {users?.email}
        </div>
        <div>
          <b>Account Created: </b>
          {moment(users?.createdAt).format("MMM DD, YYYY")}
        </div>
        <div className="select-profile-pic-container">
          <input type="file" onChange={onFileSelect} />
          <button className="upload-image-btn" onClick={updateProfilePic}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
