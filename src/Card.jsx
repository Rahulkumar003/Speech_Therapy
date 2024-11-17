
import Highlighter from "react-highlight-words";

function Card ({title, description, link, tags, searchTerm}) {

    const tagName = tags.map(tag => {
        return <li key={tag}>{tag}</li>
    })


        return (
    
            <>       
                <article className="card animate pop" id="resource">
                    <h3><a id="title" href={link} target="_blank">
                    <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[searchTerm]}
                        autoEscape={true}
                        textToHighlight={title}
                    />
                    </a></h3>
                    <p id="description">
                        <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={[searchTerm]}
                            autoEscape={true}
                            textToHighlight={description}
                        />
                    </p>
                    
                    <div id="tagsContainer">
                        <ul>
                            {tagName}
                        </ul>
                    </div>
    
                </article>
    
            </>
        )

    }


    

export default Card