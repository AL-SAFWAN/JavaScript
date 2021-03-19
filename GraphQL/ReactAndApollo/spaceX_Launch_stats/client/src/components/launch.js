import React from 'react'
import { useQuery, gql } from '@apollo/client';
import classNames from 'classnames'
import { Link } from 'react-router-dom';


const LAUNCH_QUERY = gql`
	query LaunchQuery($flight_number: Int!) {
		launch(flight_number: $flight_number) {
            flight_number
            mission_name
            launch_year
            launch_date_local
            launch_success
            rocket {
              rocker_id
              rocket_name
              rocker_type
            }
		}
	}
`;

function LaunchQuery({ flight_number }) {
    const { loading, error, data } = useQuery(LAUNCH_QUERY, {
        variables: { flight_number },
    });
    console.log(data, flight_number);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


    const { mission_name, launch_year, launch_date_local, launch_success, rocket } = data.launch
    console.log(launch_success)
    return <>
        <hr />
        <h1 className='display-4 my-3'> <span className='text-light'> Mission: {data.launch.mission_name}</span></h1>
        <h4 className='mb-3 text-light'>
            <ul className='list-group'>
                <li className='list-group-item'>
                    Flight Number: {flight_number}
                </li>
            </ul>            <ul className='list-group'>
                <li className='list-group-item'>
                    Launch Year: {launch_year}
                </li>
            </ul>
            <ul className='list-group'>
                <li className='list-group-item'>

                    Launch success: <span
                        className={classNames({
                            'text-success': launch_success,
                            'text-danger': !launch_success
                        })}
                    >{launch_success ? 'Yes' : 'No'}</span>
                </li>
            </ul>
            <hr />
            <h4 className='my-3 text-light'>Rocker Details</h4>
            <ul className="list-group">
                <li className='list-group-item'> Rocket ID: {rocket.rocker_id}</li>
                <li className='list-group-item'> Rocket Name: {rocket.rocker_name}</li>
                <li className='list-group-item'> Rocket Type: {rocket.rocker_type}</li>

            </ul>
        </h4>

        <hr />
        <Link to='/' className='btn btn-secondary'>Back</Link>

    </>
}


export default function launch(props) {

    let flight_number = parseInt(props.match.params.flight_number)
    return (
        <>
            <h1>launch </h1>
            <LaunchQuery flight_number={flight_number}></LaunchQuery>
        </>
    )
}
