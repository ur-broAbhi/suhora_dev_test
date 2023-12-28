import authService from "../../appwrite/auth";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slice/auth/authSlice";

function LogoutBtn() {
  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    await authService.logout();
    dispatch(logout());
  };

  return (
    <button
      className="inline-block px-6  hover:bg-blue-100 hover:text-black rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
