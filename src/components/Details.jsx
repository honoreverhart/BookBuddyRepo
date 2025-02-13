import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setSingleBook } from "../api";
import { useNavigate } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function selectBook(id) {
      setBookDetails(await setSingleBook(id));
    }
    selectBook(id);
  }, []);

  return (
    <>
      <div className="singleBook">
        <h1>Title: {bookDetails.title}</h1>
        <img className="singleBookImg" src={bookDetails.coverimage} />
        <h3>Author: {bookDetails.author}</h3>
        <p>{bookDetails.description}</p>
        <p>{bookDetails.availabe}</p>
        <button
          className="button"
          onClick={() => {
            navigate("/");
          }}
        >
          {" "}
          Back{" "}
        </button>
      </div>
    </>
  );
}
