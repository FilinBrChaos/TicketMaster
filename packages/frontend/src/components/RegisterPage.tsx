import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { UserCard } from "./UserCard";
import { useState } from 'react';
import { useProjectContext } from '../context/ProjectContext';
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid'
import { User } from "../../../proj-api/dist/lib/projectTypes";

interface RegisterPageProps {
    users: User[];
    loading: boolean;
}

export default function RegisterPage(props: RegisterPageProps): JSX.Element {
    const [ users, setUsers ] = useState(props.users);
    const [ openCreateUserDialog, setOpenCreateUserDialog ] = useState(false);
    const [ newUserColor, setNewUserColor ] = useState('#F9FAFB');
    const [ nameValue, setNameValue ] = useState('');
    const { apiClient: client, signIn, userId } = useProjectContext();
    const navigate = useNavigate();
    
    const addUserButtonHandler = () => {
        client.createUser({name: nameValue, color: newUserColor})
            .then(() => { 
                client.getUsers().then((res) => { 
                    setUsers(res) 
                })
            })
        setOpenCreateUserDialog(false);
    }
    
    const deleteUserButtonHandler = (id: number) => {
        client.deleteUser(id).then(() => { 
            client.getUsers().then((res) => {
                setUsers(res);
            })
        })
    }

    const userOnClickHandler = (id: number) => {
        if (!id) throw Error('user id is not present in response');
        //navigate('/projects', { replace: true });
        signIn(id);
    }

    const loginOnClickHandler = () => {
        if (userId) navigate('/projects')
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
            <div className=" flex flex-col  max-h-[500px] overflow-y-auto">
                {users.map((user) => 
                    <UserCard color={user.color} 
                        name={user.name} 
                        onUserClickHandler={() => { userOnClickHandler(user.id) }} 
                        onDeleteUserHandler={() => { deleteUserButtonHandler(user.id) }}
                        key={uuid()}
                        selected={user.id === userId}></UserCard>
                )}
            </div>
            <div className="flex flex-row items-center justify-center mt-6">
                <Button onClick={() => {setOpenCreateUserDialog(true)}}>Add</Button>
                <Button onClick={loginOnClickHandler}>Login</Button>
            </div>
            <Dialog open={openCreateUserDialog}>
                <DialogTitle>Create user</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ width: 50, height: 50, borderRadius: 8, mt: 4, mb: 2, backgroundColor: newUserColor }}></Box>
                    <Button onClick={() => { 
                        setNewUserColor('#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6).toUpperCase()) 
                    }}>change</Button>
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