import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { TicketPage } from "../../../../components/TicketPage";
import { Label, Ticket, User } from "../../../../../../lib/projectTypes";


export const TicketLoader = (): JSX.Element => {
    const ticketPromise = useLoaderData() as { ticket: Ticket, assignedUsers: User[], labels: Label[] };
    const emptyTicket: Ticket = { name: '---', created_at: '---', updated_at: '---', project_id: 0, id: 0 }

    return (
        <div>
            <TicketPage ticket={ticketPromise.ticket} 
                users={ticketPromise.assignedUsers} 
                labels={ticketPromise.labels} 
                loading={false}></TicketPage>
        </div>
    )
}