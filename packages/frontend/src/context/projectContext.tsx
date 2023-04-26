import { FC, createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { User, UserBody, Project, ProjectBody, Ticket, TicketBody, Label, LabelBody } from '../../../proj-api/dist/lib/projectTypes';


interface APIClient {
    getUsers: () => Promise<User[]>;
    getUser: (userId: number) => Promise<User>;
    createUser: (user: UserBody) => Promise<number>;
    deleteUser: (userId: number) => Promise<number>;

    getProjects: () => Promise<Project[]>;
    getProject: (projectId: number) => Promise<Project>;
    createProject: (project: ProjectBody) => Promise<number>;
    deleteProject: (projectId: number) => Promise<number>;
    
    getTickets: (projectId: number, queryParams?: any) => Promise<Ticket[]>;
    getTicket: (ticketId: number) => Promise<Ticket>;
    createTicket: (ticket: TicketBody) => Promise<number>;
    deleteTicket: (ticketId: number) => Promise<number>;
    updateTicket: (ticketId: number, ticket: TicketBody) => Promise<number>;

    getLabels: (projectId: number, queryParams?: any) => Promise<Label[]>;
    getLabel: (labelId: number) => Promise<Label>;
    createLabel: (label: LabelBody) => Promise<number>;
    deleteLabel: (labelId: number) => Promise<number>;

}

export interface ProjectContextProps {
    apiClient: APIClient;
    userId: number | null;
    projectId: number | null;
    signIn: (userId: number) => void;
    setProject: (projectId: number) => void;
    getProject: () => number;
}

const ProjectContext = createContext<ProjectContextProps>({
    apiClient: {
        getUsers: async () => {
            throw Error('not implemented')
        },
        getUser: async (userId: number) => {
            throw Error('not implemented')
        },
        createUser: async () => {
            throw Error('not implemented')
        },
        deleteUser: async () => {
            throw Error('not implemented');
        },
        getProjects: async () => {
            throw Error('not implemented')
        },
        getProject: async () => {
            throw Error('not implemented')
        },
        createProject: async () => {
            throw Error('not implemented')
        },
        deleteProject: async () => {
            throw Error('not implemented')
        },
        getTickets: async () => {
            throw Error('not implemented')
        },
        getTicket: async () => {
            throw Error('not implemented')
        },
        createTicket: async () => {
            throw Error('not implemented')
        },
        deleteTicket: async () => {
            throw Error('not implemented')
        },
        updateTicket: async () => {
            throw Error('not implemented')
        },
        getLabels: async () => {
            throw Error('not implemented')
        },
        getLabel: async () => {
            throw Error('not implemented')
        },
        createLabel: async () => {
            throw Error('not implemented')
        },
        deleteLabel: async () => {
            throw Error('not implemented')
        }
    },
    userId: null,
    projectId: null,
    signIn: () => {
        throw Error('not implemented')
    },
    setProject: () => {
        throw Error('not implemented')
    },
    getProject: () => {
        throw Error('not implemented');
    }
});

const getBaseHeaders = (): any => {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
}

interface ProjectContextProviderProps {
    children: any;
}

const apiBasePath = "http://0.0.0.0:3034/dev";

export const ProjectContextProvider: FC<ProjectContextProviderProps> = ({ children }) => {
    const [ userId, setUserId ] = useState<number | null>(getIdFromLocalStorage('userId'));
    const [ projectId, setProjectId ] = useState<number | null>(getIdFromLocalStorage('projectId'));

    useEffect(() => {
        saveToLocalStorage('userId', JSON.stringify(userId));
    }, [userId]);

    useEffect(() => {
        saveToLocalStorage('projectId', JSON.stringify(projectId));
    }, [projectId]);

    const apiClient: APIClient = useMemo(() => {
        const getRequest = async (path: string): Promise<Response> => {
            
            return await fetch(apiBasePath + path, { method: 'GET', headers: getBaseHeaders() });
        };

        const postRequest = async (path: string, body?: string): Promise<Response> => {
            return await fetch(apiBasePath + path, { method: 'POST', body: body, headers: getBaseHeaders() });
        }

        const deleteRequest = async (path: string): Promise<Response> => {
            return await fetch(apiBasePath + path, { method: 'DELETE', headers: getBaseHeaders() });
        }

        const putRequest = async (path: string, body: string): Promise<Response> => {
            return await fetch(apiBasePath + path, { method: 'PUT', body: body, headers: getBaseHeaders() });
        }

        const getUsers =async (): Promise<User[]> => {
            const response = await getRequest('/users');
            const json = await response.json();
            const result = json.users.map((user: { id: any; name: any; color: any; }) => { return { id: Number(user.id), name: user.name, color: user.color } as User})
            if (response.ok) {
                return result;
            } else {
                throw json;
            }
        }

        const getUser = async (userId: number): Promise<User> => {
            const response = await getRequest(`/users/${userId}`);
            const json = await response.json();
            if (response.ok) {
                return json.user;
            } else {
                throw json;
            }
        }

        const createUser = async (user: UserBody): Promise<number> => {
            const response = await postRequest('/users', JSON.stringify(user));
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const deleteUser = async (userId: number): Promise<number> => {
            const response = await deleteRequest(`/users/${userId}`);
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const getProjects = async (): Promise<Project[]> => {
            const response = await getRequest('/projects');
            const json = await response.json();
            console.log(JSON.stringify(json));
            //const result = json.users.map((user: { id: any; name: any; color: any; }) => { return { id: Number(user.id), name: user.name, color: user.color } as User})
            if (response.ok) {
                return json.projects;
            } else {
                throw json;
            }
        }

        const getProject = async (projectId: number): Promise<Project> => {
            const response = await getRequest(`/projects/${projectId}`);
            const json = await response.json();
            if (response.ok) {
                return json.project;
            } else {
                throw json;
            }
        }

        const createProject = async (project: ProjectBody): Promise<number> => {
            const response = await postRequest('/projects', JSON.stringify(project));
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const deleteProject = async (projectId: number): Promise<number> => {
            const response = await deleteRequest(`/projects/${projectId}`);
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const getTickets = async (projectId: number, queryParams?: any): Promise<Ticket[]> => {
            const response = await getRequest(`/tickets/${projectId}`);
            const json = await response.json();
            console.log(JSON.stringify(json));
            if (response.ok) {
                return json.tickets;
            } else {
                throw json;
            }
        }

        const getTicket = async (ticketId: number): Promise<Ticket> => {
            const response = await getRequest(`/ticket/${ticketId}`);
            const json = await response.json();
            if (response.ok) {
                return json.ticket;
            } else {
                throw json;
            }
        }

        const createTicket = async (ticket: TicketBody): Promise<number> => {
            console.log(JSON.stringify(ticket));
            const response = await postRequest(`/tickets`, JSON.stringify(ticket));
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const deleteTicket = async (ticketId: number): Promise<number> => {
            const response = await deleteRequest(`/tickets/${ticketId}`);
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const updateTicket = async (ticketId: number, ticket: TicketBody): Promise<number> => {
            const response = await putRequest(`/tickets/${ticketId}`, JSON.stringify(ticket));
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const getLabels = async (projectId: number, queryParams?: any): Promise<Ticket[]> => {
            const response = await getRequest(`/labels/${projectId}`);
            const json = await response.json();
            console.log(JSON.stringify(json));
            if (response.ok) {
                return json.labels;
            } else {
                throw json;
            }
        }

        const getLabel = async (labelId: number): Promise<Ticket> => {
            const response = await getRequest(`/label/${labelId}`);
            const json = await response.json();
            if (response.ok) {
                return json.label;
            } else {
                throw json;
            }
        }

        const createLabel = async (label: LabelBody): Promise<number> => {
            console.log(JSON.stringify(label));
            const response = await postRequest(`/labels`, JSON.stringify(label));
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const deleteLabel = async (labelId: number): Promise<number> => {
            const response = await deleteRequest(`/labels/${labelId}`);
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }


        return{
            getUsers,
            getUser,
            createUser,
            deleteUser,
            getProjects,
            getProject,
            createProject,
            deleteProject,
            getTickets,
            getTicket,
            createTicket,
            deleteTicket,
            updateTicket,
            getLabels,
            getLabel,
            createLabel,
            deleteLabel
        }
    }, []);

    const signIn = useCallback((userId: number) => {
        setUserId(userId);
    }, []);

    const setProject = useCallback((projectId: number) => {
        setProjectId(projectId);
    }, []);

    const getProject = useCallback(() => {
        if (projectId) return projectId;
        throw Error('Project id is not present');
    }, [projectId])

    const projectContext: ProjectContextProps = {
        apiClient,
        userId,
        projectId,
        signIn,
        setProject,
        getProject
    };

    return <ProjectContext.Provider value={projectContext}>{children}</ProjectContext.Provider>;

};

const saveToLocalStorage = (itemName: string, itemObj: string) => {
    localStorage.setItem(itemName, itemObj);
}

const getIdFromLocalStorage = (keyName: string): number | null => {
    try {
        const id = localStorage.getItem(keyName);
        return id ? JSON.parse(id) : null;
    } catch (e) {
        return null;
    }
}

export const useProjectContext = () => useContext(ProjectContext);