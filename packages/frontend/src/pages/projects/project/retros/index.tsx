import { useLoaderData } from 'react-router-dom';
import { RetrosPage } from '../../../../components/RetrosPage';
import { Retro } from '../../../../../../lib/projectTypes';


export const RetroLoader = (): JSX.Element => {
    const retros = useLoaderData() as { retros: Retro[] };

    return (
        <div>
            <RetrosPage retros={retros.retros}></RetrosPage>
        </div>
    )
}