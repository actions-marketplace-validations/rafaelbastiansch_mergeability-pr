import * as core from '@actions/core'
import * as github from '@actions/github'

type ClientType = ReturnType<typeof github.getOctokit>;

const mergeableStatus = ['unstable', 'clean']

export async function run() {
  try {
    const token = core.getInput('repo-token', { required: true })

    const prNumber = getPrNumber()
    if (!prNumber) {
      console.log('Could not get pull request number from context, exiting')
      return;
    }

    const client: ClientType = github.getOctokit(token);

    const { data: pullRequest } = await client.rest.pulls.get({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: prNumber,
    });

    core.info(`fetching changed files for pr #${prNumber}`)
    checkMergeability(pullRequest)

    core.info(`PR with ${pullRequest.mergeable_state} can be merged`)
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

function getPrNumber(): number | undefined {
  const pullRequest = github.context.payload.pull_request
  if (!pullRequest) {
    return undefined
  }

  return pullRequest.number
}

function checkMergeability (pullRequest): void {
  if (!mergeableStatus.includes(pullRequest.mergeable_state)) {
    core.setFailed(`mergeableStatus ${pullRequest.mergeable_state} is not allowed for mergeability`);
  }
}