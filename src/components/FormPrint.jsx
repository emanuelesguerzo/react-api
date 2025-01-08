const FormPrint = ({ handleNewPostSubmit, handleInputChange, newPost, setNewPost, availableTags}) => {

    return (

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
    )
}

export default FormPrint;