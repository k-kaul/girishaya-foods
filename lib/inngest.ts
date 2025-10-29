import { Inngest } from "inngest";
import { prisma } from "./prisma";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "girishaya-foods" });

// inngest function to save user info in db
export const addUserToDb = inngest.createFunction(
    { id:'add-user-from-clerk' },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        const { id, first_name,last_name, email_addresses, phone_numbers } = event.data;
        // const userData = {
        //     id,
        //     name: first_name + ' ' + last_name,
        //     email: email_addresses[0].email_address,
        //     phoneNumber: phone_numbers[0].phone_number
        // }
        await prisma.user.create({
            data: {
                id,
                name: first_name + ' ' + last_name,
                email: email_addresses[0].email_address,
                phoneNumber: phone_numbers[0].phone_number
            }
        })
    }
)

// user data update function
export const updateUserData = inngest.createFunction(
    { id: 'update-user-from-clerk' },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        const { id, first_name,last_name, email_addresses, phone_numbers } = event.data;
        
        await prisma.user.update({
            where: {
                id
            },
            data: {
                id,
                name: first_name + ' ' + last_name,
                email: email_addresses[0].email_address,
                phoneNumber: phone_numbers[0].phone_number
            },
        })
    }
)

// inngest funct to delete user
export const removeUserData = inngest.createFunction(
    { id:'remove-user-data' },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {
        const { id } = event.data;
        
        await prisma.user.delete({
            where: {
                id
            }
        })
    }
)