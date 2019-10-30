import { IUrlOptions } from '../models/rest-api.model';

const API_URL = 'http://localhost:3002/api';

export class RemoteService {

    public request(requestType: string, urlOptions: IUrlOptions, body?: any) {
        // Get JsonWebToken
        let token = sessionStorage.getItem('userToken');

        // Update request header
        var _headers = new Headers();
        _headers.append('Content-Type', 'application/json');
        _headers.append('Accept', 'application/json');
        _headers.append('token', `${token}`);
        // _headers.append('Authorization', `Bearer ${token}`);

        return fetch(`${API_URL}/${urlOptions.endPoint}`, {
            method: requestType || 'GET',
            body: body ? JSON.stringify(body) : null,
            // credentials: 'include',
            // credentials: 'same-origin',
            mode: 'cors',
            redirect: 'follow',
            headers: _headers
        })
            .then((response) => {
                // If error then exit
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    sessionStorage.removeItem('userToken')
                    return;
                }

                // Examine the text in the response
                console.log('Response : ', response);
                return response.json();
            }).catch((error) => {
                // This is where you run code if the server returns any errors
                console.log('Looks like there was a problem in service. ' + error);
            });;
    }

}
