import {User} from "@supabase/auth-js";
import {signOutAction} from "@/app/actions";
import {Button} from "@/components/ui/button";

type UserCardProps = {
    user: User
}
export default function UserCard(props: UserCardProps) {
    const {user} = props;

    return (
        <div className="flex flex-col gap-1">
            <div>
                <form action={signOutAction}>
                        Sign out
                </form>
            </div>
            <div>
                <p>{user.email}</p>
            </div>
        </div>
    );
}