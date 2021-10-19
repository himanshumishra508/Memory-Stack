import { useHistory } from "react-router";
import { HOME_PAGE_ROUTE, SIGNUP_PAGE_ROUTE } from "../../routes/route-paths";

function Navbar() {
  const navigator = useHistory();
  function handleSignup() {
    navigator.push(SIGNUP_PAGE_ROUTE);
  }

  return (
    <div className="navbar">
      <a
        onClick={() => {
          navigator.push(HOME_PAGE_ROUTE);
        }}
        className="logo"
      >
        MEMORY STACK
      </a>
      <div className="buttons">
        <a href="" className="navbarButton" onClick={handleSignup}>
          signup
        </a>
        <a href="" className="navbarButton">
          github
        </a>
      </div>
    </div>
  );
}
export default Navbar;
