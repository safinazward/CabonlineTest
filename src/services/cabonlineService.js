import axios from 'axios';

const { CancelToken } = axios;
let cancel;
// import { toast } from 'react-toastify';

const cabonlineService = {
  getAddresses: address => {
    if (cancel) cancel();
    return axios
      .get(`${process.env.REACT_APP_CABONLINE_API}/addresses`, {
        params: {
          q: address
        },
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        })
      })
      .then(res => res.data)
      .catch(error => {
        if (axios.isCancel(error)) console.log('request canceled');
      });
  },
  getVehicles: (lat, lng) =>
    axios
      .get(`${process.env.REACT_APP_CABONLINE_API}/vehicles`, {
        params: {
          lat,
          lng
        }
      })
      .then(res => res.data)
};

export default cabonlineService;
