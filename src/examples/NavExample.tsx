// https://ionicframework.com/docs/api/nav

import React, { useRef, useEffect } from 'react';
import {
    IonNav,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonButton,
    IonIcon,
    IonLabel,
} from '@ionic/react';

const techs = [
    {
        'title': 'Angular',
        'icon': 'angular',
        'description': 'A powerful Javascript framework for building single page apps. Angular is open source, and maintained by Google.',
        'color': '#E63135'
    },
    {
        'title': 'CSS3',
        'icon': 'css3',
        'description': 'The latest version of cascading stylesheets - the styling language of the web!',
        'color': '#0CA9EA'
    },
    {
        'title': 'HTML5',
        'icon': 'html5',
        'description': 'The latest version of the web\'s markup language.',
        'color': '#F46529'
    },
    {
        'title': 'JavaScript',
        'icon': 'javascript',
        'description': 'One of the most popular programming languages on the Web!',
        'color': '#FFD439'
    },
    {
        'title': 'Sass',
        'icon': 'sass',
        'description': 'Syntactically Awesome Stylesheets - a mature, stable, and powerful professional grade CSS extension.',
        'color': '#CE6296'
    },
    {
        'title': 'NodeJS',
        'icon': 'nodejs',
        'description': 'An open-source, cross-platform runtime environment for developing server-side Web applications.',
        'color': '#78BD43'
    },
    {
        'title': 'Python',
        'icon': 'python',
        'description': 'A clear and powerful object-oriented programming language!',
        'color': '#3575AC'
    },
    {
        'title': 'Markdown',
        'icon': 'markdown',
        'description': 'A super simple way to add formatting like headers, bold, bulleted lists, and so on to plain text.',
        'color': '#412159'
    },
    {
        'title': 'Tux',
        'icon': 'tux',
        'description': 'The official mascot of the Linux kernel!',
        'color': '#000'
    },
];

class NavHome extends React.Component<any, any> {

    /*  const showDetail = (title: any): void => {
         // Need help to push item on click of list
         console.log('Show Details : ', title);
         const tech = techs.find(tech => tech.title === title);
         if (elemRef && elemRef.current) {
             elemRef.current.push(NavDetail, { tech });
         }
     }; */
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <IonHeader translucent>
                    <IonToolbar>
                        <IonTitle>Test 111</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen class="ion-padding">
                    <IonList>
                        {techs.map(tech =>
                            <IonItem button key={Math.random()} onClick={() => this.props.onClick(tech.title)}>
                                {/* <IonIcon slot="start" icon={{ 'logo-'{ tech.icon } }}></IonIcon> */}
                                <IonLabel>{tech.title}</IonLabel>
                            </IonItem>
                        )};
                </IonList>
                </IonContent>
            </React.Fragment>
        )
    }

};

export const NavDetail = (props: any) => (
    <React.Fragment>
        <IonHeader translucent>
            <IonToolbar>
                <IonButton slot="start">Back</IonButton>
                <IonTitle>{props.title}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen class="ion-padding">
            <p>{props.description}</p>
        </IonContent>
    </React.Fragment>
);

export const NavExample = () => {
    const elemRef = useRef<any>(null);


    const handleClick = (title: string) => {
        // Need help to push item on click of list
        console.log('Show Details : ', title, elemRef, elemRef.current);
        const tech = techs.find(tech => tech.title === title);
        if (elemRef && elemRef.current) {
            /* elemRef.current.getActive()
                .then((res: any) => console.log(res))
            elemRef.current.push(NavDetail, { tech })
                .then((res: any) => console.log('Res : ', res)) */
        }
    }

    useEffect(() => {
        // elemRef.current.setRoot(NavHome);
    }, []);

    return (
        <React.Fragment>
            <IonNav ref={elemRef} root={() => <NavHome onClick={handleClick} />}></IonNav>
        </React.Fragment>
    )
}
