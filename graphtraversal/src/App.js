import './App.css';
import React, {Fragment, useEffect, useState} from 'react';
import cytoscape from 'cytoscape';

function App() {

  const [jsonData, setJsonData] = useState({});

  const drawgraph = () => {
    const cy = cytoscape({
      container: document.getElementById('cy'),
      elements: jsonData,

      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(id)'
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            // 'target-arrow-color': '#ccc',
            // 'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            //'arrow-scale': 0

          }
        }
      ],

      layout: {
        name: "preset"
      }
    });
  }

  useEffect(() => {

    fetch("./data.json", {"headers": {
      "Accept": "application/json",
      'Content-Type': 'application/json'
    }})
      .then(res => res.text())
      .then(data => {
        console.log(data);
        setJsonData(data);
      })
      .catch(error => console.log(error))
    
    drawgraph()
  }, [])

  return (
    <Fragment>
      <div id='cy' style={{width: '100%', height: '80vh'}}>

      </div>
    </Fragment>
  );
}

export default App;
