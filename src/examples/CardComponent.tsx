import React from 'react';
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonList,
    IonBadge,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel
} from '@ionic/react';

export const CardExample: React.FC = () => {

    const leaves = [
        { id: 1, title: 'GL', type: 'gl', balance: 8 },
        { id: 2, title: 'PL', type: 'pl', balance: 15 },
        { id: 3, title: 'Floater', type: 'floater', balance: 2 },
        { id: 4, title: 'Comp Off', type: 'compOff', balance: 5 },
    ];

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>Manoj Tiwari</IonCardSubtitle>
                <IonCardTitle>Leave Management</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonList>
                    {leaves.map(leave => (
                        <IonItem key={leave.id} routerLink={`/details/${leave.type}`} >
                            <IonLabel>{leave.title}</IonLabel>
                            <IonBadge slot="end">{leave.balance}</IonBadge>
                        </IonItem>
                    ))}
                </IonList>
            </IonCardContent>
        </IonCard>
    );
}
