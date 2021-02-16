// ====== Promise Demo ===========
console.log("=== Promice Demo");
console.log('Before');

//Consume promise
/* getUser(1)
    .then(user => getRepositories(user.gitHubUserName))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits: ',commits))
    .catch(err => console.log('Error: ', err.message)); */
console.log('After');

displayCommits();
//Async and Await approach
async function displayCommits(){
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user);
        const commits = await getCommits(repos[0]);
        console.log("Commits: ",commits);
    } catch (err) {
        console.log("Error: ",err.message,err);
    } 
}
//Async function
function getUser(id){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({id: id, gitHubUserName: 'gautam'});
        },2000); // async call
    });
}

//Async function
function getRepositories(userName){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('Calling GitHub Api to get repo list..');
            resolve(['repo1', 'repo2', 'repo3']);
            //reject(new Error('!! Could not get repositories.'));
        }, 2000);
    });
}

function getCommits(repo){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('Getting commits from GitHub ...');
            resolve(['commit1','commit2','commit3']);
        }, 2000);
    });
}