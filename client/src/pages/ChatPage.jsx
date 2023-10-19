import { useEffect, useState } from "react";
import { useAuth } from '../contexts/AuthContext'
import { getAllContacts } from '../api/client'
import { Contacts } from '../components'

function ChatPage() {
  const [contacts, setContacts] = useState("Contacts")
  // const [currentUser, setCurrentUser] = useState(undefined)

  const { navigate, isAuthenticated } = useAuth() 

  
  const auth = async () => {
    const user = JSON.parse(localStorage.getItem("chat-app-user"))
    console.log(user);
    if (!user && user.isProfileImageSet === false) {
      navigate("/register")
    } else if (user && user.isProfileImageSet === false) {
      navigate("/set-avatar"); 
    }else {
      setContacts("Contacts2")
      // setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
    }
  }
  useEffect(() => {
    auth()
  }, [])

  // const setAllContacts = async (currentUser) => {
  //   if (currentUser) {
  //     const res = await getAllContacts(currentUser._id)
  //     setContacts(res.data)
  //   }
  // }
  // useEffect( () => {
  //   setAllContacts(currentUser)
  // }, [currentUser])

  return (
    <div className="chat">
      <div className="chat-container">
        <Contacts contacts={contacts}/>
      </div>
    </div>
  );
}

export default ChatPage;
