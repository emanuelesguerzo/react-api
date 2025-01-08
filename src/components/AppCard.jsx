const AppCard = ({curPost, onRemove}) => {

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

    <li
        key={curPost.id}
        className="card"
    >
        <div className="card-image">
            <img
                src={getImgSrc(curPost.image)}
                alt="L'immagine del Post" 
            />
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
                onClick={onRemove}
            >
                <i className="fa-solid fa-trash"></i>
            </button>
        </div>
        <div className="card-content">
            <p>{curPost.content}</p>
        </div>
    </li>
    )
}

export default AppCard;