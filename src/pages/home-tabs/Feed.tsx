import {
  IonAvatar,
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
} from "@ionic/react";
import React from "react";

const profileImage = "https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.30808-6/481205642_2134192830332704_8925247913407342416_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeG87NYG9qRX7fFIbdeCJfCVuRPNF4e350S5E80Xh7fnRMFIbdt3uwNlBrQpbjbgCLttq1ncxjGznR3vwqZPGtkj&_nc_ohc=wAj_nVI98mUQ7kNvgEJetBX&_nc_oc=Adg8_PKPcbHPN8LefeuqWyRup7bhN8JQUnjdcG_CMXAkANm9yY4MxlzTLw-VhZkWjUw&_nc_zt=23&_nc_ht=scontent.fcgy1-1.fna&_nc_gid=Asfj7QEi3tsfaFCb1DECpol&oh=00_AYG93qOyDZxrgTle1rAhb5rmerfz5Bv5EOGm-1Wdf6GUZg&oe=67D709DB";

const images = [
  { url: "https://scontent.fcgy1-3.fna.fbcdn.net/v/t1.6435-9/132020386_1123726574712673_6093305653070201323_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeFCBBsW8zD-yum45EwOAm_1nGHBXnSnwh6cYcFedKfCHjrXgTaeYYKq9zswBO8GjrUPDsDURV89r7Fbmd4QR6Uc&_nc_ohc=CjPZLLXtrecQ7kNvgHErYnz&_nc_oc=AdhMx9GacsJYayANWj-he-sykGEl5W6JFJSwt1_uFE42vrLVA-jVelufEqYk5V6mCdc&_nc_zt=23&_nc_ht=scontent.fcgy1-3.fna&_nc_gid=A-fy46Ea5Jy4PvZxlMV6WZg&oh=00_AYGpCmIhHK-6srt4Kn7bTJLePVVPDyECkZbklpObYAFdhQ&oe=67F8A990", description: "ENCABO FAM" },
  { url: "https://img.freepik.com/free-vector/cute-alien-selfie-with-phone-cartoon-vector-icon-illustration-science-technology-icon-isolated-flat_138676-5862.jpg", description: "Aliens" },
  { url: "https://scontent.fcgy1-3.fna.fbcdn.net/v/t1.15752-9/462585884_1133214958318327_1030651799439338505_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFO9OfH1EYwg2qSGsBv6NBlrncEaVQ1I0-udwRpVDUjT8whSg-053LQ5-lDVNhZtPIPpScoYHskpjIxTZcE25kd&_nc_ohc=xJV52AIGxoEQ7kNvgH9M_Fx&_nc_oc=AdjibiD9lsrrrBoXcnGafEZ1Jz2EArZrF-g2JnVUzCNLhd3AeJKNGV-sRmJjbbA3_SE&_nc_zt=23&_nc_ht=scontent.fcgy1-3.fna&oh=03_Q7cD1wGqXj4xN7lSDz-lJEDbl6vYM4I9rLLyHS_IAk2Xiwbudg&oe=67F8ABC9", description: "Mimings" },
  { url: "https://scontent.fcgy1-2.fna.fbcdn.net/v/t1.15752-9/483046700_1169538867877074_3687320512282689892_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEpP-oJdTe4yDs1tXwNFBy-djHofgi8DGN2Meh-CLwMYwIa0zJAODopPnHEdd9qQ3dKtFmSe-9cXXEru0ZLC8nr&_nc_ohc=Kv8_2kLl8GYQ7kNvgHI8spa&_nc_oc=AdhTUKaPESp5Z-rew2xXQXS4LowxOuv9Hp9c48TuMY0lHsvs2z3G_huH_MAt3x8aDkU&_nc_zt=23&_nc_ht=scontent.fcgy1-2.fna&oh=03_Q7cD1wHgzqfzMB_3IvJ0ud4z5gpITgGzIgb9CET8lMYK8ExBng&oe=67F8BED6", description: "My dogs" },
  { url: "https://scontent.fcgy1-1.fna.fbcdn.net/v/t1.15752-9/482755916_1791962494987372_4186384476076447095_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHv2a2UDPCvTUXbVXKehla9ilfDdtNivLmKV8N202K8uWDiJGpU6jN27XyPrrjxszZS0Q_3Y4VWzE_gu7WZBpb5&_nc_ohc=cJTrU4fXvIwQ7kNvgFARNc3&_nc_oc=AdiSVP2SlLroDADVikgnv3nCAbHlyAHa3KbzF9PrKw-OqkjJrlXDOWP2eyEkpgDtVnY&_nc_zt=23&_nc_ht=scontent.fcgy1-1.fna&oh=03_Q7cD1wHaysRykOafpsg3p6_1ZznbM5bg-j_oAZkNE_IrfLySDw&oe=67F8B85E", description: "Friends" },

];

const Feed: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          <IonCard color="primary">
            <IonCardHeader>
              <IonAvatar>
                <img
                  alt="Profile"
                  src={profileImage}
                />
              </IonAvatar>
              <IonCardTitle>Hershey E. Dancil</IonCardTitle>
            </IonCardHeader>
          </IonCard>

          {images.map((image, index) => (
            <IonCard key={index}>
              <IonCardHeader>
                <IonCardSubtitle>{image.description}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <img
                  src={image.url}
                  alt={image.description}
                  width="100%"
                  height="auto"
                />
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Feed;