import { FC, createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { CommentBody, Comment, Label, LabelBody, Project, ProjectBody, Ticket, TicketBody, User, UserBody, Retro, RetroBody, Note, NoteBody, Topic, TopicBody, TopicRating } from '../../../lib/projectTypes';


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
    getAssignedToTopicTicket: (topicId: number) => Promise<Ticket[]>;
    createTicket: (ticket: TicketBody) => Promise<number>;
    deleteTicket: (ticketId: number) => Promise<number>;
    changeTicketStatus: (ticketId: number, newStatus: 'Open' | 'Closed') => Promise<number>;
    updateTicket: (ticketId: number, ticket: TicketBody) => Promise<number>;

    getLabels: (projectId: number, queryParams?: string) => Promise<Label[]>;
    getLabel: (labelId: number) => Promise<Label>;
    createLabel: (label: LabelBody) => Promise<number>;
    deleteLabel: (labelId: number) => Promise<number>;

    commentTicket: (ticketId: number, comment: CommentBody) => Promise<number>;
    getTicketComments: (ticketId: number) => Promise<Comment[]>;

    commentTopic: (topicId: number, comment: CommentBody) => Promise<number>;
    getTopicComments: (topicId: number) => Promise<Comment[]>;

    assignUsersToTicket: (ticketId: number, usersIds: number[]) => Promise<void>;
    getAssignedUsers: (ticketId: number) => Promise<User[]>;
    getUnassignedUsers: (ticketId: number) => Promise<User[]>;
    unassignUserFromTicket: (ticketId: number, userId: number) => Promise<number>;

    getRetros: (projectId: number) => Promise<Retro[]>;
    getRetro: (retroId: number) => Promise<Retro>;
    createRetro: (retro: RetroBody) => Promise<number>;
    deleteRetro: (retroId: number) => Promise<number>;

    getNotes: (retroId: number) => Promise<Note[]>;
    getNote: (noteId: number) => Promise<Note>;
    createNote: (note: NoteBody) => Promise<number>;
    deleteNote: (noteId: number) => Promise<number>;

    getTopics: (retroId: number) => Promise<Topic[]>;
    getTopic: (topicId: number) => Promise<Topic>;
    createTopic: (topic: TopicBody) => Promise<number>;
    deleteTopic: (topicId: number) => Promise<number>;

    addLabelsToTicket: (ticketId: number, labelsIds: number[]) => Promise<void>;
    getTicketLabels: (ticketId: number) => Promise<Label[]>;
    getNotTicketLabels: (ticketId: number, projectId: number) => Promise<Label[]>;
    removeLabelFromTicket: (ticketId: number, labelId: number) => Promise<number>;

    getTopicScore: (topicId: number, userId: number) => Promise<TopicRating | null>;
    changeTopicScore: (topicId: number, userId: number, newScore: number) => Promise<void>;

    addNotesToTopic: (topicId: number, notesIds: number[]) => Promise<void>;
    getTopicNotes: (topicId: number) => Promise<Note[]>;
    getNotTopicNotes: (topicId: number, retroId: number) => Promise<Note[]>;
    removeNoteFromTopic: (topicId: number, noteId: number) => Promise<number>;
}

