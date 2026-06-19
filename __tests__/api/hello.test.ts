import type { NextApiRequest, NextApiResponse } from 'next'
import handler from '../../pages/api/hello'

describe('/api/hello', () => {
  let req: Partial<NextApiRequest>
  let res: Partial<NextApiResponse>
  let jsonMock: jest.Mock
  let statusMock: jest.Mock

  beforeEach(() => {
    req = {
      method: 'GET',
    }
    jsonMock = jest.fn()
    statusMock = jest.fn().mockReturnValue({ json: jsonMock })
    res = {
      status: statusMock,
      json: jsonMock,
    }
  })

  it('returns status 200', () => {
    handler(req as NextApiRequest, res as NextApiResponse)
    expect(statusMock).toHaveBeenCalledWith(200)
  })

  it('returns JSON with name "John Doe"', () => {
    handler(req as NextApiRequest, res as NextApiResponse)
    expect(jsonMock).toHaveBeenCalledWith({ name: 'John Doe' })
  })

  it('responds with correct data structure', () => {
    handler(req as NextApiRequest, res as NextApiResponse)
    const response = jsonMock.mock.calls[0][0]
    expect(response).toHaveProperty('name')
    expect(typeof response.name).toBe('string')
  })

  it('handles the request regardless of HTTP method', () => {
    req.method = 'POST'
    handler(req as NextApiRequest, res as NextApiResponse)
    expect(statusMock).toHaveBeenCalledWith(200)
    expect(jsonMock).toHaveBeenCalledWith({ name: 'John Doe' })
  })
})
