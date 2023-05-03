import { useLoaderData } from 'react-router-dom';
import { RetrosPage } from '../../../../components/RetrosPage';
import { Retro } from '../../../../../../lib/projectTypes';
import React from 'react';


export const RetrosLoader = (): JSX.Element => {
    const retros = useLoaderData() as { retros: Retro[] };

    return (
        <div>
            <RetrosPage retros={retros.retros}></RetrosPage>
        </div>
    )
}