import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { apps, flash, send } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Details from './pages/Details';

import './vendor';

// import { NavExample } from './components/NavExample';
import { MainMenu } from './components/MainMenu';
import  LeaveDetails  from './components/LeaveDetails';

const App: React.FC = (props) => {

    return (
        <IonApp>
            <IonReactRouter>

                <MainMenu />

                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/tab1" component={Tab1} exact={true} />
                        <Route path="/tab2" component={Tab2} exact={true} />
                        {/* <Route path="/tab2/details" component={Details} /> */}
                        <Route path="/details/:leaveType" component={LeaveDetails} />
                        <Route path="/tab3" component={Tab3} />
                        <Route exact path="/" render={() => <Redirect to="/tab1" />} />
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom">
                        <IonTabButton tab="tab1" href="/tab1">
                            <IonIcon icon={flash} />
                            <IonLabel>Tab One</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/tab2">
                            <IonIcon icon={apps} />
                            <IonLabel>Tab Two</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/tab3">
                            <IonIcon icon={send} />
                            <IonLabel>Tab Three</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>

            </IonReactRouter>
        </IonApp>
    )
};

export default App;
