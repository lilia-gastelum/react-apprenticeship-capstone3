import { USER_INFO } from "../../utils/constants";
import { storage } from "../../utils/storage";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../utils/providers/Auth.provider";

const UserWidget = () => {
    const history = useHistory();
    const user = storage.get(USER_INFO);
    const {name, email, avatarUrl} = user;
    const {logout} = useAuth();

    const logoutRedirect = async () =>{
        await logout();
        history.push('/login');
    };

    return(
        <div className="user-widget">
            <img className="avatar-widget" alt="avatar" src={avatarUrl}/>
            <br/>
                <p className="name">{name}</p>
                <p className="email">{email}</p>
                <button className="sign-out" onClick={logoutRedirect}>Sign out</button>
          </div>
    );
}

export default UserWidget;