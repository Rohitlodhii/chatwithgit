
import { z } from "zod";
import { createTRPCRouter , protectedProcedure } from "../trpc";


export const projectRouter = createTRPCRouter({
    createProject : protectedProcedure.input(
        z.object({
            name : z.string(),
            githubUrl : z.string(),
            githubToken : z.string().optional()
        })
    ).mutation( async ({ ctx , input}) => {
        const project = await ctx.db.project.create({
            data : {
                githubUrl : input.githubUrl ,
                name : input.name ,
                authToken : input.githubToken ,
                userToProject :{
                    create  : {
                        userId : ctx.user.userId! 
                    }
                }
            }
        })
        return project
    }),
    getProjects : protectedProcedure.query( async ({ctx}) => {
        return await ctx.db.project.findMany({
            where :{
                userToProject : {
                    some : {
                        userId : ctx.user.userId! ,
                    }
                },
                deletedAt : null ,
            }
        })
    }),
    deleteProject: protectedProcedure
    .input(
        z.object({
            projectId: z.string(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        // Find the project to ensure the user has permission
        const project = await ctx.db.project.findFirst({
            where: {
                id: input.projectId,
                userToProject: {
                    some: {
                        userId: ctx.user.userId!,
                    },
                },
            },
        });

        if (!project) {
            throw new Error("Project not found or unauthorized");
        }

        // Perform a soft delete by updating the `deletedAt` field
        await ctx.db.project.update({
            where: { id: input.projectId },
            data: { deletedAt: new Date() },
        });

        return { success: true, message: "Project deleted successfully" };
    }),

    
})