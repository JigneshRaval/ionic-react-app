import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonMenuButton
} from '@ionic/react';
import React from 'react';
import './Home.css';

import { LeavesSummary } from '../components/Leaves';

const HomePage: React.FC = () => {
    return (
        <IonPage>

            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot="start"></IonMenuButton>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent class="ion-padding">
                <LeavesSummary />
            </IonContent>

        </IonPage>
    );
};

export default HomePage;
