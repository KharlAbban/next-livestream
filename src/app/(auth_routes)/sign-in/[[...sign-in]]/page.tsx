import { SignIn } from "@clerk/nextjs";

export default function SignInPage () {
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-theme-black">
            <SignIn />
        </div>
    )
}