import { Project } from "../../lib/types";
import { Header } from "./Header";
import { LoadingPage } from "./LoadingPage";

interface ProjectPageProps {
    project?: Project;
    loading: boolean;
}

export const ProjectPage = (props: ProjectPageProps): JSX.Element => {


    if (props.loading || !props.project) return <LoadingPage />
    return (
        <div>
            <Header title="Pr"></Header>
        </div>
    )
}