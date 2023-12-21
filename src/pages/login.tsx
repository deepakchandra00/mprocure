import bgimage from "../assets/images/bgimage.png";
import { SignInButton } from './../component/msal/SignInButton';
import LogoImgDark from './../assets/images/Cargill_white.png';
import { Typography } from "@mui/material";

export default function Login() {
  return (
    <>
      <div
        style={{
          backgroundColor: "#f4f4f4",
          backgroundSize: "cover",
          padding: "15px",
          height: `100vh`,
          color: "#FFF",
          justifyContent: "center",
          display: "flex",
          backgroundImage: `url(${bgimage})`,
        }}
      >
        <div className="loginArea">
          <img src={LogoImgDark} className="cargil-logo" alt="Cargill" style={{ cursor: 'pointer', marginTop: "-8px", height: '65px' }} />
          <Typography mt={"15px"}>Welcome</Typography>
          <Typography mb={"25px"}>mProcure Web</Typography>
          <SignInButton />
        </div>
      </div>
    </>
  );
}
