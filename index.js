const {Octokit} = require('@octokit/rest');
const Giphy = require('giphy-api');
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const githubToken = core.getInput('github-token');
    const giphyApiKey = core.getInput('giphy-api-key');

    const octokit = new Octokit({ auth: githubToken });
    const giphy = Giphy(giphyApiKey);

    const context = github.context;
    const { owner, repo, number } = context.issue;
    const prInitiatorUsername = context.payload.pull_request.user.login;
    const prComment = await giphy.random('thank-you');

    if (context.payload.pull_request == null) {
      core.setFailed('No pull request found.');
      return;
    }

    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: number,
      body: `### PR - ${number} \n ### Thank you so much for your contribution! ${prInitiatorUsername} \n ![Giphy](${prComment.data.images.downsized.url})`
    });

    core.setOutput('comment-url', `${prComment.data.images.downsized.url}`);
    
    console.log(`GIF comment posted sucessfully! Comment URL: ${prComment.data.images.downsized.url}`);
  } catch (error) {
    console.error('Error', error);
    process.exit(1);
  }
}

run();