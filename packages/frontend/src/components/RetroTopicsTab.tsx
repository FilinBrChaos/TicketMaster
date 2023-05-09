import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { useProjectContext } from "../context/ProjectContext";
import { CreateItemCard } from "./CreateItemCard";
import { ItemCard } from "./ItemCard";
import { Topic, TopicBody } from "../../../lib/projectTypes";
import { TopicCard } from './TopicCard';

interface RetroTopicsTabProps {
    topics: Topic[];
}

export const RetroTopicsTab = (props: RetroTopicsTabProps): JSX.Element => {
    const [ topics, setTopics ] = useState(props.topics);
    const params = useParams();
    const { apiClient } = useProjectContext();
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.getTopics(Number(params.retroId)).then((res) => {
            setTopics(res);
        })
    }, [])

    const deleteTopicHandler = (topicId: number) => {
        apiClient.deleteTopic(topicId).then(() => {
            apiClient.getTopics(Number(params.retroId)).then((res) => {
                setTopics(res);
            })
        })
    }

    const createTopicHandler = (topicName: string, topicDescription: string) => {
        const topic: TopicBody = {
            name: topicName,
            description: topicDescription,
            retro_id: Number(params.retroId)
        }
        apiClient.createTopic(topic).then(() => {
            apiClient.getTopics(Number(params.retroId)).then((res) => {
                setTopics(res);
            })
        })
    }

    return (
        <div className=" w-full grid grid-cols-3 gap-y-8 justify-items-center">
            {topics.length > 0 ? topics.map((topic) => 
                    <TopicCard 
                        key={v4()}
                        title={topic.name} 
                        description={topic.description}
                        onDeleteClick={() => { deleteTopicHandler(topic.id) }}
                        onClick={() => { navigate('topics/' + topic.id) }}></TopicCard>) 
                :
                null
            }
            <CreateItemCard onDialogCreateClick={createTopicHandler}></CreateItemCard>
        </div>
    )
}