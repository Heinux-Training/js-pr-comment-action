/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 696:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 136:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 293:
/***/ ((module) => {

module.exports = eval("require")("@octokit/rest");


/***/ }),

/***/ 71:
/***/ ((module) => {

module.exports = eval("require")("giphy-api");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const {Octokit} = __nccwpck_require__(293);
const Giphy = __nccwpck_require__(71);
const core = __nccwpck_require__(696);
const github = __nccwpck_require__(136);

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
module.exports = __webpack_exports__;
/******/ })()
;