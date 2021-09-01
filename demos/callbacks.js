
console.log('Before');
getUser(1, getRepositories);
console.log('After')

function displayRepos(repos) {
    console.log(repos);
}

function getRepositories(user) {
    getRepos(user.username, displayRepos);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading data...');
        const user = { id, username: 'Tom' };
        callback(user);
    }, 2000)
}

function getRepos(username, callback) {
    console.log(username);
    setTimeout(() => {
        const repos = ['repo1', 'repo2', 'repo3']
        callback(repos);
    }, 2000)
}


