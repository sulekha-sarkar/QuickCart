import { Inngest } from "inngest";
import connectDB from "./db";


// Create a client to send and receive events
export const inngest = new Inngest({ id: "snapshop-next" });

// Inngest Function to save user data to a database
export const syncUserCreation = inngest.creatFunction(
    {
        id: 'sync-user-from-clerk'
    },
    { event: 'clerk/user.created' }
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email - address[0].email_address,
            name: first_name + '' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.creat(userData)
    }
)


//Inngest Function to update user data in database
export const syncUserUpdation = inngest.creatFunction(
    {
        id: 'update-user-from-clerk'
    },
        { event: 'clerk/user.updated' },
        async ({event}) => {
            const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email - address[0].email_address,
            name: first_name + '' + last_name,
            imageUrl: image_url
          }
          await connectDB()
          await User.findByIdAndUpdate(id,userData)
        }
)

//Inngest Function to user from the Database
export const syncUserDeletion = inngest.creat(
    {
        id: 'delete-user-with-clerk'
    },
    { event: 'clerk/user.deleted' },
    async ({event})=>{
        const { id } = event.data

        await connectDB()
        await User.findByIdAndUpdate(id)
    }
)