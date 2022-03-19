import axios from 'axios';

async function get(url: string) {
  return (await axios.get(url)).data;
}

export default { get } 