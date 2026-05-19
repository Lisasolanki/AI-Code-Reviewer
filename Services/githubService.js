const axios = require("axios");

async function fetchRepoCode(repoUrl) {
  try {

    const parts = repoUrl.split("/");

    const owner = parts[3];
    const repo = parts[4];

    if (!owner || !repo) {
      throw new Error("Invalid GitHub URL");
    }

    const apiUrl =
      `https://api.github.com/repos/${owner}/${repo}/contents`;

    const res = await axios.get(apiUrl);

    if (!Array.isArray(res.data)) {
      throw new Error("Invalid repository structure");
    }

    let code = "";
    let count = 0;

    for (const file of res.data) {

      if (
        file.type === "file" &&
        file.download_url
      ) {

        try {

          const fileData = await axios.get(
            file.download_url
          );

          code += fileData.data + "\n\n";

          count++;

          // limit files
          if (count >= 5) break;

        } catch (err) {

          console.log(
            "Skipping file:",
            file.name
          );
        }
      }
    }

    if (!code) {
      throw new Error("No readable files found");
    }

    // limit code size
    return code.slice(0, 3000);

  } catch (error) {

    console.error(
      "GitHub Fetch Error:",
      error.message
    );

    throw new Error("Error fetching repo");
  }
}

module.exports = {
  fetchRepoCode
};