import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="bg-indigo-500 text-indigo-50 p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <header className="flex justify-between">
                <ul className="list-none flex justify-start gap-4">
                    <li className="p-2">
                        <Link to={ '/' }>Dictionary</Link>
                    </li>
                    <li className="p-2">
                        <Link to={ '/graph' }>Graph</Link>
                    </li>
                </ul>
                <div className='flex items-center mr-2'>
                    <p className="text-base text-neutral-200">Клишин Никита, P4210</p>
                </div>
            </header>
        </div>
    )
};

export default Header;
