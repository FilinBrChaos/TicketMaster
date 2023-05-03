import { v4 } from "uuid";
import { Retro, RetroBody } from "../../../lib/projectTypes"
import { UnderlineProjHeader } from "./UnderlineProjHeader"
import { useState, useEffect } from 'react';
import { ItemCard } from "./ItemCard";
import { CreateItemCard } from "./CreateItemCard";
import { useProjectContext } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';

interface RetrosPageProps {
    retros: Retro[];
    loading?: boolean;
}

export const RetrosPage = (props: RetrosPageProps):JSX.Element => {
    const [ retros, setRetros ] = useState(props.retros);
    const { apiClient, getProject } = useProjectContext();
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.getRetros(getProject()).then((res) => {
            setRetros(res)
        })
    }, []);

    const onRetroCreateClick = (retroName: string, retroDescription: string) => {
        const retro: RetroBody = {
            name: retroName,
            description: retroDescription,
            project_id: getProject()
        }
        apiClient.createRetro(retro).then(() => {
            apiClient.getRetros(getProject()).then((res) => {
                setRetros(res);
            })
        })
    }

    const deleteRetroHandler = (retroId: number) => {
        apiClient.deleteRetro(retroId).then(() => {
            apiClient.getRetros(getProject()).then((res) => {
                setRetros(res)
            })
        })
    }

    return (
        <div className="flex flex-col items-center h-screen">
            <UnderlineProjHeader title="todo"></UnderlineProjHeader>
            <div className="w-9/12 h-5/6 mt-10">
                <div className=" w-full grid grid-cols-3 gap-y-8 justify-items-center">
                    {retros.length > 0 ? 
                    retros.map((retro) => 
                        <ItemCard 
                            title={retro.name}
                            description={retro.description}
                            onClick={() => { navigate(`/projects/${getProject()}/retros/${retro.id}`) }}
                            onDeleteClick={() => { deleteRetroHandler(retro.id) }}
                            key={v4()}></ItemCard>) :
                        null}
                    <CreateItemCard onDialogCreateClick={onRetroCreateClick} />
                </div>
            </div>
        </div>
    )
}