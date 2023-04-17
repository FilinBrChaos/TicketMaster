import { FC, createContext, useCallback, useContext, useMemo, useState } from "react";
import Register from "../pages/register";

interface APIClient {
    getUser: () => Promise<void>;
}

export interface ProjectContextProps {
    apiClient: APIClient;
    userId: number | undefined;
    userIsAuthenticated: boolean;
}

const ProjectContext = createContext<ProjectContextProps>({
    apiClient: {
        getUser: () => {
            throw 'not implemented'
        }
    },
    userId: undefined,
    userIsAuthenticated: false
});

interface ProjectContextProviderProps {
    children: any;
}

export const ProjectContextProvider: FC<ProjectContextProviderProps> = ({ children }) => {
    const [ userId, setUserId ] = useState<number | undefined>();
    const [ userIsAuthenticated, setUserIsAuthenticated ] = useState(false);


    const apiClient: APIClient = useMemo(() => {
        const getUser =async (): Promise<void> => {
            console.log('not implemented');
        }
        return{
            getUser
        }
    }, []);

    const projectContext: ProjectContextProps = {
        apiClient,
        userId,
        userIsAuthenticated,

    };

    return <ProjectContext.Provider value={projectContext}>{children}</ProjectContext.Provider>;

};  

export const useProjectContext = () => useContext(ProjectContext);