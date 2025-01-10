
const getService = async (baseURL: string) =>{
    try{
        const response = await fetch(baseURL, {
            method: 'GET'
        })
        if(response.status > 400){
            return [];
        }
        return await response.json();
    }
    catch(err){
        console.log('in catch', err);
    }
}

export {getService}