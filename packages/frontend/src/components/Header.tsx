import { Box, Button, Typography } from "@mui/material";
import { useProjectContext } from '../context/ProjectContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    title: string;
}

export function Header(props: HeaderProps): JSX.Element {
    const context = useProjectContext();
    const [ user, setUser ] = useState({ name: 'log in', color: 'white' });
    const navigate = useNavigate();

    useEffect(() => {
        if (context.userId) {
            context.apiClient.getUser(context.userId).then((user) => { setUser({ name: user.name, color: user.color }) });
        }
    }, [context.userId, context.apiClient]);

    const userOnClickHandler = () => {
        navigate('/register');
    }

    return (
        <div className="flex flex-row items-center justify-between w-screen h-28 px-20">
            <Typography variant="h4">{props.title}</Typography>
            <Button onClick={userOnClickHandler}>
                <div className="flex flex-row items-center">
                    <Typography sx={{ pr: 3 }}>{user.name}</Typography>
                    <Box sx={{ width: 36, height: 36, backgroundColor: user.color, borderRadius: 100 }}></Box>
                </div>
            </Button>
        </div>
    )
}