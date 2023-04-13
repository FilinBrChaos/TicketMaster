import { Box, Button } from "@mui/material";
import { UserCard } from "../../components/UserCard";

export default function Register(): JSX.Element {
    return (
        <div className={"w-screen h-screen flex flex-col items-center justify-center"}> 
            <div className=" flex flex-col">
                <UserCard></UserCard>
                <UserCard></UserCard>
                <UserCard></UserCard>
                <UserCard></UserCard>
            </div>
            <div>
                <Button sx={{ mt: 2 }}>Add</Button>
            </div>
        </div>
    );
}