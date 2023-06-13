import logo from './logo.svg';
import './App.css';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete,DirectionsRenderer} from '@react-google-maps/api';
import Button from 'react-bootstrap/Button';
import { useRef, useState } from 'react';

const center = { lat: 23.16914528880484, lng: 77.41922136083194 }

function App() {
  const [map, setMap] = useState(/**@type google.maps.map */(null))
  const[directionsResponse,setDirectionResponse]=useState(null)
  const[distance,setDistance]=useState('')

  const originRef=useRef()
  const destinationRef=useRef()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:"",
    libraries: ['places']
  })
  if (!isLoaded) {
    return <h1>Loading....</h1>

  }
  async function calculateRoute(){
    if(originRef.current.value==='' || destinationRef.current.value===''){
      return
    }
    //es
    // eslint-disable-next-line no-undef
    const directionService=new google.maps.DirectionsService()
    const results=await directionService.route({
      origin:originRef.current.value,
      destination:destinationRef.current.value,
      
      // eslint-disable-next-line no-undef
      travelMode:google.maps.TravelMode.DRIVING
    })
    setDirectionResponse(results)
    setDistance(results.routes[0].legs[0].distance.text);
  }
  function clearRoute(){
   window.location.reload();
    
   
  }

  return (
    <div className="App" style={{ display: "flex", flexWrap:'wrap', gap: '20px', justifyContent: "center", alignItems: 'center', height: "100vh" }}>
      <div style={{ display: "flex",flexWrap:"wrap", gap: '20px', marginTop:'10px' }}>
        <div>
          <label>Origin</label>
          <Autocomplete>
            <input type='text' ref={originRef} />
          </Autocomplete>

        </div>
        <div>
          <label>Destination</label>
          <Autocomplete>
            <input type='text' ref={destinationRef} />
          </Autocomplete>


        </div>
        <div>
          <Button variant="success" onClick={()=>calculateRoute()} >GO</Button>
        </div>
        <div>
          <Button variant="primary" onClick={() => clearRoute()}>Reset</Button>
        </div>        
      </div>
      <h3>Distance:{distance}</h3>
      
      {/* ////////MAP//////// */}
      <div style={{ height: '100vh', width: "100vw", backgroundColor: 'green' }} >
        <GoogleMap center={center} zoom={5} mapContainerStyle={{ width: "100vw", height: "100vh" }}
          options={{
            fullscreenControl: true
          }}
          onLoad={(map) => setMap(map)}
        >
         
          {
            directionsResponse && <DirectionsRenderer directions={directionsResponse}/>
          }
        </GoogleMap>
      </div>
    </div>
  );
}

export default App;
