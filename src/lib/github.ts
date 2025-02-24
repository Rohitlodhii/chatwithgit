import { reportUnusedDisableDirectives } from '.eslintrc.cjs';
import { db } from '@/server/db';
import { Octokit } from 'octokit';

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
})


type Response = {
    commitMessage: String;
    commitAuthorName: String;
    commitHash: String;
    commitAuthorAvater: String;
    commitDate: String;
}

const githuUrl = "https://github.com/Rohitlodhii/notionclone"

export const getCommitHashes = async (githubUrl: string): Promise<Response[]>=> {
    const { data } = await octokit.rest.repos.listCommits({
        owner: "rohitlodhii",
        repo: "notionclone"
    })

    
    const sortedCommits = data.sort((a: any, b: any) => 
        new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()
    );

    return sortedCommits.slice(0,10).map((commit : any) => ({
        commitHash : commit.sha as string ,
        commitMessage : commit.commit.message ?? "" ,
        commitAuthorName : commit.commit?.author?.name ?? "",
        commitAuthorAvater : commit?.author?.avatar.url ?? "",
        commitDate : commit.commit?.author?.date ?? ""
    }))
    


}

export const pullCommits = async (projectId : string) => {
    const  {project , githubUrl} = await fetchProjectGithubUrl(projectId);
    const commitHashes = await getCommitHashes(githubUrl);

    const unprocessCommits = await filterUnprocessCommits(projectId , commitHashes);

    return unprocessCommits;

}

async function filterUnprocessCommits( projectId:string , commitHashes : Response[]) {
    const processCommits = await db.commit.findMany({
        where : {projectId}
    })
    const unprocessedCommits = commitHashes.filter((commit) => !processCommits.some((processCommits)=> processCommits.commitHash === commit.commitHash));
    
    return unprocessedCommits;

    

}

async function fetchProjectGithubUrl(projectId : string){
    const project = await db.project.findUnique({
        where : { id : projectId} ,
        select : {
            githubUrl : true
        }
    })
    if(!project?.githubUrl){
        throw new Error('Project has no github url');
    }
    return {project , githubUrl : project?.githubUrl}
}