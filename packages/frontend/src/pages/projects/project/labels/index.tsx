import { Suspense } from 'react';
import { useLoaderData, Await, useLocation, Outlet } from 'react-router-dom';
import { Label } from '../../../../../lib/types';
import { LabelsPage } from '../../../../components/LabelsPage';

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