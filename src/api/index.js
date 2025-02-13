const BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export default async function getBooks() {
  try {
    const response = await fetch(`${BASE_URL}/books`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    const result = json.books;
    return result;
  } catch (err) {
    console.error("Uh oh, trouble fetching books!", err);
  }
}

export async function setSingleBook(id) {
  try {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result.book;
  } catch (error) {
    console.log(error);
  }
}
export async function patch(id, token) {
  try {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        available: false,
      })
    });
    const result = await response.json();
  } catch (error) {
    console.log(error);
  }
}
export async function getRegisterToken(formData) {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getLoginToken(formData) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

export async function reservation(token) {
  try {
    const response = await fetch(`${BASE_URL}/reservations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function usersMe(token) {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function returnBook(reservationId, token){
  try {
    if(!reservationId){throw new Error("missing reservation id")}
    if(!token){throw new Error("missing token")}
    const response = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete reservation. Status: ${response.status}`);
    }

    const result = await response.json();
    return(result)
  } catch (error) {
    console.log(error);
  }
}

