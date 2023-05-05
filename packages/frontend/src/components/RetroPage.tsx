import { useLoaderData, useSearchParams } from 'react-router-dom';
import { UnderlineProjHeader } from './UnderlineProjHeader';
import { RetroTabsSelector } from './RetroTabsSelector';
import { RetroTopicsTab } from './RetroTopicsTab';
import { RetroNotesTab } from './RetroNotesTab';
import { Note, Retro, Topic } from '../../../lib/projectTypes';
export const RetroPage = (): JSX.Element => {
    const data = useLoaderData() as { retro: Retro, notes: Note[], topics: Topic[] };
    const [ pathSearchParams ] = useSearchParams();
    const currentTab = pathSearchParams.get('tab');

    return (
        <div className="flex flex-col items-center w-screen h-screen">
            <UnderlineProjHeader title="todo"></UnderlineProjHeader>
            <RetroTabsSelector />

            <div className="h-[84%] w-[70%] mt-[2%]">
                {currentTab === 'topics' ? 
                    <RetroTopicsTab topics={data.topics} />
                    :
                    <RetroNotesTab notes={ data.notes } />
                }
            </div>
        </div>
    )
}