// Libraries
import axios from 'axios';

export async function getSecretWord(setSecretWord) {
  console.log('getSecretWord');
  const response = await axios('http://localhost:3030/');
  console.log('response', response);
  setSecretWord(response.data);
}

// Default export for mocking convenience
export default {
  getSecretWord,
}
