import React from 'react'
import { useQuery, gql } from '@apollo/client';
import LaunchItem from './LaunchItem'
import MissionKey from './MissionKey'
import classnames from 'classnames'

function Launches() {


    const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches{
        flight_number,
        mission_name,
        launch_date_local,
        launch_success
    }
  }
`;

    function LaunchesQuery() {
        const { loading, error, data } = useQuery(LAUNCHES_QUERY);

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        
          return <>
               {data.launches.map(launch =>{
                   
                   return <LaunchItem key={launch.flight_number} launch={launch}/>
               }) }  
          </>
    }
    return (
        <div className='container'>
            <h1 className='display-4 my-3'>Launches </h1>
            <MissionKey/>
            <LaunchesQuery/>
        </div>
    )
}

export default Launches
