import { Suspense } from 'react';
import { Await, useLoaderData } from "react-router-dom";
import RegisterPage from "../../components/RegisterPage";
import { User } from "../../../lib/types";

export default function Register(): JSX.Element {
    const usersPromise = useLoaderData() as { users: User[] };

    return (
        <Suspense fallback={<RegisterPage users={[]} loading></RegisterPage>}>
            <Await resolve={usersPromise.users}>
                {(users) => {
                    return <RegisterPage users={users} loading={false} />
                }}
            </Await>
        </Suspense>
    )
}