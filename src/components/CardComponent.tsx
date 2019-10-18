import React from 'react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonList,
    IonBadge,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
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

            <IonCard>
                <IonItem>
                    <IonIcon icon={pin} slot="start" />
                    <IonLabel>ion-item in a card, icon left, button right</IonLabel>
                    <IonButton fill="outline" slot="end">View</IonButton>
                </IonItem>

                <IonCardContent>This is content, without any paragraph or header tags, within an ion-cardContent element.</IonCardContent>
            </IonCard>

            <IonCard>
                <IonItem href="#">
                    <IonIcon icon={wine} slot="start" />
                    <IonLabel>Card Link Item 2</IonLabel>
                </IonItem>

                <IonItem class="activated">
                    <IonIcon icon={warning} slot="start" />
                    <IonLabel>Card Button Item 1 .activated</IonLabel>
                </IonItem>

                <IonItem>
                    <IonIcon icon={walk} slot="start" />
                    <IonLabel>Card Button Item 2</IonLabel>
                </IonItem>
            </IonCard>
        </React.Fragment>
    );
}
