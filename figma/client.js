const fetch = require("node-fetch");
const { API_BASE } = require("./constants");

/*
  Create a Figma access token by following the steps here: https://www.figma.com/developers/api#access-tokens. Then add the key to the .env file. 
    
*/

async function fetchWithAccessToken(url) {
  try {
    let response = await fetch(API_BASE + url, {
      headers: {
        "X-Figma-Token": process.env.FIGMA_TOKEN,
      },
    });

    if (!response.ok) {
      return response.json().then(({ err }) => {
        throw new Error(err);
      });
    } else {
      return response.json();
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchFile(file_id) {
  const FILE_URL = `/files/${file_id}`;
  const response = await fetchWithAccessToken(FILE_URL);
  return response;
}

async function fetchStyles(file_id) {
  const STYLES_URL = `/files/${file_id}/styles`;
  const response = await fetchWithAccessToken(STYLES_URL);
  return response.meta.styles;
}

module.exports = { fetchFile, fetchStyles };
