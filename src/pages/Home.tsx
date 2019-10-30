import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonMenuButton
} from '@ionic/react';
import React, { useEffect } from 'react';
import './Home.css';

import { LeavesSummary } from '../components/Leaves';
import { IUrlOptions } from '../models/rest-api.model';
import { RemoteService } from '../services/remote.service';


const HomePage = ({ users, history }: any) => {
    const remoteService = new RemoteService();

    const getRecordById = (recordId: string) => {
        const options: IUrlOptions = {
            endPoint: ``,
            restOfUrl: '',
            isSecure: true,
            contentType: 'application/json'
        };

        remoteService.request('GET', options).then((data) => {
            console.log('Home data : ', data);
        })
    }

    useEffect(() => {
        let isLoggedIn = sessionStorage.getItem('userToken');
        if (!isLoggedIn) {
            history.push('/login');
        }
        getRecordById('2');
    }, []);

    return (
        <IonPage>

            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot="start"></IonMenuButton>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent class="ion-padding">
                <LeavesSummary users={users} />
            </IonContent>

        </IonPage>
    );
};

export default HomePage;
