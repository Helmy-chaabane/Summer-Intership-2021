import path from "path";
import { createWriteStream, unlinkSync } from "fs";

const serverURL = process.env.SERVER_URL
  ? `${process.env.SERVER_URL}:${process.env.PORT}`
  : "http://localhost:4000";

export const saveImage = async (image, folder) => {
  const { createReadStream, filename } = await image;
  const { ext } = path.parse(filename);
  const randomName = getRandomString(10, ext);
  const stream = createReadStream();
  const pathName = path.join(
    __dirname,
    `../../public/images/${folder}/${randomName}`
  );
  const out = createWriteStream(pathName);
  await stream.pipe(out);
  return `${serverURL}/public/images/${folder}/${randomName}`;
};

export const saveFile = async (file) => {
  const { createReadStream, filename } = await file;
  const { ext } = path.parse(filename);
  const randomName = getRandomString(10, ext);
  const stream = createReadStream();
  const pathName = path.join(__dirname, `../../public/files/${randomName}`);
  const out = createWriteStream(pathName);
  await stream.pipe(out);
  return `${serverURL}/public/files/${randomName}`;
};

export const removeFiles = (filesUrls) => {
  filesUrls.forEach((fileUrl) => {
    try {
      if (fileUrl) {
        const pathName = path.join(
          __dirname,
          `../..${fileUrl.replace(serverURL, "")}`
        );
        unlinkSync(pathName);
      }
    } catch (error) {
      console.error("there was an error:", error.message);
    }
  });
};

function getRandomString(length, ext) {
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result + ext;
}
