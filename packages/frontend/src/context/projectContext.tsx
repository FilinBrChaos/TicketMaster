import { FC, createContext, useCallback, useContext, useMemo, useState } from "react";
import Register from "../pages/register";
import { User } from '../../lib/types';


interface APIClient {
    getUsers: () => Promise<User[]>;
    createUser: (user: User) => Promise<number>;
}

export interface ProjectContextProps {
    apiClient: APIClient;
    userId: number | undefined;
    userIsAuthenticated: boolean;
}

const ProjectContext = createContext<ProjectContextProps>({
    apiClient: {
        getUsers: () => {
            throw Error('not implemented')
        },
        createUser: () => {
            throw Error('not implemented')
        }
    },
    userId: undefined,
    userIsAuthenticated: false
});

interface ProjectContextProviderProps {
    children: any;
}

const apiBasePath = "http://0.0.0.0:3034/dev";

export const ProjectContextProvider: FC<ProjectContextProviderProps> = ({ children }) => {
    const [ userId, setUserId ] = useState<number | undefined>();
    const [ userIsAuthenticated, setUserIsAuthenticated ] = useState(false);


    const apiClient: APIClient = useMemo(() => {
        const getRequest = async (path: string): Promise<Response> => {
            return await fetch(apiBasePath + path, { method: 'GET' });
        };

        const postRequest = async (path: string, body?: string): Promise<Response> => {
            return await fetch(apiBasePath + path, { method: 'POST', body: body });
        }

        const getUsers =async (): Promise<User[]> => {
            const response = await getRequest('/users');
            const json = await response.json();
            if (response.ok) {
                return json.users;
            } else {
                throw json;
            }
        }

        const createUser = async (user: User): Promise<number> => {
            const response = await postRequest('/user', JSON.stringify(user));
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }
        return{
            getUsers,
            createUser
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