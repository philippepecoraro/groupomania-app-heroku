export default function authHeader() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    console.log('user:', user);
    console.log('sessionStorage:', sessionStorage);

    if (user && user.accessToken) {
        console.log('user.accessToken:', user.accessToken);
        console.log('user1:', user);

        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }

}
