import { SignUp } from "@clerk/nextjs";

export default function SignUpPage () {
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-theme-black">
            <SignUp />
        </div>
    )
}