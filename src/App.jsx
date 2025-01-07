import { useState, useEffect } from "react";
import axios from "axios"

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
        console.log(resp.data.data)
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

  const getImgSrc = (path) => {
    if (!path) {
      return "https://placehold.co/600x400";
    }

    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    } else {
      return `http://localhost:3000${path}`;
    }
  }

  return (
    <>
      <header>
        <h1>React Form</h1>
      </header>

      <main>
        <form action="" className="container" onSubmit={handleNewPostSubmit}>

          {/* Title Input */}
          <div className="input post-title">
            <label htmlFor="PostName">Titolo</label>
            <input
              type="text"
              placeholder="Titolo del Post"
              id="PostName"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
            />
          </div>

          {/* Image Input */}
          <div className=" input post-image">
            <label htmlFor="PostImage">URL Immagine</label>
            <input
              type="text"
              placeholder="URL Immagine del Post"
              id="PostImage"
              name="image"
              value={newPost.image}
              onChange={handleInputChange}
            />
          </div>

          {/* Content Input */}
          <div className="input post-content">
            <label htmlFor="PostContent">Contenuto</label>
            <textarea
              rows="4"
              type="text"
              placeholder="Contenuto del Post..."
              id="PostContent"
              name="content"
              value={newPost.content}
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* Tags Checkboxes */}
          <div className="input post-tags">
            <label htmlFor="TagContainer">Tag</label>
            <div className="tag-container" id="TagContainer">
              {availableTags.map((curTag) => (
                <div key={curTag} className="inputTag">
                  <input
                    className=""
                    type="checkbox"
                    id={curTag}
                    name="tags"
                    value={curTag}
                    checked={newPost.tags.includes(curTag)}
                    onChange={(event) => {
                      const { value, checked } = event.target;

                      setNewPost((curPost) => ({
                        ...curPost,
                        tags: checked
                          ? [...curPost.tags, value]
                          : curPost.tags.filter((curTag) => curTag !== value),
                      }));
                    }}
                  />
                  <div className={`tag ${curTag.toLowerCase()}`}>
                    {curTag}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn submit"
          >
            Crea Post
          </button>

        </form>

        {posts.length > 0 ? (
          <ul className="container row">
            {posts.map((curPost) => (
              <li
                key={curPost.id}
                className="card"
              >
                <div className="card-image">
                  <img
                    src={getImgSrc(curPost.image)}
                    alt="L'immagine del Post" />
                </div>
                <div className="tags-list">
                  {curPost.tags.length > 0 &&
                    curPost.tags.map((curTag) => (
                      <span
                        key={curTag}
                        className={`tag ${curTag.toLowerCase()}`}
                      >
                        {curTag}
                      </span>
                    ))}
                </div>
                <div className="card-heading">
                  <h2>{curPost.title}</h2>
                  <button
                    className="btn remove"
                    onClick={() => { removePost(curPost) }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
                <div className="card-content">
                  <p>{curPost.content}</p>
                </div>
              </li>
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
