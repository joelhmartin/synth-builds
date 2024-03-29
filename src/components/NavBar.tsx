import { Button } from "@chakra-ui/react";
import { Link } from "wouter";
import useAuthStore from "../authStore";

const NavBar = () => {
  const { token, logout } = useAuthStore();

  return (
    <>
      <header>
        <div className="header-inner">
          <Link to="/">
            <img className="logo" src="/images/synthesizerBig.png" alt="" />
          </Link>
          <div>
            <Link className="right-nav-child" title="Home" to="/account">
              Account
            </Link>
            {token ? (
              <Button className="right-nav-child" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Link className="right-nav-child" title="Home" to="/login">
                Login/Register
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
