import { useState, useEffect } from "react";
import axios from "axios"

const initialPostData = {
  title: "",
  author: "",
  image: "",
  content: "",
  category: "",
  state: false,
  tags: [],
}

const availableTags = [
  "HTML",
  "CSS",
  "JavaScript",
  "Express",
  "Node",
  "React",
];


function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(initialPostData);
  
  useEffect(() => {
    if (newPost.state) {
      alert("Stai pubblicando un post!");
    }
  }, [newPost.state]);

  const handleNewPostSubmit = (event) => {
    event.preventDefault();

    if (newPost.title.trim() === "" || posts.some((curPost) => curPost.title === newPost.title)) {
      const message = newPost.title.trim() === ""
        ? "Aggiungi un titolo"
        : "Titolo già presente";
      return alert(message);
    }

    const postToAdd = {
      ...newPost,
      id: Date.now(),
    };

    setPosts([...posts, postToAdd]);
    setNewPost(initialPostData);
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
    const newArray = posts.filter(curPost => curPost.title !== postToRemove.title);
    setPosts(newArray);
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

          {/* Author Input */}
          <div className="input author-name">
            <label htmlFor="AuthorName">Nome Autore</label>
            <input
              type="text"
              placeholder="Nome dell'Autore"
              id="AuthorName"
              name="author"
              value={newPost.author}
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

          {/* Category Select */}
          <div className=" input category">
            <label htmlFor="Category">Categoria</label>
            <select
              id="Category"
              name="category"
              value={newPost.category}
              onChange={handleInputChange}
            >
              <option value="" selected disabled hidden>Seleziona una categoria</option>
              <option value="News">News</option>
              <option value="Update">Update</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Tips">Tips</option>
            </select>
          </div>


          {/* Content */}
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
          <div className=" input post-tags">
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
                  {curTag}
                </div>
              ))}
            </div>
          </div>

          {/* State Checkbox */}
          <div className="input post-state">
            <label htmlFor="PostState">Pubblica</label>
            <input
              type="checkbox"
              id="PostState"
              name="state"
              checked={newPost.state}
              onChange={handleInputChange}
            />
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
                    src={curPost.image ? curPost.image : "https://placehold.co/600x400"}
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
                <div className="card-footer">
                  <div className="author">{curPost.author || "Autore Sconosciuto"}</div>
                  <div className="publish">
                    {curPost.state ? (
                      <div><span className="check">✔</span> Pubblicato</div>
                    ) : (
                      <div><span className="cross">✘</span> Bozza</div>
                    )}
                  </div>
                  <div className="category">{curPost.category}</div>
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
