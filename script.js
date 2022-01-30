const fs = require("fs/promises");
const path = require("path");

const postsPath = path.join(__dirname);

async function readPosts() {
  const filter = async (filePath) => {
    const fullPath = path.join(postsPath, filePath);
    return (await fs.stat(fullPath)).isFile();
  };

  const dir = await fs.readdir(postsPath);
  const filtered = await dir.reduce(
    async (acc, cur) => ((await filter(cur)) ? [...(await acc), cur] : acc),
    []
  );
  return await filtered;
}

readPosts().then((res) => {
  console.log({ res });
  console.assert(res.length === 4);
});
