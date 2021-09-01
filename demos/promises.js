
// Simple sample.
// const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject(new Error('msg'));
//         resolve(1);
//     }, 2000);
// });

// p.then((result) => console.log('Result: ' + result))
// .catch((err) => console.log('Error: ', err));

// Callbacks to Promises
console.log('Before');
getUser(1)
    .then(user => getRepos(user))
    .then(repos => displayRepos(repos))
    .catch(err => console.log(err));
console.log('After')

function displayRepos(repos) {
    console.log(repos);
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading data...');
            const user = { id, username: 'Tom' };
            resolve(user);
        }, 2000)
    })
}

function getRepos(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const repos = ['repo1', 'repo2', 'repo3']
            reject(new Error('test'));
            // resolve(repos);
        }, 2000)
    })
}