export interface ProjectContextProps {
    apiClient: APIClient;
    userId: number | null;
    projectId: number | null;
    signIn: (userId: number) => void;
    setProject: (projectId: number) => void;
    getProject: () => number;
    getUser: () => number;
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
        getAssignedToTopicTicket: async () => {
            throw Error('not implemented')
        },
        createTicket: async () => {
            throw Error('not implemented')
        },
        changeTicketStatus: async () => {
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
        },
        commentTicket: async () => {
            throw Error('not implemented')
        },
        getTicketComments: async () => {
            throw Error('not implemented')
        },
        commentTopic: async () => {
            throw Error('not implemented')
        },
        getTopicComments: async () => {
            throw Error('not implemented')
        },
        assignUsersToTicket: async () => {
            throw Error('not implemented')
        },
        getAssignedUsers: async () => {
            throw Error('not implemented')
        },
        getUnassignedUsers: async () => {
            throw Error('not implemented')
        },
        unassignUserFromTicket: async () => {
            throw Error('not implemented')
        },
        getRetros: async () => {
            throw Error('not implemented')
        },
        getRetro: async () => {
            throw Error('not implemented')
        },
        createRetro: async () => {
            throw Error('not implemented')
        },
        deleteRetro: async () => {
            throw Error('not implemented')
        },
        getNotes: async () => {
            throw Error('not implemented')
        },
        getNote: async () => {
            throw Error('not implemented')
        },
        createNote: async () => {
            throw Error('not implemented')
        },
        deleteNote: async () => {
            throw Error('not implemented')
        },
        getTopics: async () => {
            throw Error('not implemented')
        },
        getTopic: async () => {
            throw Error('not implemented')
        },
        createTopic: async () => {
            throw Error('not implemented')
        },
        deleteTopic: async () => {
            throw Error('not implemented')
        },
        addLabelsToTicket: async () => {
            throw Error('not implemented')
        },
        getTicketLabels: async () => {
            throw Error('not implemented')
        },
        getNotTicketLabels: async () => {
            throw Error('not implemented')
        },
        removeLabelFromTicket: async () => {
            throw Error('not implemented')
        },
        getTopicScore: async () => {
            throw Error('not implemented')
        },
        changeTopicScore: async () => {
            throw Error('not implemented')
        },
        addNotesToTopic: async () => {
            throw Error('not implemented')
        },
        getNotTopicNotes: async () => {
            throw Error('not implemented')
        },
        getTopicNotes: async () => {
            throw Error('not implemented')
        },
        removeNoteFromTopic: async () => {
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
    },
    getUser: () => {
        throw Error('not implemented')
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

        const getTickets = async (projectId: number, queryParams?: string): Promise<Ticket[]> => {
            const response = await getRequest(`/tickets/${projectId}${queryParams ? queryParams : ''}`);
            const json = await response.json();
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

        const getAssignedToTopicTicket = async (topicId: number): Promise<Ticket[]> => {
            const response = await getRequest(`/assigned-tickets?topic_id=${topicId}`);
            const json = await response.json();
            if (response.ok) {
                return json.tickets;
            } else {
                throw json;
            }
        }

        const createTicket = async (ticket: TicketBody): Promise<number> => {
            const response = await postRequest(`/tickets`, JSON.stringify(ticket));
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const changeTicketStatus = async (ticketId: number, newStatus: 'Open' | 'Closed'): Promise<number> => {
            const response = await postRequest(`/ticket-update-status?ticket_id=${ticketId}`, JSON.stringify({ status: newStatus }));
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

        const getLabels = async (projectId: number, queryParams?: string): Promise<Label[]> => {
            const response = await getRequest(`/labels/${projectId}${queryParams ? "?" + queryParams : ''}`);
            const json = await response.json();
            console.log(JSON.stringify(json));
            if (response.ok) {
                return json.labels;
            } else {
                throw json;
            }
        }

        const getLabel = async (labelId: number): Promise<Label> => {
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

        const commentTicket = async (ticketId: number, comment: CommentBody): Promise<number> => {
            const response = await postRequest(`/comments?ticket_id=${ticketId}`, JSON.stringify(comment));
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const getTicketComments = async (ticketId: number): Promise<Comment[]> => {
            const response = await getRequest(`/comments?ticket_id=${ticketId}`);
            const json = await response.json();
            if (response.ok) {
                return json.comments;
            } else {
                throw json;
            }
        }

        const commentTopic = async (topicId: number, comment: CommentBody): Promise<number> => {
            const response = await postRequest(`/comments?topic_id=${topicId}`, JSON.stringify(comment));
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const getTopicComments = async (topicId: number): Promise<Comment[]> => {
            const response = await getRequest(`/comments?topic_id=${topicId}`);
            const json = await response.json();
            if (response.ok) {
                return json.comments;
            } else {
                throw json;
            }
        }

        const assignUsersToTicket = async (ticketId: number, usersIds: number[]): Promise<void> => {
            const postObj = {
                assignUsers: usersIds.map((userId) => { return { user_id: userId, ticket_id: ticketId } })
            }
            const response = await postRequest(`/assign-users`, JSON.stringify(postObj));
            const json = await response.json();
            if (!response.ok) {
                throw json;
            }
        }

        const getAssignedUsers = async (ticketId: number): Promise<User[]> => {
            const response = await getRequest(`/assign-users?ticket_id=${ticketId}`);
            const json = await response.json();
            if (response.ok) {
                return json.assignedUsers;
            } else {
                throw json;
            }
        }

        const getUnassignedUsers = async (ticketId: number): Promise<User[]> => {
            const response = await getRequest(`/unassign-users?ticket_id=${ticketId}`);
            const json = await response.json();
            if (response.ok) {
                return json.unAssignedUsers;
            } else {
                throw json;
            }
        }

        const unassignUserFromTicket = async (ticketId: number, userId: number): Promise<number> => {
            const response = await deleteRequest(`/assign-users?ticket_id=${ticketId}&user_id=${userId}`);
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const getRetros = async (projectId: number): Promise<Retro[]> => {
            const response = await getRequest(`/retros/${projectId}`);
            const json = await response.json();
            if (response.ok) {
                return json.retros;
            } else {
                throw json;
            }
        }

        const getRetro = async (retroId: number): Promise<Retro> => {
            const response = await getRequest(`/retro/${retroId}`);
            const json = await response.json();
            if (response.ok) {
                return json.retro;
            } else {
                throw json;
            }
        }

        const createRetro = async (retro: RetroBody): Promise<number> => {
            const response = await postRequest(`/retros`, JSON.stringify(retro));
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const deleteRetro = async (retroId: number): Promise<number> => {
            const response = await deleteRequest(`/retros/${retroId}`);
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const getNotes = async (retroId: number): Promise<Note[]> => {
            const response = await getRequest(`/notes/${retroId}`);
            const json = await response.json();
            if (response.ok) {
                return json.notes;
            } else {
                throw json;
            }
        }

        const getNote = async (noteId: number): Promise<Note> => {
            const response = await getRequest(`/note/${noteId}`);
            const json = await response.json();
            if (response.ok) {
                return json.note;
            } else {
                throw json;
            }
        }

        const createNote = async (note: NoteBody): Promise<number> => {
            const response = await postRequest(`/notes`, JSON.stringify(note));
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const deleteNote = async (noteId: number): Promise<number> => {
            const response = await deleteRequest(`/notes/${noteId}`);
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const getTopics = async (retroId: number): Promise<Topic[]> => {
            const response = await getRequest(`/topics/${retroId}`);
            const json = await response.json();
            if (response.ok) {
                return json.topics;
            } else {
                throw json;
            }
        }

        const getTopic = async (topicId: number): Promise<Topic> => {
            const response = await getRequest(`/topic/${topicId}`);
            const json = await response.json();
            if (response.ok) {
                return json.topic;
            } else {
                throw json;
            }
        }

        const createTopic = async (topic: TopicBody): Promise<number> => {
            const response = await postRequest(`/topics`, JSON.stringify(topic));
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const deleteTopic = async (topicId: number): Promise<number> => {
            const response = await deleteRequest(`/topics/${topicId}`);
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        }

        const addLabelsToTicket = async (ticketId: number, labelsIds: number[]): Promise<void> => {
            const postObj = {
                ticketsLabels: labelsIds.map((labelId) => { return { label_id: labelId, ticket_id: ticketId } })
            }
            const response = await postRequest(`/add-labels-to-ticket`, JSON.stringify(postObj));
            const json = await response.json();
            if (!response.ok) {
                throw json;
            }
        };

        const getTicketLabels = async (ticketId: number): Promise<Label[]> => {
            const response = await getRequest(`/ticket-labels?ticket_id=${ticketId}`);
            const json = await response.json();
            if (response.ok) {
                return json.labels;
            } else {
                throw json;
            }
        };

        const getNotTicketLabels = async (ticketId: number, projectId: number): Promise<Label[]> => {
            const response = await getRequest(`/not-ticket-labels?ticket_id=${ticketId}&project_id=${projectId}`);
            const json = await response.json();
            if (response.ok) {
                return json.labels;
            } else {
                throw json;
            }
        };

        const removeLabelFromTicket = async (ticketId: number, labelId: number): Promise<number> => {
            const response = await deleteRequest(`/remove-label-from-ticket?ticket_id=${ticketId}&label_id=${labelId}`);
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        };

        const getTopicScore = async (topicId: number, userId: number): Promise<TopicRating | null> => {
            const response = await getRequest(`/topic-scores?topic_id=${topicId}&user_id=${userId}`);
            const json = await response.json();
            if (response.ok) {
                return json.topic_rating;
            } else {
                throw json;
            }
        };

        const changeTopicScore = async (topicId: number, userId: number, newScore: number): Promise<void> => {
            const response = await postRequest(`/topic-scores`, JSON.stringify({ topic_id: topicId, user_id: userId, score: newScore }));
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        };

        const addNotesToTopic = async (topicId: number, notesIds: number[]): Promise<void> => {
            const postObj = {
                topic_notes: notesIds.map((noteId) => { return { note_id: noteId, topic_id: topicId } })
            }
            const response = await postRequest(`/add-notes-to-topics`, JSON.stringify(postObj));
            const json = await response.json();
            if (!response.ok) {
                throw json;
            }
        };
        
        const getTopicNotes = async (topicId: number): Promise<Note[]> => {
            const response = await getRequest(`/topic-notes?topic_id=${topicId}`);
            const json = await response.json();
            if (response.ok) {
                return json.notes;
            } else {
                throw json;
            }
        };
        
        const getNotTopicNotes = async (topicId: number, retroId: number): Promise<Note[]> => {
            const response = await getRequest(`/not-topic-notes?topic_id=${topicId}&retro_id=${retroId}`);
            const json = await response.json();
            if (response.ok) {
                return json.notes;
            } else {
                throw json;
            }
        };
    
        const removeNoteFromTopic = async (topicId: number, noteId: number): Promise<number> => {
            const response = await deleteRequest(`/remove-note-from-topic?topic_id=${topicId}&note_id=${noteId}`);
            const json = await response.json();
            if (response.ok) {
                return json.id;
            } else {
                throw json;
            }
        };

    
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
            getAssignedToTopicTicket,
            createTicket,
            changeTicketStatus,
            deleteTicket,
            updateTicket,
            getLabels,
            getLabel,
            createLabel,
            deleteLabel,
            commentTicket,
            getTicketComments,
            commentTopic,
            getTopicComments,
            assignUsersToTicket,
            getAssignedUsers,
            getUnassignedUsers,
            unassignUserFromTicket,
            getRetros,
            getRetro,
            createRetro,
            deleteRetro,
            getNotes,
            getNote,
            createNote,
            deleteNote,
            getTopics,
            getTopic,
            createTopic,
            deleteTopic,
            getTicketLabels,
            getNotTicketLabels,
            addLabelsToTicket,
            removeLabelFromTicket,
            getTopicScore,
            changeTopicScore,
            addNotesToTopic,
            getNotTopicNotes,
            getTopicNotes,
            removeNoteFromTopic
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
    }, [projectId]);

    const getUser = useCallback(() => {
        if (userId) return userId;
        throw Error('User id is not present');
    }, [userId]);

    const projectContext: ProjectContextProps = {
        apiClient,
        userId,
        projectId,
        signIn,
        setProject,
        getProject,
        getUser
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