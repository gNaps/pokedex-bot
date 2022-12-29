import axios, { AxiosRequestConfig } from "axios";
import NodeCache from "node-cache";

const myCache = new NodeCache();

export const gqlRequest = async (query: string, key: string) => {
  const cachedValue = myCache.get(key);
  //const cachedValue = null;

  if (cachedValue) {
    return cachedValue;
  } else {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `https://graphqlpokemon.favware.tech/v7`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        query,
      },
    };

    const data = await axios(config);
    myCache.set(key, data.data, 604800);
    return data.data;
  }
};
