# Post GIF on PR

This GitHub Action posts a GIF on a pull request.

## Inputs

### `github-token`

**Required** GitHub token.

### `giphy-api-key`

**Required** The Giphy API key to be used.

## Example Usage

``` yaml
name: Post GIF on PR
on:
  pull_request:
    types: [opened, reopened]

jobs:
  post-gif:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Post GIF
        uses: Heinux-Training/js-pr-comment-action@latest
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          giphy-api-key: ${{ secrets.GIPHY_KEY }}
```
> Warning You have to create and configure **GIPHY_KEY** secret variable in your repository to use this action.