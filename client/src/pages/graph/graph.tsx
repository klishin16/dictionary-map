import { Controls, NodeOrigin, ReactFlow } from "reactflow";

import "reactflow/dist/style.css";
import useStore, { IState } from "../../store/store.ts";
import { shallow } from "zustand/shallow";
import { useMemo } from "react";
import DictionaryNode from "../../components/node/node.tsx";

const selector = (state: IState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    selectedNote: state.selectedNode
});

const nodeOrigin: NodeOrigin = [0.5, 0.5];

const GraphPage = () => {
    const { nodes, edges, onNodesChange, onEdgesChange, selectedNote } = useStore(
        selector,
        shallow,
    );

    const nodeTypes = useMemo(() => ({ dictionaryNode: DictionaryNode }), []);

    return (
        <div className="flex flex-row" style={{ height: "calc(100% - 56px)" }}>
            <ReactFlow
                className="basis-3/4"
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeOrigin={nodeOrigin}
                fitView
            >
                <Controls showInteractive={false} contentEditable={false} />
            </ReactFlow>

            <div className="basis-1/4 pt-4 pb-4">
                <div className="block rounded-l-lg bg-indigo-500 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] h-full">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        { selectedNote?.title ?? 'Выберите термин...' }
                    </h5>
                    { selectedNote?.description &&
                        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{ selectedNote?.description }</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default GraphPage;
