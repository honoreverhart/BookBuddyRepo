/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useNavigate } from "react-router-dom";
import { patch } from "../api";

export default function SingleBook({ book, token}) {
  const navigate = useNavigate();

  function showDetails() {
    navigate(`/${book.id}`);
  }

  async function handleChange(id) {
    await patch(id, token);
  }

  return (
    <>
      <div className="singleBook">
        <img className="image" src={book.coverimage} />
        <h1>Title: {book.title}</h1>
        <h3>Author: {book.author}</h3>
        {token ? (
          <div>
            <button className="button" onClick={showDetails}>
              See Details
            </button>
            {book.available ? (
              <button className="button" onClick={() => handleChange(book.id)}>
                Checkout Book!
              </button>
            ) : (
              <p>Book Not Available</p>
            )}
          </div>
        ) : (
          <button className="button" onClick={showDetails}>
            See Details
          </button>
        )}
      </div>
    </>
  );
}
