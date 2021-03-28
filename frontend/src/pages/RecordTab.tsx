import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonProgressBar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import './RecordTab.css';
import {useState} from 'react';
import 'react-voice-recorder/dist/index.css';

const Recorder = require('../components/Recorder').default;

const reset = {
  url: null,
  blob: null,
  chunks: null,
  duration: {
    h: 0,
    m: 0,
    s: 0
  }
};

type Instrument = "drums" | "violin" | "flute";

const RecordTab: React.FC = () => {
  const [audioDetails, setAudioDetails] = useState(reset);
  const [trackName, setTrackName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [instrument, setInstrument] = useState<Instrument | null>(null);

  const handleShowModal = (data: any) => {
    setShowModal(true);
    setAudioDetails(data);
    console.log(data);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    const fd = new FormData();

    fd.append("audio_data", audioDetails.blob!, `${trackName}.wav`);
    const res = await fetch("https://wiki.epfl.ch/test.php", {method: 'POST', body: fd});
    const reader = res.body!.getReader();
    const audio = await reader.read();

    const blob = new Blob([audio.value!], {type: "audio/*"});
    const url = window.URL.createObjectURL(blob);
    // @ts-ignore
    window.audio = new Audio();
    // @ts-ignore
    window.audio.src = url;
    // @ts-ignore
    window.audio.play();
  };

  const handleCancelUpload = () => {
    setIsUploading(false);
    setShowModal(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Record</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonModal isOpen={showModal} cssClass={`upload-modal ${isUploading ? 'is-uploading' : ''}`}>
          <IonToolbar>
            <IonTitle>{isUploading ? "Processing voice..." : "Enter track details"}</IonTitle>
          </IonToolbar>

          {!isUploading && <><IonItem>
            <IonLabel position="floating">Track name</IonLabel>
            <IonInput value={trackName} onIonChange={e => setTrackName(e.detail.value!)}/>
          </IonItem>
            <IonItem>
              <IonLabel>Instrument</IonLabel>
              <IonSelect value={instrument} placeholder="Select One"
                         onIonChange={e => setInstrument(e.detail.value)}>
                <IonSelectOption value="drums">Drums (beatbox)</IonSelectOption>
                <IonSelectOption value="violin">Violin</IonSelectOption>
                <IonSelectOption value="flute">Flute</IonSelectOption>
              </IonSelect>
            </IonItem></>}
          {isUploading ? <> <h2 className='modal-status'>Uploading...</h2>
            <IonProgressBar type="indeterminate"/>
            <IonButton onClick={handleCancelUpload}>Cancel</IonButton>
          </> : <IonButton onClick={handleUpload}>Process</IonButton>
          }
        </IonModal>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Record</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Recorder
          record={true}
          title={"New recording"}
          audioURL={audioDetails.url}
          showUIAudio
          handleAudioStop={(data: any) => setAudioDetails(data)}
          handleAudioUpload={handleShowModal}
          handleReset={() => setAudioDetails(reset)}
        />
      </IonContent>
    </IonPage>
  );
};

export default RecordTab;
