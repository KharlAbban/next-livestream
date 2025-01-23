import { UserButton } from "@clerk/nextjs";

export default function HomePage () {
    return (
        <div>
            <p>Homepage when logged in</p>
            <UserButton />
        </div>
    )
}