import { Button, Typography } from "@mui/material"
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useProjectContext } from '../context/ProjectContext';

interface UnderlineProjHeaderProps {
    title: string;
}

export const UnderlineProjHeader = (props: UnderlineProjHeaderProps): JSX.Element => {
    const navigate = useNavigate();
    const context = useProjectContext();
    const { id } = useParams()

    return (
        <div className="flex flex-row items-center w-screen h-[8%] px-20 border-b">
            <Link to="/projects">
                <Typography variant="h4" className="cursor-pointer">{props.title}</Typography>
            </Link>
            <div className=" ml-10">
                <Button onClick={() => { navigate('/projects/' + id) }}>Tickets</Button>
                <Button onClick={() => { navigate('/projects/' + id + '/labels') }}>Labels</Button>
                <Button onClick={() => { navigate('/projects/' + id + '/retros') }}>Retro</Button>
            </div>
        </div>

    )
}