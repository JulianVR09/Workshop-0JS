document.getElementById("fetch-posts").addEventListener("click", () => {
  fetchPosts();
});

const fetchPosts = async () => {
  await fetch("https://api.escuelajs.co/api/v1/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((posts) => {
      displayPosts(posts);
    })
    .catch((error) => {
      displayError(error);
    });
};

const display = (posts) => {
  const postlist = document.getElementById("postlist");
  postlist.innerHTML = "";
  posts.forEach((post) => {
    const listItem = document.createElement("LI");
    listItem.textContent = `Title: ${post.title}`;
    postlist.appendChild(listItem);
  });
};

const displayError = (error) => {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = `Error: ${error.message}`;
};

