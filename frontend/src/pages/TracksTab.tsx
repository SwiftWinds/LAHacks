import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './TracksTab.css';

const TracksTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tracks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tracks</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tracks page" />
      </IonContent>
    </IonPage>
  );
};

export default TracksTab;
