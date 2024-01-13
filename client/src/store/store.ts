import {
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnNodesChange,
    OnEdgesChange,
    applyNodeChanges,
    applyEdgeChanges,
} from 'reactflow';
import { create } from 'zustand';
import { IApiData, IDictionaryEdgeData, IDictionaryNodeData } from "../types";
import axios from "axios";
import { BACKEND_URL } from "../constants";

export type IState = {
    isLoading: boolean
    setIsLoading: (value: boolean) => void;

    nodes: Node<IDictionaryNodeData>[];
    edges: Edge<IDictionaryEdgeData>[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;

    selectedNode: IDictionaryNodeData | null;
    setSelectedNode: (node: IDictionaryNodeData) => void;

    loadNodsAndEdges: () => Promise<void>
};

const useStore = create<IState>((set, get) => ({
    isLoading: true,
    setIsLoading: (value) => set({
        isLoading: value
    }),
    nodes: [],
    edges: [],
    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    selectedNode: null,
    setSelectedNode: (node: IDictionaryNodeData | null) => {
        set({
            selectedNode: node
        })
    },
    loadNodsAndEdges: async () => {
        set({
            isLoading: true
        })
        const data = await axios.get<IApiData>(BACKEND_URL).then(response => response.data);
        set({
            isLoading: false,
            nodes: data.nodes,
            edges: data.edges
        })
    }
}));

export default useStore;