import { useLoaderData, useSearchParams } from 'react-router-dom';
import { UnderlineProjHeader } from './UnderlineProjHeader';
import { RetroTabsSelector } from './RetroTabsSelector';
import { RetroTopicsTab } from './RetroTopicsTab';
import { RetroNotesTab } from './RetroNotesTab';
import { Note, Retro, Topic } from '../../../lib/projectTypes';

interface RetroPageProps {
    topics: Topic[];
    notes: Note[];
}

export const RetroPage = (props: RetroPageProps): JSX.Element => {
    const [ pathSearchParams ] = useSearchParams();
    const currentTab = pathSearchParams.get('tab');

    return (
        <div className="flex flex-col items-center w-screen h-screen">
            <UnderlineProjHeader title="todo"></UnderlineProjHeader>
            <RetroTabsSelector />

            <div className="h-[84%] w-[70%] mt-[2%]">
                {currentTab === 'topics' ? 
                    <RetroTopicsTab topics={props.topics} />
                    :
                    <RetroNotesTab notes={ props.notes } />
                }
            </div>
        </div>
    )
}