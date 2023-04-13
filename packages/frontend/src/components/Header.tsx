import { Button, Typography } from "@mui/material";

interface HeaderProps {
    title: string;
    user: string;
}

export function Header(props: HeaderProps): JSX.Element {
    return (
        <div className="flex flex-row items-center justify-between w-screen h-28 px-20">
            <Typography variant="h4">{props.title}</Typography>
            <Button>
                <div className="flex flex-row items-center bg-white">
                    <Typography sx={{ pr: 3 }}>{props.user}</Typography>
                    <div className=" w-9 h-9 bg-black rounded-full"></div>
                </div>
            </Button>
        </div>
    )
}