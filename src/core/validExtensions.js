import { chunkify as chunkify } from "../components/chunkify";
import { isBetween as isBetween } from "../components/isBetween";

const validExtensions = {
  Array: {
    chunkify: chunkify
  },
  Number: {
    isBetween: isBetween
  }
};

export { validExtensions };
