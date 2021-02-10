# 🎨 Figma Fetch

This is a little package to fetch colors from Figma for your project. It's a WIP.

You can clone this repo and add it to your project. You'll need to create a personal Figma access token by following the steps [here](https://www.figma.com/developers/api#access-tokens) and adding the token to a `.env` file.

## Running the script

- Clone this repository, `git@github.com:bakkenbaeck/figma_package.git`
- `cd` into the directory it was cloned into
- Update the variables in `./figma/constants.js`
- Add your access token to `.env`
- Run `yarn figma`
- You should see the color tokens generated from your Figma file in `./generated/colors.css`

## TODO:

- [ ] Make configurable
- [ ] Support text styles
- [ ] Support more than one frame on a page
- [ ] Make a plugin ?
- [ ] Better error handling
- [ ] ...

✨
