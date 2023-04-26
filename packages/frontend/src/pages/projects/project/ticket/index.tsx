import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { Ticket } from "../../../../../lib/types";
import { TicketPage } from "../../../../components/TicketPage";


export const TicketLoader = (): JSX.Element => {
    const ticketPromise = useLoaderData() as { ticket: Ticket };
    const emptyTicket: Ticket = { name: '---', created_at: '---', updated_at: '---', project_id: 0, id: 0 }

    return (
        <div>
            <Suspense fallback={<TicketPage ticket={emptyTicket} loading></TicketPage>}>
                <Await resolve={ticketPromise.ticket}>
                    {(ticket) => {
                        return <TicketPage ticket={ticket} loading={false}></TicketPage>
                    }}
                </Await>
            </Suspense>
        </div>
    )
}