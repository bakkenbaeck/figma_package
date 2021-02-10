require('dotenv').config({ path: '.env' });
const fs = require('fs');
const chalk = require('chalk');

const { GENERATED_FILE_NAME, FILE_ID, PAGE_ID } = require('./constants');
const { fetchFile, fetchStyles } = require('./client');
const { getColors, generateCss } = require('./colors');

if (!process.env.FIGMA_TOKEN) {
  throw new Error('Provide access token');
}

const logError = (message) => {
  console.error(chalk.hex('#C73B57').bold(message));
};

const logSuccess = (message) => {
  console.log(chalk.hex('#90CD81').bold(message));
};

const logColors = (color, message) => {
  console.log(chalk.hex(color).bold(message));
};

async function buildTokens() {
  try {
    console.log('Starting to fetch colors...');

    const styles = await fetchStyles(FILE_ID);
    const file = await fetchFile(FILE_ID);

    const pages = file.document.children;
    const page = pages.find((page) => page.id === PAGE_ID);

    // TODO: get all the frames on the page (ex: one frame for light mode one frame for dark mode)
    // this will get all the frames on a page ->
    // const frames = page.children;

    const colors = await getColors(page, styles);
    const css = await generateCss(colors, 'css');

    // for terminal fun;
    colors.map((color) => logColors(color.color, color.normalizedName));

    await Promise.all([fs.writeFileSync(GENERATED_FILE_NAME, css)]);

    logSuccess(
      `🎨 Voila! Your figma tokens are available at: ${GENERATED_FILE_NAME}`
    );
  } catch (e) {
    logError(`Building tokens failed: ${e}`);
  }
}

buildTokens();
