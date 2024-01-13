import { IDictionaryNodeData } from "../../types";


interface ICardProps {
    data: IDictionaryNodeData
}

const Card = ({ data }: ICardProps) => {
    return (
        <div className="rounded-md p-6 shadow-lg w-80 bg-indigo-500 hover:bg-indigo-600">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                { data.title }
            </h5>
            <p className="mb-4 text-base text-neutral-200">
                { data.description }
            </p>
        </div>
    );
};

export default Card;
