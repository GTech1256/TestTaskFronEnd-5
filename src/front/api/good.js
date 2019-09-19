import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export function getAllGoods() {
  return axios({
    method: 'get',
    url: 'api/v1/good',
  }).then(({ data }) => data);
}
