import React, { useState } from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonInputPasswordToggle,
    IonPage,
    IonTitle,
    IonToolbar,
    IonModal,
    IonText,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonLabel,
    IonAlert
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleOpenVerificationModal = () => {
        if (!email.endsWith("@nbsc.edu.ph")) {
            setErrorMessage("Only @nbsc.edu.ph emails are allowed to register.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        setShowVerificationModal(true);
        setErrorMessage(''); // Clear error messages
    };

    const doRegister = async () => {
        setShowVerificationModal(false);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setErrorMessage("Account creation failed: " + error.message);
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { error: insertError } = await supabase.from('users').insert([{
            username,
            user_email: email,
            user_password: hashedPassword,
        }]);

        if (insertError) {
            setErrorMessage("Failed to save user data: " + insertError.message);
            return;
        }

        setShowSuccessModal(true);
    };

    return (
        <IonPage>
            <IonContent className="ion-padding" style={{ backgroundColor: "#f4f7fb" }}>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>Create your account</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <IonCard style={{ width: '90%', maxWidth: '500px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                        <IonCardContent>
                            <IonInput
                                label="Username"
                                labelPlacement="stacked"
                                fill="outline"
                                type="text"
                                placeholder="Enter a unique username"
                                value={username}
                                onIonChange={e => setUsername(e.detail.value!)}
                                style={{ marginBottom: '15px' }}
                            />

                            <IonInput
                                label="Email"
                                labelPlacement="stacked"
                                fill="outline"
                                type="email"
                                placeholder="youremail@nbsc.edu.ph"
                                value={email}
                                onIonChange={e => setEmail(e.detail.value!)}
                                style={{ marginBottom: '15px' }}
                            />

                            <IonInput
                                label="Password"
                                labelPlacement="stacked"
                                fill="outline"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onIonChange={e => setPassword(e.detail.value!)}
                                style={{ marginBottom: '15px' }}
                            >
                                <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                            </IonInput>

                            <IonInput
                                label="Confirm Password"
                                labelPlacement="stacked"
                                fill="outline"
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onIonChange={e => setConfirmPassword(e.detail.value!)}
                                style={{ marginBottom: '20px' }}
                            >
                                <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                            </IonInput>

                            {errorMessage && (
                                <IonText color="danger">
                                    <p>{errorMessage}</p>
                                </IonText>
                            )}

                            <IonButton
                                onClick={handleOpenVerificationModal}
                                expand="full"
                                shape="round"
                                color="primary"
                                style={{ marginTop: '15px' }}
                            >
                                Register
                            </IonButton>
                        </IonCardContent>
                    </IonCard>
                </div>

                <IonButton routerLink="/it35-lab" expand="full" fill="clear" shape="round" style={{ marginTop: '10px' }}>
                    Already have an account? Signin
                </IonButton>

                {/* Verification Modal */}
                <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
                    <IonToolbar className="ion-text-center" color="primary">
                        <IonTitle>Confirm Registration</IonTitle>
                    </IonToolbar>
                    <IonContent className="ion-padding">
                        <IonCard style={{ marginTop: '20%', borderRadius: '15px' }}>
                            <IonCardHeader>
                                <IonCardTitle><h3>User Registration Details</h3></IonCardTitle>
                                <hr />
                                <IonCardSubtitle>Username</IonCardSubtitle>
                                <IonCardTitle>{username}</IonCardTitle>
                                <IonCardSubtitle>Email</IonCardSubtitle>
                                <IonCardTitle>{email}</IonCardTitle>
                            </IonCardHeader>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5px' }}>
                                <IonButton fill="clear" onClick={() => setShowVerificationModal(false)}>
                                    Cancel
                                </IonButton>
                                <IonButton className="ion-text-white" color="primary" onClick={doRegister}>Confirm</IonButton>
                            </div>
                        </IonCard>
                    </IonContent>
                </IonModal>

                {/* Success Modal */}
                <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)} color="primary">
                    <IonContent className="ion-padding" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
                        <IonTitle style={{ marginTop: '20px' }}>Registration Successful 🎉</IonTitle>
                        <IonText>
                            <p>Your account has been created successfully.</p>
                            <p>Please check your email address.</p>
                        </IonText>
                        <IonButton routerLink="/it35-lab" routerDirection="back" color="primary" style={{ marginTop: '20px' }}>
                            Go to Login
                        </IonButton>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default Register;