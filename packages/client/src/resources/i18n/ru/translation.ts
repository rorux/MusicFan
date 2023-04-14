import common from './common.json';
import artists from './artists.json';
import signupPage from './signup-page.json';
import signinPage from './signin-page.json';
import albumsPage from './albums-page.json';

const translation = {
  ...common,
  'artists': artists,
  'signup-page': signupPage,
  'signin-page': signinPage,
  'albums-page': albumsPage,
};

export default translation;
