import { IDictionaryNodeData } from "../../types";
import { Handle, Position } from "reactflow";
import useStore, { IState } from "../../store/store.ts";
import { shallow } from "zustand/shallow";

const selector = (state: IState) => ({
    setSelectedNode: state.setSelectedNode
});

interface IDictionaryNodeProps {
    data: IDictionaryNodeData;
}

const DictionaryNode = ({ data }: IDictionaryNodeProps) => {
    const { setSelectedNode } = useStore(
        selector,
        shallow,
    );

    const handleNodeClick = () => {
        setSelectedNode(data);
    }

    return (
        <div className="rounded-md p-2 bg-indigo-500 hover:bg-indigo-600" onClick={handleNodeClick}>
            <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
            <p className="text-xs text-neutral-200">{data.title}</p>
            <Handle type="source" position={Position.Bottom} style={{ visibility: 'hidden' }} />
        </div>
    );
}

export default DictionaryNode;
