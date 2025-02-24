const btnGet = document.querySelector('#btnGet');

// const instance = axios.create({
// 	withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//         'Access-Control-Allow-Origin': '*'
//       },
// 	baseURL: 'http://localhost:34587/'
// })

btnGet.addEventListener('click', async () => {
    const response = await axios.get('/service-api');
    console.log(response.data);
});