const path = require('path');

const API_BASE = 'https://api.figma.com/v1';

/* 
TO FIND THE FILE ID: 

- open your figma file
- the file id is in the URL 
- for ex: https://www.figma.com/file/:fileId/...
*/
const FILE_ID = 'dMZsYza9uHqRCEhtmpHBbZ';

/* 
TO FIND THE PAGE ID: 

- click on the correct figma page (ie: the one where your design system frames live)
- ensure no frames are actively selected
- grab the node-id from the url (ex: node-id=390%3A0)
- if you select a specific frame, the node id will change to that frames node-id rather than the whole pages' node-id. you want the pages node-id.
- decode the node-id using:https://www.url-encode-decode.com/ (ex: 390%3A0 becomes 390:0)
*/
const PAGE_ID = '390:0';

/* Where do you want the generate file to live? */
const GENERATED_FILE_NAME = path.resolve(__dirname, '../generated/_colors.css');

module.exports = {
  API_BASE,
  FILE_ID,
  GENERATED_FILE_NAME,
  PAGE_ID,
};
