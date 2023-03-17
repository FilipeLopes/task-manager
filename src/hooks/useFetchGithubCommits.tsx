const { Octokit } = require("@octokit/core");

const octokit = new Octokit({ auth: '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' });


export const useFetchGithubCommits = () => {

    function getUserRepo(url: string): [string, string] {
        const match = url.match(/github.com\/([^/]+)\/([^/]+)/);
        if (match) {
            return [match[1], match[2]];
        }
        return ["", ""];
    }

    const fetchCommit = async (data: any) => {
        if (!data) {
            return;
        }
        const [user, repos] = getUserRepo(data);

        const owner = user,
            repo = repos
        try {
            const fiveMostRecentCommits = await octokit.request(
                `GET /repos/{owner}/{repo}/commits`, { owner, repo }
            );

            return (fiveMostRecentCommits.data);
        } catch (error) {
            console.log(error);
        }
    }
    return {
        fetchCommit,
    }
}