const joke = document.querySelector(".joke-text");
const newJokeButton = document.querySelector(".new-joke-button");

function generateRandomColor() {
  // Generates a random hex color
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function generateRandomLinearGradient() {
  // Generate two random colors
  const color1 = generateRandomColor();
  const color2 = generateRandomColor();

  // Generate a random angle for the gradient (between 0 and 360 degrees)
  const angle = Math.floor(Math.random() * 360);

  // Construct the linear gradient string
  const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

  // Apply the gradient to the body or any other element
  document.body.style.background = gradient;
}

generateRandomLinearGradient();

async function fetchJoke() {
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Dark?blacklistFlags=nsfw"
    );
    const data = await response.json();
    // console.log(data.type);

    if (data.type === "twopart") {
      // console.log(data.setup, data.delivery);
      joke.innerHTML = `${data.setup} - ${data.delivery}`;
    } else if (data.type === "onepart" || data.type === "single") {
      joke.innerHTML = data.joke;
      // console.log(data.joke);
    } else {
      joke.innerHTML = data.setup;
      // console.log(data.setup);
    }
  } catch (err) {
    // console.log(err);
    joke.innerHTML = "Oops! Couldn't fetch a joke. Try again!";
  }
  generateRandomLinearGradient();
}

// Fetch a joke on page load
fetchJoke();

// Fetch a new joke when the button is clicked
newJokeButton.addEventListener("click", fetchJoke);
