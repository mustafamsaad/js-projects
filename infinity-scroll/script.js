const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

const apiKey = "5Mbx_GNoDH_IJEe-5T-uuJQKTgbtw8Rp3VmViarlCJI";
let count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];
let imgsLoaded = 0;
let ready = false;
let totalImgs = 0;

const attributesMaker = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const imgLoadHandler = () => {
  imgsLoaded++;
  if (imgsLoaded === totalImgs) {
    loader.hidden = true;
    ready = true;
    imgsLoaded = 0;
    count = 30;
  }
};

const displayPhotos = () => {
  totalImgs = photosArray.length;

  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    attributesMaker(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    attributesMaker(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imgLoadHandler);

    item.appendChild(img);
    imgContainer.appendChild(item);
  });
};

const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos();
  } catch (error) {}
};
getPhotos();

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.body.offsetHeight - 1000
  ) {
    if (ready) {
      getPhotos();
      ready = false;
    }
  }
});
