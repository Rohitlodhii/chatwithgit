import { db } from "@/server/db";
import { auth, clerkClient } from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation";


const SyncUser = async () => {

    const  {userId } = await auth();

    console.log("Go here")

    if (!userId) {
        throw new Error('User Not Found')
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    if (!user.emailAddresses[0]?.emailAddress){
        return notFound();
    }

    await db.user.upsert({
        where : {
            emailAddress : user.emailAddresses[0]?.emailAddress ?? "",

        },
        update : {
            imageUrl : user.imageUrl ,
        },
        create : {
            id : userId ,
            emailAddress : user.emailAddresses[0]?.emailAddress ?? "",
            imageUrl : user.imageUrl 
        }
    })

    return redirect('/dashboard');
}


export default SyncUser