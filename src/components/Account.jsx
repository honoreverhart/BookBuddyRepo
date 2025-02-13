/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useNavigate } from "react-router-dom";
import { reservation, usersMe, returnBook } from "../api";
import { useState, useEffect } from "react";

export default function Account({ token, setToken }) {
  const [deleteBook, setDeleteBook] = useState(null);
  const navigate = useNavigate();
  const [reserveBook, setReserveBook] = useState([]);
  const [userDetail, setUserDetail] = useState({
    firstname: "",
    lastname: "",
  });

  useEffect(() => {
    async function fetchReservation() {
      const checkedOutBook = await reservation(token);
      if (checkedOutBook && checkedOutBook.reservation) {
        setReserveBook(checkedOutBook.reservation);
      }
    }
    if (token) {
      fetchReservation(token);
    }
  }, [deleteBook, token]);

  useEffect(() => {
    async function fetchUserMe() {
      const userInfo = await usersMe(token);
      if (userInfo) {
        setUserDetail(userInfo);
      }
    }

    fetchUserMe();
  }, []);

  async function handleChange(reservationId, userToken) {
    if (!userToken) {
      return console.error("Token is Missing");
    }
    try {
      const result = await returnBook(reservationId, userToken);
      if (result?.error) {
        return console.error(result.error);
      }
      setDeleteBook((prev) => !prev);
    } catch (error) {
      console.error();
    }
  }

  const handleSignOut = () => {
    navigate("/login");
    setToken(null)
    localStorage.removeItem("token")
  };

  return (
    <div>
      <h1>
        Welcome {userDetail.firstname}
        {userDetail.lastname}!!
      </h1>
      <button className="button" onClick={handleSignOut}>
        Sign-Out
      </button>
      <h3>Your Books: </h3>
      {reserveBook.length === 0 ? (
        <p>You don't have any books reserved yet!</p>
      ) : (
        <table className="table">
          <tbody>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
            </tr>
            {reserveBook &&
              reserveBook.map((book) => {
                return (
                  <tr>
                    <td>
                      {book.coverimage && (
                        <img
                          src={book.coverimage}
                          style={{ width: "50px", height: "auto" }}
                        />
                      )}
                    </td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.description}</td>
                    <td>
                      <button
                        className="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleChange(book.id, token);
                          setDeleteBook(true);
                        }}
                      >
                        Return
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      <button className="button" onClick={() => navigate("/")}>
        View All Books
      </button>
    </div>
  );
}
