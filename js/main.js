const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

//Search movies.json and filter it
const searchMovies = async (searchText) => {
  const res = await fetch("../data/movies.json");
  const movies = await res.json();

  //Get matches to current text input
  let matches = movies.filter((movie) => {
    const regex = new RegExp(`^${searchText}`, `gi`);
    return movie.name.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = ``;
  }
  outputHtml(matches);
};

//Show results in HTML
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <img src = ${match.poster} class = "poster" alt="movie poster"align+"right">
            <div class="card">
                
                <h1 class="name">
                    ${match.name}
                </h1>
                <h2 >
                    Synopsis: 
                </h2>
                <p class="synopsis">
                    ${match.synopsis}
                </p>
                <p class="mpro">
                    Male Protagonist : <span class = "actors" >${match.mpro}</span>
                </p>
                <p class = "fpro">
                Female Protagonist :  <span class = "actors">${match.fpro}</span> 
                </p>
                <p class = "date">
                    Date Realeased : ${match.date}
                </p>
                <span class="streaming">
                    Streaming On : 
                </span>
                <span class="site">
                    ${match.streaming}
                </span>
                <p class="time">
                    Running Time : ${match.time}
                </p>
            </div>
        `
      )
      .join("");
    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchMovies(search.value));
