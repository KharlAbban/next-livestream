import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { Payload } from '@/utils/types';
import User from '@/lib/models/user_model';
import { connectToDatabase } from '@/utils/db_mongoose';

export async function POST(req: Request) {
  
  await connectToDatabase();
  
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  const { id } = evt.data
  const eventType = evt.type
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)

//   Get the user's information
const newUserInfo = getUserInfo(payload);

//  Create a new user document or update existing one in Sanity
try {

    const existingUser = await User.findOne({ clerkUserId: newUserInfo.clerkId });
    
    if (eventType === 'user.created' && !existingUser) {
      await User.create({
        clerkUserId: newUserInfo.clerkId,
        username: newUserInfo.username,
        email: newUserInfo.email,
        imageUrl: newUserInfo.profileImage,
        following: [],
        followedBy: []
      });
      console.log("User created in database successfully!");
    } else if (eventType === 'user.updated' && existingUser != null) {
      await User.findOneAndUpdate(
        { clerkUserId: newUserInfo.clerkId },
        {
          username: newUserInfo.username,
          email: newUserInfo.email,
          imageUrl: newUserInfo.profileImage
        }
      );
      console.log("User updated in database successfully!");
    } else if (eventType === 'user.deleted' && existingUser != null) {
      await User.findOneAndDelete({ clerkUserId: newUserInfo.clerkId });
      console.log("User deleted from database successfully!");
    }

} catch (error) {
  console.log(error!);
  return new Response('Error: Database sync error', {
    status: 500,
  })
}


  return new Response('Webhook received', { status: 200 })
}

function getUserInfo(payload: Payload) {
    const data = payload.data;
    const emailData = data.email_addresses[0];
  
    const userInfo = {
      clerkId: data.id,
      username: data.username,
      email: emailData?.email_address,
      profileImage: data.image_url
    };
  
    return userInfo;
}