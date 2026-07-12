import { FaGithubSquare, FaLinkedin, FaYoutubeSquare } from "react-icons/fa";
import {Link} from "react-router";

function Footer() {
    return (
        <footer className={"w-full px-4 py-3 select-none flex items-center justify-between gap-2 border-b-2 border-mist-500 font-mono"}>
            <div className={'w-3/5 flex items-center justify-center'}>
                <small className={'text-xs'}>Copyright (c) 2026 Artur dos Santos Shon</small>
            </div>

            <div className={'w-1/5 flex items-center justify-end gap-1'}>
                <Link to={"https://github.com/SkyArtur"} target="_blank">
                    <FaGithubSquare className={'text-purple-800'} size={20} />
                </Link>
                <Link to={"https://www.linkedin.com/in/artur-shon-9896b6238/"} target="_blank">
                    <FaLinkedin className={'text-sky-800'} size={20} />
                </Link>
                <Link to={"https://www.youtube.com/@skyartur"} target="_blank">
                    <FaYoutubeSquare className={'text-red-700'} size={20} />
                </Link>
            </div>
        </footer>
    )
}

export default Footer;
