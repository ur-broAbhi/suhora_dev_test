import { Link } from "react-router-dom";
import { Container, LogoutBtn } from "../index";
import { useAppSelector } from "../../store/hooks";

function Header() {
  const authStatus = useAppSelector((state) => state.auth.status);
  const navItems = [
    {
      name: "Dashboard",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ];

  return (
    <Container>
      <nav className="flex py-4 items-center justify-between">
        <Link to="/">LOGO</Link>
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link to={item.slug} key={item.name}>
              {item.active ? item.name : null}
            </Link>
          ))}
          {authStatus && <LogoutBtn />}
        </div>
      </nav>
    </Container>
  );
}

export default Header;
