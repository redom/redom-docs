/* eslint-disable no-undef */
const fetch = require("node-fetch");
const fs = require("fs");

getContributors();
getOpenCollective();

function getContributors() {
    const writeStream = fs.createWriteStream(".redomdoc/contributors.js");

    fetch("https://api.github.com/repos/redom/redom/contributors")
        .then(res => res.json())
        .then(json => {
            let content = "module.exports = [";
            json.forEach(data => {
                const { html_url, avatar_url, login } = data;
                content += `{
                            html_url: "${html_url}",
                            avatar_url: "${avatar_url}",
                            login: "${login}",
                        },`;
            });
            content += "]";
            writeStream.write(content);
            writeStream.end();
        });
}

function getOpenCollective() {
    const writeStream = fs.createWriteStream(".redomdoc/backers.js");

    fetch("https://opencollective.com/redom/members/all.json")
        .then(res => res.json())
        .then(json => {
            let content = "module.exports = [";
            json.forEach(data => {
                const { name, image, website, role, profile } = data;
                if (role === "BACKER") {
                    content += `{
                            name: "${name}",
                            image: "${image}",
                            website: "${website}",
                            profile: "${profile}",
                            role: "${role}",
                        },`;
                }
            });
            content += "]";
            writeStream.write(content);
            writeStream.end();
        });
}
