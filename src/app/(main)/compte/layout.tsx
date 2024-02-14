import {ReactNode} from "react";

const AccountLayout = ({children}:{children: ReactNode}) => {
    return (
        <div className={"pt-24 bg-white"}>
            {children}
        </div>
    )
}

export default AccountLayout