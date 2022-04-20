import { useEffect, useState } from "react"

import "./Home.css"
import * as IpServices from '../services/IpServices'

const Home = () => {
    const [res, setRes] = useState({})
    const [distance, setDistance] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [ipaddress, setIp] = useState('')

    useEffect((ipaddress) => {
        IpServices.getIp(ipaddress)
            .then(jsonResult => {
                setRes(jsonResult)
            })

    }, [])



    const takeIpAdress = (e) => {
        setIp(e.target.value);

    };



    const isValidIp = ipaddress => (/^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/.test(ipaddress) ? true : false);


    function calculate(e) {
        e.preventDefault()

        if (isValidIp(ipaddress)) {

            IpServices.getIp(ipaddress)
            getDistanceFromLatLonInKm()
            setTimeout(() => {
                setIsLoading(true)
            }, 2500);
        }
      
       return false
    }



    function getDistanceFromLatLonInKm() {
        const lat1 = 42.700514 //ceytano
        const lon1 = 23.306042  //ceytano
        const lat2 = res.latitude
        const lon2 = res.longitude
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);  // deg2rad below
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        setDistance(d)
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    console.log(ipaddress)

    return (
        <div>
            <form className="login-form" onSubmit={calculate} >

                <h2>Distance Calculator</h2>
                <input onBlur={takeIpAdress}></input>
                <button type="submit" value="calculate" className='button' >
                    calculate
                </button>
            </form>

            {isLoading ? (
                <div className="info">
                    <hr></hr>
                    <p className="country"> Country: <span className="fixer"></span> {res.country_name}</p>
                    <hr></hr>
                    <p className="time"> Time Zone <span className="fixer"> </span> {res.time_zone}</p>
                    <hr></hr>
                    <p className="office"> Distance to Cayetanos office:<span className="fix"></span> {distance.toFixed(2)} </p>
                </div>
            ) :
                <p>Use calculate button please!</p>
            }

        </div>
    )
}

export default Home