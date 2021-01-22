/* *************************
 *** DISPLAY BY USER ***
 ************************** */
function displayMine() {
  const accessToken = localStorage.getItem("SessionToken");
  console.log(accessToken);
  fetch("http://localhost:3000/journal/mine", {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: accessToken,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.error("Error:", err))
    .then((res) => displayJournals(res));
}

/* *************************
 *** DISPLAY ALL ***
 ************************** */
function displayAll() {
  const accessToken = localStorage.getItem("SessionToken");

  fetch("http://localhost:3000/journal/", {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: accessToken,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.error("Error:", err))
    .then((res) => displayJournals(res));
}

/* *************************
 *** DISPLAY BY TITLE ***
 ************************** */
function displayByTitle() {
  let journalTitle = document.getElementById("searchBar").value;
  const accessToken = localStorage.getItem("SessionToken");

  fetch(`http://localhost:3000/journal/${journalTitle}`, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: accessToken,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.error("Error:", err))
    .then((res) => displayJournals(res));
}

/* ***********************************
 *** APPEND JOURNALS TO THE PAGE***
 ********************************** */
function displayJournals(res) {
  console.log(res);
  accessToken = localStorage.getItem("SessionToken");

  //elements
  let display = document.getElementById("journals");

  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }

  if (res.length == 0) {
    display.appendChild(header);
    let header = document.createElement("h5");
    header.textContent = "You haven't made any posts yet!";
    header.setAttribute("class", "noPosts");
  } else {
    for (i in res) {
      let card = document.createElement("div");
      let header = document.createElement("h5");
      let body = document.createElement("div");
      let subtitle = document.createElement("h6");
      let para = document.createElement("p");
      let editBtn = document.createElement("button");
      let deleteBtn = document.createElement("button");

      let current = res[i];
      let title = current.title;
      let date = current.date;
      let entry = current.entry;

      card.setAttribute("id", current.id);
      card.setAttribute("class", "card");
      body.setAttribute("class", "card-body");
      header.setAttribute("class", "card-subtitle mb-2 text-muted");
      subtitle.setAttribute("class", "card-text");

      editBtn.setAttribute("class", "btn btn-dark editBtn");
      editBtn.setAttribute("type", "button");
      editBtn.setAttribute("onclick", `editJournal(${current.id})`);

      deleteBtn.setAttribute("class", "btn btn-dark editBtn");
      deleteBtn.setAttribute("type", "button");
      deleteBtn.setAttribute("onclick", `deleteJournal(${current.id})`);

      header.textContent = title;
      subtitle.textContent = date;
      para.textContent = entry;
      editBtn.textContent = "Edit";
      deleteBtn.textContent = "Delete";

      display.appendChild(card);
      card.appendChild(body);
      body.appendChild(header);
      body.appendChild(subtitle);
      body.appendChild(para);
      body.appendChild(editBtn);
      body.appendChild(deleteBtn);
    }
  }
  if (accessToken === "undefined") tokenChecker();
}
