import { Suspense } from 'react';
import { useLoaderData, Await, useLocation, Outlet } from 'react-router-dom';
import { LabelsPage } from '../../../../components/LabelsPage';
import { Label } from '../../../../../../proj-api/dist/lib/projectTypes';

export default function Labels(): JSX.Element {
    const labelsPromise = useLoaderData() as { labels: Label[] };

    return (
        <div>
            <Suspense fallback={<LabelsPage labels={[]} loading></LabelsPage>}>
                <Await resolve={labelsPromise.labels}>
                    {(labels) => {
                        return <LabelsPage labels={labels} loading={false} ></LabelsPage>
                    }}
                </Await>
            </Suspense>
        </div>
    )
}