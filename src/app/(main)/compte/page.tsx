import {UserProfileTabs} from "@/src/components/v2/user/user-profile-tabs";

const AccountPage = async () => {
    return (
        <div className={"flex gap-6"}>
            <UserProfileTabs />
        </div>
    )
}

export default AccountPage