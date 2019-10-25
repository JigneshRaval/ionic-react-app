import React from 'react';
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
} from '@ionic/react';

export const LeavesSummary = ({ users }: any) => {

    const leaves = [
        { id: 1, title: 'GL', type: 'gl', balance: 8, fullName: 'General Leave' },
        { id: 2, title: 'PL', type: 'pl', balance: 15, fullName: 'Personal Leave' },
        { id: 3, title: 'Floater', type: 'floater', balance: 2, fullName: 'Floater' },
        { id: 4, title: 'Comp Off', type: 'compOff', balance: 5, fullName: 'Complementary Off' },
        { id: 5, title: 'Paternity/Maternity Leave', type: 'PML', balance: 0, fullName: 'Paternity/Maternity Leave' },
        { id: 6, title: 'LWP', type: 'LWP', balance: 0, fullName: 'Leave Without Pay' },
    ];

    return (
        <React.Fragment>
            <IonCardHeader>
                <IonCardSubtitle>Manoj Tiwari</IonCardSubtitle>
                <IonCardTitle>Leave Management</IonCardTitle>
            </IonCardHeader>

            {leaves.map(leave => (
                <IonCard key={leave.id} routerLink={`/details/${leave.type}`}>
                    <IonCardHeader>
                        <IonCardSubtitle>{leave.fullName}</IonCardSubtitle>
                        <IonCardTitle>{leave.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {leave.balance}
                    </IonCardContent>
                </IonCard>
            ))}
        </React.Fragment>
    );
}
