// const { default: axios } = require("axios");

/* *************************
 *** POST JOURNAL ***
 ************************** */
function postJournal() {
  //DOM Elements
  let title = document.getElementById("title").value;
  let date = document.getElementById("date").value;
  let entry = document.getElementById("entry").value;

  //access token
  const accessToken = localStorage.getItem("SessionToken");

  //entry
  let newEntry = { journal: { title: title, date: date, entry: entry } };

  //headers
  let headers = {
    "Content-Type": "application/json",
    Authorization: accessToken,
  };

  fetch("http://localhost:3000/journal/create", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(newEntry),
  })
    .then((res) => {
      console.log(res.json());
      displayMine();
    })
    .catch((err) => console.log(err));
}

/* *************************
 *** UPDATE JOURNAL ***
 ************************** */
function editJournal(postId) {
  console.log(postId);
  const fetch_url = `http://localhost:3000/journal/update/${postId}`;
  const accessToken = localStorage.getItem("SessionToken");

  let card = document.getElementById(postId);
  let input = document.createElement("input");

  if (card.childNodes.length < 2) {
    card.appendChild(input);
    input.setAttribute("type", "text");
    input.setAttribute("id", "updatedEntry");
    input.setAttribute("placeholder", "Edit your journal entry");
  } else {
    let updated = document.getElementById("updatedEntry").value;
    let updatedEntry = { journal: { entry: updated } };

    const response = fetch(fetch_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(updatedEntry),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        displayMine();
      })
      .catch((err) => console.log(err));

    card.removeChild(card.lastChild);
  }
}

/* *************************
 *** DELETE JOURNAL ***
 ************************** */
function deleteJournal(postId) {
  console.log(postId);

  const fetch_url = `http://localhost:3000/journal/delete/${postId}`;
  const accessToken = localStorage.getItem("SessionToken");

  fetch(fetch_url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  })
    .then((res) => {
      console.log(res);
      displayMine();
    })
    .catch((err) => console.log(err));
}
