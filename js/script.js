//div class overview = profile info
const overview = document.querySelector(".overview");
const username = "nicolep908";
const repoList = document.querySelector(".repo-list");
//step 4 new variables
const allRepoInfo = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
//step 5 variables
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const gitUserInfo = async function () {
    const userInfo = await fetch (
        `https://api.github.com/users/${username}`
    );
    const data = await userInfo.json();
    displayUserInfo(data);
};

gitUserInfo();

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add(".user-info");
    div.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> 
    `;

overview.append(div);
gitRepoList(username);
};

const gitRepoList = async function () {
    const gitRepo = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await gitRepo.json();
    displayRepos(repoData);
};

const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
     }
};

//Step 4//

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
       const repoName = e.target.innerText;
       getRepoInfo(repoName);
    }
   });
   
   const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();


    const languages = [];
    for (const language in languageData) {
        languages.push(language);  
        }
        
        displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allRepoInfo.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
  }; 

  // Step 5

  backButton.addEventListener("click", function() {
    allRepoInfo.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
  });

filterInput.addEventListener("input", function(e) {
    const searchBox = e.target.value;
    const repos = document.createElement(".repo");
    const searchLowerCase = searchText.toLowerCase();

    for (const repo of repos) {
        const repoLowertext = repo.innerText.toLowerCase ();
        if (repoLowertext.includes(searchLowerCase)) {
            repo.classList.remove("hide");
        } else {
        repo.classList.add("hide");        
     }
    }
});