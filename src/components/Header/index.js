import { Container, IconSignOut } from "./styles";
import imgLogo from "../../assets/logo.png";
import imgProfile from "../../assets/profileStandard.png";
import { getUser } from "../../services/security";
import { Link } from "react-router-dom";


function Header() {

    const user = getUser();
    console.log(user);

    return (
        <Container>
            <div>
                <img src={imgLogo} id="logo" />
                <img src={user.image} width="80px" height="80px" />
                <p>{user.name}</p>
                <Link to="/upload-profile">UploadImageProfile</Link>

            </div>
            <IconSignOut />
        </Container>
    )
}

export default Header;