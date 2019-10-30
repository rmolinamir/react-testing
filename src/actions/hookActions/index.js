// Libraries
import axios from 'axios';

export async function getSecretWord(setSecretWord) {
  const response = await axios('http://localhost.com:3030');
  setSecretWord(response.data);
}

// Default export for mocking convenience
export default {
  getSecretWord,
}
