import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function SetAvatarPage() {
  const { isAuthenticated, navigate, uploadImage /*getUploadedImage*/ } =
    useAuth();
  const [file, setFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ left: 0, top: 0 });
  const [counter, setCounter] = useState(0);

  const auth = async () => {
    if (!localStorage.getItem("chat-app-user") && isAuthenticated === false) {
      navigate("/login");
    }
  };
  const move = () => {
    const newLeft = Math.random() * (window.innerWidth - 200);
    const newTop = Math.random() * (window.innerHeight - 70);
    setButtonPosition({ left: newLeft, top: newTop });
  };
  useEffect(() => {
    // getUploadedImage();
    auth();
    move();
  }, []);

  const handleOnChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setIsSelected(true);
    move();
  };

  const handleUpload = () => {
    if (file) {
      const formdata = new FormData();
      formdata.append("file", file);
      uploadImage(formdata);
    } else {
      setCounter(counter + 1);
      move();
    }
  };

  return (
    <div className="avatar-page">
      {file ? (
        <img src={URL.createObjectURL(file)} alt="Preview" />
      ) : counter < 2 ? (
        <p>Select an image 😊</p>
      ) : counter < 5 ? (
        <p>Select an image 🙃 {counter - 1}</p>
      ) : counter < 8 ? (
        <p>Select an image 🤨 {counter - 1}</p>
      ) : counter == 8 ? (
        <p>I'm Done bye 😠</p>
      ) : null}
      <input type="file" accept="image/*" onChange={handleOnChange} />
      <button
        onClick={handleUpload}
        style={{
          position: "absolute",
          left: isSelected
            ? "50%"
            : `${(buttonPosition.left / window.innerWidth) * 100}%`,
          top: isSelected
            ? "50%"
            : `${(buttonPosition.top / window.innerHeight) * 100}%`,
          transform: isSelected ? "translate(-50%, 250%)" : "none",
        }}
      >
        Upload image
      </button>
    </div>
  );
}

export default SetAvatarPage;
