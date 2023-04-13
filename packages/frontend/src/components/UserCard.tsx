import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { palette } from '../context/ProjectThemeProvider';

export function UserCard(): JSX.Element {
    return (
        <Button sx={{ mb: 1 }}>
            <div onClick={() => { console.log("some") }} className=" flex flex-row w-64 h-12 items-center justify-between">
                <Typography>User name</Typography>
                <div className="w-7 h-7 rounded-lg bg-black"></div>
            </div>
        </Button>
    )
}