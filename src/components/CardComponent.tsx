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
        { id: 1, type: 'GL', balance: 8 },
        { id: 2, type: 'PL', balance: 15 },
        { id: 3, type: 'Floater', balance: 2 },
        { id: 4, type: 'Comp Off', balance: 5 },
    ];

    return (
        <React.Fragment>
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>Manoj Tiwari</IonCardSubtitle>
                    <IonCardTitle>Leave Management</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                    <IonList>
                        {leaves.map(leave => (
                            <IonItem key={leave.id}>
                                <IonLabel>{leave.type}</IonLabel>
                                <IonBadge slot="end">{leave.balance}</IonBadge>
                            </IonItem>
                        ))}
                    </IonList>
                </IonCardContent>
            </IonCard>
        </React.Fragment>
    );
}
