import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts";

const useAdminRedirect = () => {
  const navigate = useNavigate();
  const { userInfo, token } = useAuthContext();

  //console.log("userInfo.is_admin", userInfo.is_admin);

  useEffect(() => {
    if (token && userInfo && userInfo.is_admin !== 1) {
      navigate("/");
    }
  }, [userInfo, navigate, token]);
};

export default useAdminRedirect;
