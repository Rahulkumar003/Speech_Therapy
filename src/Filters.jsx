import { useState } from 'react';
import Card from './Card';
import TextField from '@mui/material/TextField';


function Filters({data, loading}) {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    

    //FILTER OPTIONS
    const therapyFilters = ['fluency', 'pragmatics', 'language', 'articulation', 'voice', 'aphasia'];
    const activityFilters = ['games', 'expository text', 'videos', 'stories', 'science'];

    
   //Updates selectedFilters state based on user input
    const handleFilterSelection = (e) => {   
        const filterName = e.target.name;
        //If the filter chip is selected, place the name in state array, otherwise keep only the values that do NOT equal that filter name
        if (e.target.checked) {
          setSelectedFilters((prevState) => [...prevState, filterName,]);
          
        } else {
          setSelectedFilters((prevState) => prevState.filter((selection) => selection !== filterName))
         
        }
       
    }

    //Manually updates the filter chip selection with keyboard interaction using a custom event object
    const handleCheckboxKeyDown = (e, selector) => {
      if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault(); 
          handleFilterSelection ({
          target: {
              name: selector,
              checked: !selectedFilters.includes(selector)
          }
      });
    }
  };
  

    //Reset buttons: Keeps only the selections that are not included in the specified array (group of tags)
    const resetTherapyFilters = () => {
      setSelectedFilters((prevState) => prevState.filter((selection) => !therapyFilters.includes(selection)))
    }

    const resetActivityFilters = () => {
      setSelectedFilters((prevState) => prevState.filter((selection) => !activityFilters.includes(selection)))
    }
      
    const clearSearch = () => {
      setSearchTerm('');
    }

    // Filters the data array based on selected filters and search terms
    const filteredData = data.filter(({ title, description, tags }) => {
      //Checks to see if state is empty (if so, shows all cards) or if a card's tag name is included in state, if so returns true.
      const matchesFilters = selectedFilters.length === 0 || tags.some((tag) => selectedFilters.includes(tag)); 
      //Checks whether title or description matches search term input
      const matchesSearch =
          searchTerm === '' ||
          title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          description.toLowerCase().includes(searchTerm.toLowerCase());
      //Only keeps the cards in the array that statisfies these two conditions
      return matchesFilters && matchesSearch;
    });

    //COUNTER  
    let counter = filteredData.length

    //ADD STYLES TO SELECTED FILTER CHIP
    const updateCheckedStyles = (selection) => {
      return selectedFilters.includes(selection) ? 'checked-styles checkbox' : 'unchecked-styles checkbox' ; 
    };


    return (
        <>
            <section className="resources">
            <h4 >Type keyword or search by tags:</h4>
              <div className="search">
                  <TextField id="outlined-basic" label="Search" variant="outlined" fullWidth
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    size="small"
                    color="secondary"

                  />
                  <button onClick={clearSearch}>reset</button>
                </div>

                    <div className="filters">

                        <div className="filter-div">
                        <h5>Therapy type:</h5>
                        {therapyFilters.map((selector) => (
                            <label 
                              key={selector} 
                              className={updateCheckedStyles(selector)}
                              tabIndex="0" 
                              onKeyDown={(e) => handleCheckboxKeyDown(e, selector)}
                            >
                                
                                <input 
                                  name={selector} 
                                  checked={selectedFilters.includes(selector)} 
                                  type="checkbox" 
                                  onChange={handleFilterSelection}/>

                                  <span>{selector}</span>

                            </label> 

                        ))}
                        <button onClick={resetTherapyFilters}>reset</button>
                        </div>

                        <div className="filter-div">
                        <h5>Activity type:</h5>
                        {activityFilters.map((selector) => (
                          <label 
                              key={selector} 
                              className={updateCheckedStyles(selector)}
                              tabIndex="0" 
                              onKeyDown={(e) => handleCheckboxKeyDown(e, selector)}
                            >
                                
                                <input 
                                  name={selector} 
                                  checked={selectedFilters.includes(selector)} 
                                  type="checkbox" 
                                  onChange={handleFilterSelection}/>
                                  <span>{selector}</span>
                            </label> 
                            
                        ))}
                        <button onClick={resetActivityFilters}>reset</button>
                        </div>
                        
                    </div>
                  
                

                <h5>Results: {counter}</h5>

            </section>
              
            <section id="cards-section">
            
            {
              (loading) ? <p>Loading...</p> : 
              filteredData.length === 0 ? (
              <p>No results found. Try a new keyword or clearing more filters.</p>
              ) : (
              filteredData.map( ({title, id, description, link, tags}) => (
                  <Card 
                    title={title} 
                    key={id} 
                    description={description} 
                    link={link}
                    tags={tags}
                    searchTerm={searchTerm}
                  />
              ))
            
            )}

            </section>

        </>
    )
}

export default Filters




