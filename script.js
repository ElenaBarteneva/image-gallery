// import dotenv from "dotenv";
// import path from 'path';
// dotenv.config({
// path:path.resolve('./.env')
// })

import decodeApiKey from "./additional.js";


const searchBar = document.querySelector('.search input');
const imgContainer = document.querySelector('.container');
const searchButton = document.getElementById('search');
const apiKeyEncoded = 'e9eu2NqxsONUu_vozPg7Zoinkkt18JKFsDBZdeYPCQS';
let searchRequest = '';


async function searchImages() {
    searchRequest = searchBar.value;
    if (searchRequest === '') return;
    const url = `https://api.unsplash.com/search/photos?per_page=9&query=${searchRequest}&client_id=${decodeApiKey(apiKeyEncoded)}`;
    // const url = `http://localhost:8000/search/${searchRequest}`
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    imgContainer.innerHTML = '';

    if (results.length === 0) {
        imgContainer.innerHTML = 'Sorry, nothing was found...';
        imgContainer.style.fontFamily = 'Arial';
        imgContainer.style.color = '#ffffff';
    }

    results.map((result) => {
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('img');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        imgWrapper.appendChild(image);
        imgContainer.appendChild(imgWrapper);
    })
}

async function getRandomPhotos() {
    const url = `https://api.unsplash.com/photos/random?client_id=${decodeApiKey(apiKeyEncoded)}&count=9`;

    const response = await fetch(url);
    const data = await response.json();

    imgContainer.innerHTML = '';

    data.map((result) => {
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('img');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        imgWrapper.appendChild(image);
        imgContainer.appendChild(imgWrapper);
    })
}

window.addEventListener('load', () => {
    getRandomPhotos();
    searchBar.focus();
})


searchButton.addEventListener('click', () => {
    searchImages();
})

searchBar.addEventListener('keyup', event => {
    if(event.code === 'Enter' ) {
        searchButton.click();
    };
  });