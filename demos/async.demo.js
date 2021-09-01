console.log('Before');
const user = getUser(1, (user) => {
    console.log(user);
});
console.log(user);
console.log('After')

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading data...');
        const user = { id, username: 'Tom' };
        callback(user);
    }, 2000)
}