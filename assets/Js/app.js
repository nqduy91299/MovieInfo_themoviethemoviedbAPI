

const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movie-searchable');
const movieContainer = document.querySelector('#movie-container');



function hanldeError(error){
  console.log('Error: ', error);
}


// Create tag img
function movieSection(movies){
  const section = document.createElement('section');
  section.classList = section;
  movies.map((movie) => {
    if(movie.poster_path){
      const img = document.createElement('img');
      img.src = IMAGE_URL + movie.poster_path;
      img.setAttribute('data-movie-id', movie.id);

      section.appendChild(img);
    }
  });

  return section;
}

// create movie container
function createMovieContainer(movies, title =''){
  const movieElement = document.createElement('div');
  // set movie into attribute class
  movieElement.setAttribute('class', 'movie');

  const header = document.createElement('h2');
  header.innerHTML = title;

  const content = document.createElement('div');
  content.classList = 'content';

  const contentClose = `<p id="content-close">X</p>`;
  content.innerHTML = contentClose;

  const section = movieSection(movies);

  movieElement.appendChild(header);
  movieElement.appendChild(section);
  movieElement.appendChild(content);

  return movieElement;
}



function renderSearchMovies(data){
  // get movies[]
  movieSearchable.innerHTML = '';
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  movieSearchable.appendChild(movieBlock);
}


function renderMovies(data){
  // get movies[]
  const movies = data.results;
  const movieBlock = createMovieContainer(movies, this.title);
  movieContainer.appendChild(movieBlock);
  console.log('Data: ', data);
}



buttonElement.onclick = function(event) {
  event.preventDefault();
  const value = inputElement.value;
  
  searchMovie(value);

  inputElement.value = '';
  console.log('value: ' + value);
}



function createIframe(video){
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  iframe.width = 360;
  iframe.height = 315;
  iframe.allowFullscreen = true;

  return iframe
}


function createVideosTemplate(data, content){

  content.innerHTML = '<p id="content-close">X</p>'; 
  console.log('Movies: ', data);
  const videos = data.results;
  const length = videos.length > 4 ? 4 : videos.length;
  const iframeContainer = document.createElement('div');

  for(let i = 0; i < length; i++){
    const video = videos[i];
    const iframe = createIframe(video);
   
    iframeContainer.appendChild(iframe);
    content.appendChild(iframeContainer); 
  }
}

document.onclick = function(event){
  const target = event.target;
  if(target.tagName.toLowerCase() === 'img'){
    console.log('Event: ', event);
    const movieId = target.dataset.movieId;
    console.log('movieId: ', movieId);
    const section = event.target.parentElement;
    const content = section.nextElementSibling;
    content.classList.add('content-display')

    const path = `/movie/${movieId}/videos`;
    const url = generateUrl(path);
    // fetch movie videos
    fetch(url)
      .then((res) => res.json())
      .then((data) => createVideosTemplate(data, content))
      .catch((error) => {
      console.log("Error: ", error);
    });
  }

  if(target.id === 'content-close'){
    const content = target.parentElement;
    content.classList.remove('content-display');
  }
}

getUpcomingMovie();
getTopratedMovie();