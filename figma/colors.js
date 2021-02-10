const prettier = require("prettier");
const prettierConfig = require("../prettier.config");

const rgbToHex = (r, g, b) => {
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const normalizeColorName = (color) => {
  return color.toLowerCase().replace(/ /g, "-");
};

// TODO:if colors appear twice, ignore
async function getColors(page, styles) {
  return (
    page &&
    page.children
      // only get FRAMES
      .filter((c) => c.type === "FRAME")
      // get the shapes you're looking for (ex: rectangles, ellipsis, etc.)
      .map((c) => c.children.filter((c) => c.type === "RECTANGLE"))[0]
      .filter((c) => !!c.styles && !!c.styles.fill)
      // get the colors from the rectangles
      .map((c) => {
        let { r, g, b } = c.fills[0].color;
        const nodeId = c.styles.fill;

        // Cross reference to the array of styles, since Figma doesn't give us the HEX color codes in their /styles endpoint .. :(
        const matchedStyles = { ...styles.find((s) => s.node_id === nodeId) };

        const formattedColors = {
          ...matchedStyles,
          color: rgbToHex(r, g, b),
          normalizedName: normalizeColorName(matchedStyles.name),
        };

        return formattedColors;
      })
      .filter((c) => !!c.name)
  );
}

async function generateCss(colors, parser) {
  const content = `/* GENERATED FROM FIGMA - PLZ DONT EDIT  */

  :root {
      ${colors
        .map(({ normalizedName, color }) => `--${normalizedName}: ${color};`)
        .join("\r\n")}
  }`;

  return prettier.format(content, { ...prettierConfig, parser });
}

module.exports = {
  getColors,
  generateCss,
};
