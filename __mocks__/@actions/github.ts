export const context = {
  payload: {
    pull_request: {
      mergeable_state: 'clean',
      number: 123
    }
  },
  repo: {
    owner: 'rafaelbastiansch',
    repo: 'mergeability-active',
  }
}

const mockApi = {
  rest: {
    pulls: {
      get: jest.fn().mockResolvedValue({data: context.payload.pull_request}),
    }
  }
}

export const getOctokit = jest.fn().mockImplementation(() => mockApi);