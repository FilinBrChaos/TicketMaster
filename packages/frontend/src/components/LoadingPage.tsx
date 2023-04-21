import { CircularProgress } from "@mui/material"

export const LoadingPage = (): JSX.Element => {
    return (
        <div className=" w-full h-screen flex justify-center items-center">
            <CircularProgress></CircularProgress>
        </div>
    )
}