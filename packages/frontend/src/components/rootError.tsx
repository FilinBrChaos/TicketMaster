import { useRouteError } from 'react-router-dom';
import { USER_NOT_LOGGED_IN } from '../lib/errors';
import Register from '../pages/register';
import { Typography } from '@mui/material';


export function RootError(): JSX.Element {
    const error = useRouteError();
    const errorMessage = (error as Error)?.message ?? 'Unknown Error';
    const userNotLoggedIn = errorMessage === USER_NOT_LOGGED_IN;

    if (userNotLoggedIn)
        return <Register></Register>
  
    return (
        <div>
            <Typography>{errorMessage}</Typography>
        </div>
    );
}