import { useRouteError } from 'react-router-dom';
import { USER_NOT_LOGGED_IN } from '../lib/errors';
import { Typography } from '@mui/material';


export function RootError(): JSX.Element {
    const error = useRouteError();
    const errorMessage = (error as Error)?.message ?? 'Unknown Error';

    if (errorMessage === USER_NOT_LOGGED_IN) {
        window.location.replace('/register');
    }

    return (
        <div>
            <Typography>{errorMessage}</Typography>
        </div>
    );
}