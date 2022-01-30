const fs = require("fs/promises");
const path = require("path");

const postsPath = path.join(__dirname);

async function readPosts() {
  const filter = async (filePath) => {
    const fullPath = path.join(postsPath, filePath);
    const isFile = (await fs.stat(fullPath)).isFile();
    console.log({ isFile });
    return await isFile;
  };

  const dir = await fs.readdir(postsPath);
  const filtered = await dir.filter(filter);
  return await filtered;
}

readPosts().then((res) => console.assert(res.length === 3));
