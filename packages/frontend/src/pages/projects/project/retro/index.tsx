import { Outlet, useLoaderData, useLocation, useParams } from 'react-router-dom';
import { RetrosPage } from '../../../../components/RetrosPage';
import { Note, Retro, Topic } from '../../../../../../lib/projectTypes';
import React from 'react';
import { RetroPage } from '../../../../components/RetroPage';


export const RetroLoader = (): JSX.Element => {
    const data = useLoaderData() as { retro: Retro, notes: Note[], topics: Topic[] };
    const { pathname } = useLocation();
    const { id, retroId } = useParams();

    return (
        <div>
            {pathname === `/projects/${id}/retros/${retroId}` ?
                <RetroPage topics={data.topics} notes={data.notes}></RetroPage>
                :
                <Outlet />
            }
        </div>
    )
}