import { Retro } from "../../../lib/projectTypes"
import { UnderlineProjHeader } from "./UnderlineProjHeader"

interface RetrosPageProps {
    retros: Retro[];
    loading?: boolean;
}

export const RetrosPage = (props: RetrosPageProps):JSX.Element => {
    return (
        <div className="flex flex-col items-center h-screen">
            <UnderlineProjHeader title="todo"></UnderlineProjHeader>
            <div className="flex flex-col h-[86%] w-[70%] mt-[2%]">
                
            </div>
        </div>
    )
}