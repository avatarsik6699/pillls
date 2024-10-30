import { capitalizeFirstLetter } from "./string/capitalizeFirstLetter";

const getUserLocation = () => {
  return new Promise<[number, number]>((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve([longitude, latitude]);
        },
        error => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by your browser"));
    }
  });
};

export const utils = {
  getUserLocation,
  string: {
    capitalizeFirstLetter,
  },
};
