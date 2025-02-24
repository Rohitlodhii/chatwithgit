import { Octokit} from 'octokit';

export const octokit = new Octokit({
    auth : process.env.GITHUB_TOKEN,
})


const githuUrl = "https://github.com/Rohitlodhii/notionclone"

export const getCommitHashes = async ( githubUrl : string ) : Promise<Response>[] => {
    const { data} = await octokit.rest.repos.listCommits({
        owner : "rohitlodhii",
        repo : "notionclone"
    })
    const sortedCommits = data.sort((a :any , b:any) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime() as any[])
}