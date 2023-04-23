import { Button, Typography } from "@mui/material"

interface UnderlineProjHeaderProps {
    title: string;
}

export const UnderlineProjHeader = (props: UnderlineProjHeaderProps): JSX.Element => {
    return (
        <div className="flex flex-row items-center w-screen h-[8%] px-20 border-b">
            <Typography variant="h4">{props.title}</Typography>
            <div className=" ml-10">
                <Button>Tickets</Button>
                <Button>Retro</Button>
            </div>
        </div>

    )
}