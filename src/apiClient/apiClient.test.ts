import {axiosInstance, getService, putService} from './apiClient';

const result = {
    status: 200,
    data: {
        message: 'User Fetched',
    },
};
const errorMessage = 'Network Error';

describe('apiClient test suite', () => {
    let mockPost: jest.SpyInstance;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully fetch data', async () => {
        mockPost = jest.spyOn(axiosInstance, 'get');

        mockPost.mockImplementation(() => Promise.resolve(result));

        const url = '/users';

        const response = await getService(url);

        expect(mockPost).toHaveBeenCalled();
        const calls = mockPost.mock.calls.length;
        expect(calls).toEqual(1);
        expect(response).toEqual(result);
    });

    it('should unsuccessfully fetch data due to error', async () => {
        mockPost = jest.spyOn(axiosInstance, 'get');

        mockPost.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

        const url = '/users';

        await expect(getService(url)).rejects.toThrow(errorMessage);
    });

    it('should successfully update data', async () => {
        mockPost = jest.spyOn(axiosInstance, 'put');

        const data = {
            name: 'test_name',
        };

        mockPost.mockImplementation(() => Promise.resolve(result));

        const url = '/users';

        await putService(url, data);

        expect(mockPost).toHaveBeenCalled();
        const calls = mockPost.mock.calls.length;
        expect(calls).toEqual(1);
    });

    it('should unsuccessfully update data die to server error', async () => {
        mockPost = jest.spyOn(axiosInstance, 'put');

        const data = {
            name: 'test_name',
        };

        mockPost.mockImplementation(() => Promise.reject(new Error(errorMessage)));

        const url = '/users';

        await expect(putService(url, data)).rejects.toThrow(errorMessage);
    });
});
