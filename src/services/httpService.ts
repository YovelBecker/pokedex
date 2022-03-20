import axios from 'axios';

async function get(url: string) {
  return (await axios.get(url)).data;
}

const httpService = { get };

export default httpService;