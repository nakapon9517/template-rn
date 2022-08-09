import axios, { AxiosResponse } from 'axios';

export const getHtmlToUrl = async (url: string) => {
  return await axios.get<string, AxiosResponse<string>>(encodeURI(url)).then((res) => res.data);
};

export const getJsonToUrl = async (url: string) => {
  return await (
    await axios.get<any, AxiosResponse<any>>(encodeURI(url + '.json'))
  ).data;
};
