import { LoadingPage } from './LoadingPage';
import { CreateLabelDialog } from './CreateLabelDialog';
import { useState } from 'react';
import { useProjectContext } from '../context/ProjectContext';
import { LabelCard } from './LabelCard';
import { v4 } from 'uuid';
import { UnderlineProjHeader } from './UnderlineProjHeader';
import { Label, LabelBody } from '../../../proj-api/dist/lib/projectTypes';

interface LabelsPageProps {
    labels: Label[];
    loading?: boolean;
}

export const LabelsPage = (props: LabelsPageProps): JSX.Element => {
    const [ labels, setLabels ] = useState(props.labels);
    const context = useProjectContext();

    const createLabelHandler = (labelName: string, labelColor: string) => {
        const label: LabelBody = {
            project_id: context.getProject(),
            color: labelColor,
            name: labelName
        }
        context.apiClient.createLabel(label).then(() => {
            context.apiClient.getLabels(context.getProject()).then((res) => {
                setLabels(res)
            })
        })
    }

    if (props.loading) return <LoadingPage></LoadingPage>
    return (
        <div className="flex flex-col items-center h-screen">
            <UnderlineProjHeader title='todo'></UnderlineProjHeader>
            <div className="flex flex-col items-center justify-center h-[86%] w-[70%] mt-[2%]">
                <div className='flex flex-col items-center justify-center'>
                    { labels && labels.map(label => <LabelCard key={v4()} title={label.name}></LabelCard>) }
                </div>
                <CreateLabelDialog onCreateButtonClick={createLabelHandler} ></CreateLabelDialog>
            </div>
        </div>
    )
}