/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import getBooks from "../api";
import { useState, useEffect } from "react";
import SingleBook from "./SingleBook";
import bookLogo from "../assets/books.png";
import { useNavigate } from "react-router-dom";

export default function Books({ token, setToken }) {
  const [books, setBooks] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  async function getData() {
    const bookData = await getBooks();
    setBooks(bookData);
  }

  useEffect(() => {
    getData();
  }, []);

  const searchBook = searchParam
    ? books.filter(
        (book) =>
          book.title &&
          book.title.toLowerCase().startsWith(searchParam.toLowerCase())
      )
    : books;

  return (
    <div className="body">
      <h1 className="header">
        <img id="logo-image" src={bookLogo} />
        Library of Wonder!
      </h1>

      {token ? (
        <div>
          <button className="button" onClick={() => navigate("/account")}>
            Back to Account
          </button>
          <button
            className="button"
            onClick={() => {
              setToken(null);
              localStorage.removeItem("token")
            }}
          >
            Sign-out
          </button>
        </div>
      ) : (
        <div>
          <button
            className="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
          <button
            className="button"
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign Up!
          </button>
        </div>
      )}

      <div>
        <label className="searchBook">
          Search for Book:{" "}
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
        </label>
      </div>
      <div className="allBooks">
        {searchBook.map((book) => {
          return (
            <SingleBook
              key={book.id}
              book={book}
              getData={getData}
              token={token}
              setToken={setToken}
            />
          );
        })}
      </div>
    </div>
  );
}
