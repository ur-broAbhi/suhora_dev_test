import { useEffect } from "react";
import { Button, Container } from "..";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const authStatus = useAppSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
  }, [authStatus, navigate]);

  return (
    <Container>
      <div className="flex justify-center flex-col space-y-7 my-8">
        <div className="text-center text-4xl">Welcome to Dashboard</div>
        <div className="flex justify-center space-x-3 ">
          <input
            type="search"
            name=""
            id=""
            className="rounded-md text-black px-2 outline-none"
            placeholder="Search users"
          />
          <Button type="submit">Get All Users</Button>
        </div>
      </div>
    </Container>
  );
}

export default Dashboard;
