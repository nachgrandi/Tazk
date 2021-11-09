import axios from 'axios';

axios
  .post('https://tazk-app.herokuapp.com/notifications')
  .then((res) => {
    console.log(`statusCode: ${res.status}, message: ${res.data.msg}`)
  })
  .catch(error => {
    console.error(error)
  })
