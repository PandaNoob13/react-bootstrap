import { loginService } from "../../services/LoginService"
import { SERVICE } from "../../shared/constants"

describe('Login service', () => {
    test('Success authenticate', async ()=> {
        const mockDoPost = jest.fn()
        mockDoPost.mockResolvedValue('success') 

        const client = jest.fn().mockReturnValue({
            doPost: mockDoPost,
            doGet: jest.fn()
        })

        const service = loginService(client())
        const response = await service.doAuthenticate({
            userName: 'dummyUser', password: 'dummyPassword'
        })

        expect(mockDoPost).toHaveBeenCalledWith({
            url: SERVICE.LOGIN, data: {
                userName: 'dummyUser', password: 'dummyPassword'
            }
        })

        expect(response).toBe('success')
    })

    test('Failed authenticate', async () => {
        const mockDoPost = jest.fn()
        mockDoPost.mockRejectedValue(new Error ('error')) 

        const client = jest.fn().mockReturnValue({
            doPost: mockDoPost,
            doGet: jest.fn()
        })

        const service = loginService(client())
        await expect(service.doAuthenticate({})).rejects.toThrow('error')
    })
})