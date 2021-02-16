console.log('Before');
getUser(1, getUserCallback);
console.log('After');

// named callback function
function displayCommitsCallback(commits){
    console.log(commits);
}
function getRepoCallback(repos){
    console.log('Repositories: ',repos);
    getCommits(repos[0],displayCommitsCallback);
}
function getUserCallback(user){
    console.log('User: ',user);
    getRepositories(user.userName, getRepoCallback);
}

//Async function
function getUser(id, callback){
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({id: id, gitHubUserName: 'gautam'});
    },2000); // async call
}

//Async function
function getRepositories(userName, callback){
    setTimeout(() => {
        console.log('Calling GitHub Api to get repo list..');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

function getCommits(repo, callback){
    setTimeout(() => {
        console.log('Getting commits from GitHub ...');
        callback(['commit1','commit2','commit3']);
    }, 2000);
}