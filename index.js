(async function () {
  const response = await fetch("./data.json");
  const data = await response.json();

  const btn = document.getElementById("submit_btn");
  const genreInput = document.getElementById("genre_input");
  const ratingInput = document.getElementById("rating_input");
  const yearInput = document.getElementById("year_input");
  const languageInput = document.getElementById("language_input");
  const content = document.getElementsByClassName("append_data");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const languageValue = languageInput.value.toLowerCase();
    const genreValue = genreInput.value.toLowerCase();
    const filteredResult = data.filter((movie) => {
      return (
        Array.isArray(movie.genres) &&
        movie.genres.some((genre) =>
          genreValue.includes(genre.toLowerCase())
        ) ||
        movie.release_date.includes(yearInput.value) ||
        movie.original_language.toLowerCase() === languageValue ||
        movie.vote_average === Number(ratingInput.value)
      );
    });

    if (filteredResult === []) {
      alert("Movie Not Found");
    } else {
      filteredResult.forEach((item, index) => {
        const div = document.createElement("div");
        div.innerHTML += `<div class="movie_result">
        <p>${index + 1}</p>
  
        <div class="movie_data">
          <img
            class="movie_img"
            src="https://image.tmdb.org/t/p/w500/${item.poster_path}"
            alt=""
          />
          <div class="movie_title">
            <p>${item.title}</p>
            <p>deccription</p>
          </div>
        </div>
        <div>
          <p>${item.release_date.substring(0, 4)}</p>
        </div>
      </div>
      <hr />`;

        content[0].appendChild(div);
      });
    }
  });
})();
