import ky from "ky";

console.log(process.env.NODE_ENV);
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://scrapper-avb7cvmws-avatarsik6699s-projects.vercel.app";

export const api = ky.extend({
  prefixUrl: baseUrl,
  retry: 0,
});
