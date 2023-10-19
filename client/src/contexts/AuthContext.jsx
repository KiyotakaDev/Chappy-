import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest } from "../api/auth.js";
import { uploadImageRequest, /*getAvatarRequest*/ } from "../api/client.js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider component");
  return context;
};

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [image, setImage] = useState("");
  // const [isImageSet, setIsImageSet] = useState(false);
  const navigate = useNavigate();

  const register = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.data.status) {
        localStorage.setItem("chat-app-user", JSON.stringify(res.data.user));
        navigate("/set-avatar");
      }
    } catch (error) {
      console.log({ message: error.response.data.message });
    }
  };

  const login = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res.data.status) {
        localStorage.setItem("chat-app-user", JSON.stringify(res.data.user));
        setIsAuthenticated(true);
        navigate("/set-avatar");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const uploadImage = async (formdata) => {
    try {
      const res = await uploadImageRequest(formdata);
      if (res.data.status) {
        localStorage.setItem("chat-app-user", JSON.stringify(res.data.user));
        navigate("/")
      }
    } catch (error) {
      console.error({ message: error });
    }
  };

  // const getUploadedImage = async () => {
  //   try {
  //     const res = await getAvatarRequest();
  //     console.log(res);
  //     setIsImageSet(res.data.isProfileImageSet);
  //     setImage(res.data.profileImage);
  //   } catch (error) {
  //     console.error({ message: error });
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        setIsAuthenticated,
        isAuthenticated,
        navigate,
        register,
        login,
        uploadImage,
        // getUploadedImage,
        // image,
        // setImage,
        // isImageSet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
