const audioElement = document.getElementById("audio");
const buttonElement = document.getElementById("btn");

// VoiceRSS Javascript SDK
const toggleButton = () => {
  buttonElement.disabled = !buttonElement.disabled;
};

const getJoke = async () => {
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
    );
    const data = await response.json();

    tellMe(data.joke);
    toggleButton();
  } catch (error) {}
};

const tellMe = (joke) => {
  VoiceRSS.speech({
    key: "a9462996a45142459ff7999207826815",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

buttonElement.addEventListener("click", getJoke);
audioElement.addEventListener("ended", toggleButton);
