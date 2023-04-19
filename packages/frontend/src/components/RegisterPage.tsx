import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { UserCard } from "./UserCard";
import { useState } from 'react';
import { useProjectContext } from '../context/ProjectContext';
import { User } from "../../lib/types";

interface RegisterPageProps {
    users: User[];
    loading: boolean;
}

export default function RegisterPage(props: RegisterPageProps): JSX.Element {
    const [ users, setUsers ] = useState(props.users);
    const [ openCreateUserDialog, setOpenCreateUserDialog ] = useState(false);
    const [ newUserColor, setNewUserColor ] = useState('#F9FAFB');
    const [ nameValue, setNameValue ] = useState('');
    const client = useProjectContext().apiClient;

    const addUserButtonHandler = () => {

        Promise.all([
            client
                .createUser({name: nameValue, color: newUserColor})
                .then((res) => { return res }),
            client
                .getUsers()
                .then((res) => { return res })
        ]).then((res) => { setUsers(res[1]) })
    }

    if (props.loading) {
        return (
            <div className=" w-full h-screen flex justify-center items-center">
                <CircularProgress></CircularProgress>
            </div>
        )
    }

    return (
        <div className={"w-screen h-screen flex flex-col items-center justify-center"}> 
            <div className=" flex flex-col">
                {users.map((user) => <UserCard color={user.color} name={user.name}></UserCard>)}
            </div>
            <div>
                <Button sx={{ mt: 2 }} onClick={() => {setOpenCreateUserDialog(true)}}>Add</Button>
            </div>
            <Dialog open={openCreateUserDialog}>
                <DialogTitle>Create user</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ width: 50, height: 50, borderRadius: 8, mt: 4, mb: 2, backgroundColor: newUserColor }}></Box>
                    <Button onClick={() => { setNewUserColor('#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6).toUpperCase()) }}>change</Button>
                    <TextField label="name" sx={{ mt: 5 }} onChange={(e) => { setNameValue(e.target.value) }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={addUserButtonHandler}>Add</Button>
                    <Button onClick={() => { setOpenCreateUserDialog(false); }}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}