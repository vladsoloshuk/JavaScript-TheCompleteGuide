const addMovieModal = document.getElementById('add-modal');
const addBackground = document.getElementById('backdrop');
//const addMovieModal = document.querySelector('#add-modal');
//const addMovieModal = document.body.children[1];
const cancelMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const startMovieButton = document.querySelector('header button');
//const startMovieButton = document.querySelector('header').lastElementChild;
const entryTextSection = document.getElementById('entry-text');
const listRoot = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

console.log(addMovieModal);
console.log(addBackground);
console.log(cancelMovieButton);
console.log(confirmAddMovieButton);
console.log(entryTextSection);
console.log(listRoot);


const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
}

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <div class='movie-element__image'>
    <img src ='${imageUrl}' alt='${title}'>
  </div>
  <div class='movie-element__info'>
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
  </div>
  `;

  newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
  listRoot.appendChild(newMovieElement);
}

const closeMovieDeletionModal = () => {
  toggleBackground(); 
  deleteMovieModal.classList.remove('visible');
}

const closeMovieModal = () => {
  toggleBackground();
  addMovieModal.classList.remove('visible');
}

const showMovieModal = () => {
  toggleBackground();
  addMovieModal.classList.add('visible');
};

const clearMovieInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = '';
  }
}

const toggleBackground = () => {
  addBackground.classList.toggle('visible');
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearMovieInputs();
}

const addMovieHandler = () => {
  const  titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (titleValue.trim() === '' || imageUrlValue.trim() === '' || ratingValue.trim() === '' || +ratingValue < 1 || +ratingValue > 5) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  }
  
  closeMovieModal();
  clearMovieInputs();
  movies.push(newMovie);
  console.log(movies); 
  renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
 }

 const cancelMovieDeletion = () => {
  toggleBackground();
  deleteMovieModal.classList.remove('visible');
 }

 const startDeleteMovieHandler = movieId => {
  deleteMovieModal.classList.add('visible');
  toggleBackground();
  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
 let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
  cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);
  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  //confirmDeletionButton.removeEventListener('click', deleteMovieHandler.bind(null, movieId));

  cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
  confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId));
} 

const deleteMovieHandler = movieId => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  listRoot.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUI();
}

const backgroundClickHandler = () => {
  toggleBackground();
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInputs();
};

startMovieButton.addEventListener('click', showMovieModal);
addBackground.addEventListener('click', backgroundClickHandler);
cancelMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);

