import { Avatar } from "boring-avatars";
import "./Avatar.css";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import request from "../../modules/request";
import { useNavigate } from "react-router-dom";
function AvatarPage({ setIsChoosingAvt, setInfo}) {
    const navigate = useNavigate();
    // TODO get avatar from server
    const [isLoading, setIsLoading] = useState(true);
    const [avatarList, setAvatarList] = useState([]);
    // get
    useEffect(() => {
        request.get("viewer/allAvatar", (res) => {
            setAvatarList(res.data);
            console.log(res.data);
            setIsLoading(false);
        });
    }, []);

    function handleChangeAvatar(e, src) {
        setInfo((prev) => ({...prev, avatar: src}))
        setIsChoosingAvt(false);
    }

    function handleCancel() {
        setIsChoosingAvt(false);
    }
    if (isLoading) return <Loading />;
    return (
        <div className="avatar-container">
            <div className="avatar-content">
                <h2 className="avatar-heading">Choose avatar you like</h2>
                <div className="avatar-grid">
                    {avatarList.map((avatar) => {
                        return (
                            <img
                                src={avatar.src}
                                key={avatar.avatar_id}
                                onClick={(e) =>
                                    handleChangeAvatar(
                                        e,
                                        avatar.src
                                    )
                                }
                            />
                        );
                    })}
                </div>
            </div>
            <div>
                <button className="avatar-cancel" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default AvatarPage;
