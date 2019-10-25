import React from 'react';
import {
    IonBackButton,
    IonButtons,
    IonHeader,
    IonPage,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonLabel,
    IonBadge,
    IonButton
} from '@ionic/react';

const LeaveDetails: React.FC = ({ match }: any) => {

    const leaveDetail = [
        {
            id: 1, title: 'GL', type: 'gl', balance: [
                { title: 'Opening Balance', balance: 7 },
                { title: 'Applied', balance: 4 },
                { title: 'Approved', balance: 3 },
                { title: 'Pending Approval', balance: 1 },
                { title: 'Total Balance Till Date', balance: 0.5 }
            ]
        },
        {
            id: 2, title: 'PL', type: 'pl', balance: [
                { title: 'Opening Balance', balance: 7 },
                { title: 'Applied', balance: 4 },
                { title: 'Approved', balance: 3 },
                { title: 'Pending Approval', balance: 1 },
                { title: 'Total Balance Till Date', balance: 0.5 }
            ]
        },
        {
            id: 3, title: 'Floater', type: 'floater', balance: [
                { title: 'Opening Balance', balance: 7 },
                { title: 'Applied', balance: 4 },
                { title: 'Approved', balance: 3 },
                { title: 'Pending Approval', balance: 1 },
                { title: 'Total Balance Till Date', balance: 0.5 }
            ]
        },
        {
            id: 4, title: 'Comp Off', type: 'compOff', balance: [
                { title: 'Opening Balance', balance: 7 },
                { title: 'Applied', balance: 4 },
                { title: 'Approved', balance: 3 },
                { title: 'Pending Approval', balance: 1 },
                { title: 'Total Balance Till Date', balance: 0.5 }
            ]
        },
        {
            id: 5, title: 'Paternity/Maternity Leave', type: 'PML', balance: [
                { title: 'Opening Balance', balance: 'NA' },
                { title: 'Applied', balance: 0 },
                { title: 'Approved', balance: 0 },
                { title: 'Pending Approval', balance: 0 },
                { title: 'Total Balance Till Date', balance: 0 }
            ]
        },
        {
            id: 6, title: 'LWP', type: 'LWP', balance: [
                { title: 'Opening Balance', balance: 'NA' },
                { title: 'Applied', balance: 0 },
                { title: 'Approved', balance: 0 },
                { title: 'Pending Approval', balance: 0 },
                { title: 'Total Balance Till Date', balance: 0 }
            ]
        }
    ];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Leave Detail for {match.params.leaveType.toUpperCase()}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent class="ion-padding">

                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>Leave Details</IonCardSubtitle>
                        <IonCardTitle>{match.params.leaveType.toUpperCase()}</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        {leaveDetail.map((detail: any) => (
                            detail.type === match.params.leaveType ? (
                                <IonList key={detail.id}>
                                    {detail.balance.map((item: any, index: number) => (

                                        <IonItem key={index}>
                                            <IonLabel>{item.title}</IonLabel>
                                            <IonBadge slot="end">{item.balance}</IonBadge>
                                        </IonItem>

                                    ))}
                                </IonList>
                            ) : null
                        ))}
                    </IonCardContent>
                </IonCard>

                <IonButton color="primary" expand="block" routerLink={`/details/${match.params.leaveType}/apply`}>Apply for leave</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default LeaveDetails;
