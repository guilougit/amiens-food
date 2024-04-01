import {ReactNode} from "react";
import {ModalNoSubscription} from "@/src/components/v2/modal-no-subscription";

const AccountLayout = ({children}:{children: ReactNode}) => {
    return (
        <div className={"pt-20 md:pt-24 bg-white"}>
            {children}
            
            <ModalNoSubscription />
        </div>
    )
}

export default AccountLayout