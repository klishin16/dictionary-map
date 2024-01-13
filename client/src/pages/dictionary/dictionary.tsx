import Card from "../../components/card/card.tsx";
import useStore from "../../store/store.ts";

const DictionaryPage = () => {
    const nodes = useStore((state) => state.nodes);

    return (
        <div className="flex flex-wrap justify-between pt-4 pl-4 pr-4 gap-4" style={{ height: "calc(100% - 56px)" }}>
            { nodes.map(node => <Card key={node.id} data={node.data} />) }
        </div>
    );
};

export default DictionaryPage;
