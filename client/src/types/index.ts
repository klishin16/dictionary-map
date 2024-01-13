import { Edge, Node } from "reactflow";

export interface IDictionaryNodeData {
    title: string;
    description: string;
}

export interface IDictionaryEdgeData {}

export interface IApiData {
    nodes: Node<IDictionaryNodeData>[];
    edges: Edge<IDictionaryEdgeData>[];
}
