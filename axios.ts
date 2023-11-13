import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


const axiosMock: jest.Mocked<typeof import('axios').default> = jest.createMockFromModule('axios');

axiosMock.post.mockResolvedValueOnce = jest.fn();
axiosMock.post.mockRejectedValueOnce = jest.fn();

export default axiosMock;

