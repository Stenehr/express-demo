
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
// console.log('Before');
// getUser(1)
//     .then(user => getRepos(user))
//     .then(repos => displayRepos(repos))
//     .catch(err => console.log(err));
// console.log('After')

// Async/await


try {
    displayRepos();
} catch (ex) {
    console.log(ex);
}

async function displayRepos() {
    const user = await getUser(1);
    const repos = await getRepos(user);
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
            resolve(repos);
        }, 2000)
    })
}

// Promise all
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("running method one...");
        resolve("method one");
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("running method two...");
        resolve("method two");
    }, 2200)
});

// Promise.all([ p1, p2 ])
//     .then(result => console.log(result));

// Promise.race([p1, p2])
//     .then(result => console.log(result));