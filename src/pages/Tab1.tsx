import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonMenuButton
} from '@ionic/react';
import React from 'react';
import './Tab1.css';

import { CardExample } from '../components/CardComponent';

const Tab1: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot="start"></IonMenuButton>
                    <IonTitle>Tab One</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <CardExample />
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
