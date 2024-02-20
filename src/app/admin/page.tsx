import {redirect} from "next/navigation";

const AdminPage = () => {
    redirect('/admin/texts') // redirect if there's no dashboard
}

export default AdminPage