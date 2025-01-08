import { useState, useEffect } from "react";
import axios from "axios"
import AppCard from "./components/AppCard";
import FormPrint from "./components/FormPrint";
import AppHeader from "./components/AppHeader";


const initialPostData = {
  title: "",
  content: "",
  image: "",
  tags: [],
}

const availableTags = [
  "Dolce",
  "Primo",
  "Rustico",
  "Tradizionale",
  "Snack",
  "Salato",
  "Fritto",
  "Semplice",
  "Colazione",
  "Vegetariano",
  "Colorato",
]

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(initialPostData);

  useEffect(() => {
    axios.get("http://localhost:3000/posts")
      .then((resp) => {
        setPosts(resp.data.data)
      })
      .catch((err) => {
        console.error("Errore durante il recupero dati:", err)
      })
  }, []);

  const handleNewPostSubmit = (event) => {
    event.preventDefault();

    if (newPost.title.trim() === "" || posts.some((curPost) => curPost.title === newPost.title)) {
      const message = newPost.title.trim() === ""
        ? "Aggiungi un titolo"
        : "Titolo già presente";
      return alert(message);
    }

    axios.post("http://localhost:3000/posts", newPost)
      .then((resp) => {
        const newArray = [...posts, resp.data];
        setPosts(newArray);
        setNewPost(initialPostData)
      })
      .catch((err) => {
        console.error("Errore durante l'invio del post:", err)
      })
  }

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setNewPost((curPost) => ({
      ...curPost,
      [name]: newValue,
    }));
  };

  const removePost = (postToRemove) => {
    axios.delete(`http://localhost:3000/posts/${postToRemove.id}`)
      .then(() => {
        setPosts(posts.filter((curPost) => curPost.id !== postToRemove.id));
      })
      .catch((err) => {
        console.error("Errore durante la cancellazione del post:", err);
      });
  };

  return (
    <>
      <AppHeader />

      <main>
        <FormPrint
          handleNewPostSubmit={handleNewPostSubmit}
          handleInputChange={handleInputChange}
          newPost={newPost}
          availableTags={availableTags}
          setNewPost={setNewPost}
        />

        {posts.length > 0 ? (
          <ul className="container row">
            {posts.map((curPost) => (
              <AppCard
                key={curPost.id}
                curPost={curPost}
                onRemove={() => {
                  removePost(curPost)
                }}
              />
            ))}
          </ul>
        ) : (
          <p className="empty-list container row">
            La tua lista è vuota! Aggiungi qualche Post!
          </p>
        )}
      </main>

    </>
  )
}

export default App;
