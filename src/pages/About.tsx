import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon
} from '@ionic/react';

import {
  colorPalette,
  codeSlash,
  walk,
  musicalNotes,
  happy,
  heart,
} from 'ionicons/icons';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>About Me</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ backgroundColor: '#d0f0c0' }}>
        <IonCard>
          {/* Banner Image Placeholder */}
          <img
            alt="Profile Banner"
            src=""
            style={{ width: "100%", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
          />

          {/* Profile Picture */}
          <IonCardHeader style={{ textAlign: "center" }}>
            <img
              src="https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid white",
                marginTop: "-50px",
                backgroundColor: "#ffffff"
              }}
            />
          </IonCardHeader>

          <IonCardHeader>
            <IonCardTitle style={{ fontSize: "22px", fontWeight: "bold" }}>Hershey Dancil</IonCardTitle>
            <IonCardSubtitle>✨ shey shey ✨</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent style={{ fontStyle: 'italic', textAlign: 'center' }}>
            "Simplicity"
          </IonCardContent>

          {/* Skills */}
          <IonCardContent>
            <h3 style={{ color: "brown" }}>🛠️ Skills</h3>
            <ul style={{ textAlign: "left", paddingLeft: "20px", color: "black" }}>
              <li><IonIcon icon={colorPalette} /> &nbsp; Graphic Designer</li>
              <li><IonIcon icon={codeSlash} /> &nbsp; Programmer</li>
            </ul>
          </IonCardContent>

          {/* Talents */}
          <IonCardContent>
            <h3 style={{ color: "brown" }}>🎯 Talents</h3>
            <ul style={{ textAlign: "left", paddingLeft: "20px", color: "black" }}>
              <li><IonIcon icon={walk} /> &nbsp; Dancing</li>
              <li><IonIcon icon={musicalNotes} /> &nbsp; Singing</li>
              <li><IonIcon icon={happy} /> &nbsp; Drama Acting</li>
            </ul>
          </IonCardContent>

          {/* Status */}
          <IonCardContent>
            <h3 style={{ color: "brown" }}>❤️ Status</h3>
            <ul style={{ textAlign: "left", paddingLeft: "20px", color: "black" }}>
              <li><IonIcon icon={heart} /> &nbsp; Married</li>
            </ul>
          </IonCardContent>

        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default About;
