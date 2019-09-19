import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export function calculateConversion(body) {
  return axios({
    method: 'post',
    url: 'api/v1/conversion',
    data: body,
  }).then(({ data }) => data);
}
