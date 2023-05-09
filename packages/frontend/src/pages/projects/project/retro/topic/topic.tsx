import { Await, useLoaderData } from 'react-router-dom';
import { TopicPage } from '../../../../../components/TopicPage';
import { Topic } from '../../../../../../../lib/projectTypes';
import { Suspense } from 'react';
import ProjectsPage from '../../../../../components/ProjectsPage';


export const TopicLoader = (): JSX.Element => {
    const topicPromise = useLoaderData() as { topic: Topic };
    const emptyTopic: Topic = { id: 0, name: '---', created_at: '---', updated_at: '---', retro_id: 0 }

    return (
        <div>
            <Suspense fallback={<TopicPage topic={emptyTopic} loading></TopicPage>}>
                <Await resolve={topicPromise.topic}>
                    {(topic) => {
                        return <TopicPage topic={topic} loading={false} />
                    }}
                </Await>
            </Suspense>

        </div>
    )
}