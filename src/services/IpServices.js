const curl = 'https://api.freegeoip.app/json/?apikey=465a3dc0-bd7d-11ec-bebe-5993c37e7249'

//

export const getIp = async () => {
    let response = await fetch(`${curl}`)
    let jsonResult = await response.json();
        
    try {
        return jsonResult
    }
     catch (error) {
     console.log(error)
    }

}