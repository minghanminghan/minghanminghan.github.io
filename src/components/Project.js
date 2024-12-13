import "../css/Project.css";

export default function Project({ info }) {
    /* props outline: name, desc, stack, libs, source */
    console.log(info);
    
    function handleClick() {
        window.open(info.source, '_blank').focus();
    }

    return (
        <div className="project" onClick={() => {handleClick()}}>
            <p id="name">{info.name}</p>
            <div className="flexCol">
                <p className="largeText" id="desc">{info.desc}</p>
                <div>
                    <p className="largeText bold">Stack</p>
                    <p className="largeText" id="stack">{info.stack}</p>
                </div>
                <div>
                    <p className="largeText bold">Libraries</p>
                    <p className="largeText" id="libs">{info.libs}</p>
                </div>
            </div>
        </div>
    );
}