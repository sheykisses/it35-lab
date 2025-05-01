import {
    IonApp,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonInput,
    IonButton,
    IonRow,
    IonCol,
    IonAvatar,
    IonIcon,
    IonPopover,
    IonModal,
    IonFooter,
    IonAlert,
    IonLabel,
    IonText,
  } from '@ionic/react';
  
  import { pencil, trash } from 'ionicons/icons';
  import { useEffect, useState } from 'react';
  import { supabase } from '../utils/supabaseClient';
  import { User } from '@supabase/supabase-js';
  
  interface Post {
    post_id: string;
    user_id: number;
    username: string;
    avatar_url: string;
    post_content: string;
    post_created_at: string;
    post_updated_at: string;
  }
  
  const FeedContainer = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [postContent, setPostContent] = useState('');
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; postId: string | null }>({ open: false, event: null, postId: null });
  
    useEffect(() => {
      const init = async () => {
        const { data: authData } = await supabase.auth.getUser();
        const currentUser = authData?.user;
  
        if (currentUser?.email?.endsWith('@nbsc.edu.ph')) {
          setUser(currentUser);
  
          const { data: userData } = await supabase
            .from('users')
            .select('user_id, username, user_avatar_url')
            .eq('user_email', currentUser.email)
            .single();
  
          if (userData) {
            setUser({ ...currentUser, id: userData.user_id });
            setUsername(userData.username);
          }
        }
  
        const { data: postsData } = await supabase
          .from('posts')
          .select('*')
          .order('post_created_at', { ascending: false });
  
        if (postsData) setPosts(postsData as Post[]);
      };
  
      init();
    }, []);
  
    const createPost = async () => {
      if (!postContent || !user || !username) return;
  
      const { data: userData } = await supabase
        .from('users')
        .select('user_avatar_url')
        .eq('user_id', user.id)
        .single();
  
      const avatarUrl = userData?.user_avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg';
  
      const { data } = await supabase
        .from('posts')
        .insert([{ post_content: postContent, user_id: user.id, username, avatar_url: avatarUrl }])
        .select('*');
  
      if (data) {
        setPosts([data[0] as Post, ...posts]);
        setPostContent('');
      }
    };
  
    const deletePost = async (post_id: string) => {
      await supabase.from('posts').delete().match({ post_id });
      setPosts(posts.filter(post => post.post_id !== post_id));
    };
  
    const startEditingPost = (post: Post) => {
      setEditingPost(post);
      setPostContent(post.post_content);
      setIsModalOpen(true);
    };
  
    const savePost = async () => {
      if (!postContent || !editingPost) return;
  
      const { data } = await supabase
        .from('posts')
        .update({ post_content: postContent })
        .match({ post_id: editingPost.post_id })
        .select('*');
  
      if (data) {
        const updatedPost = data[0] as Post;
        setPosts(posts.map(post => (post.post_id === updatedPost.post_id ? updatedPost : post)));
        setPostContent('');
        setEditingPost(null);
        setIsModalOpen(false);
        setIsAlertOpen(true);
      }
    };
  
    return (
      <IonApp>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Campus Feed</IonTitle>
            </IonToolbar>
          </IonHeader>
  
          <IonContent className="ion-padding">
            {user ? (
              <>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Create a Post</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonInput
                      value={postContent}
                      onIonChange={e => setPostContent(e.detail.value!)}
                      placeholder="What's on your mind?"
                      clearInput
                    />
                    <IonButton expand="block" className="ion-margin-top" onClick={createPost}>
                      Post
                    </IonButton>
                  </IonCardContent>
                </IonCard>
  
                {posts.map(post => (
                  <IonCard key={post.post_id}>
                    <IonCardHeader>
                      <IonRow>
                        <IonCol size="auto">
                          <IonAvatar>
                            <img alt={post.username} src={post.avatar_url} />
                          </IonAvatar>
                        </IonCol>
                        <IonCol>
                          <IonCardTitle>{post.username}</IonCardTitle>
                          <IonCardSubtitle>{new Date(post.post_created_at).toLocaleString()}</IonCardSubtitle>
                        </IonCol>
                        <IonCol size="auto">
                          <IonButton
                            fill="clear"
                            onClick={e => setPopoverState({ open: true, event: e.nativeEvent, postId: post.post_id })}
                          >
                            <IonIcon icon={pencil} color="medium" />
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonCardHeader>
  
                    <IonCardContent>
                      <IonText>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{post.post_content}</p>
                      </IonText>
                    </IonCardContent>
  
                    <IonPopover
                      isOpen={popoverState.open && popoverState.postId === post.post_id}
                      event={popoverState.event}
                      onDidDismiss={() => setPopoverState({ open: false, event: null, postId: null })}
                    >
                      <IonButton
                        expand="block"
                        onClick={() => {
                          startEditingPost(post);
                          setPopoverState({ open: false, event: null, postId: null });
                        }}
                      >
                        Edit
                      </IonButton>
                      <IonButton
                        expand="block"
                        color="danger"
                        onClick={() => {
                          deletePost(post.post_id);
                          setPopoverState({ open: false, event: null, postId: null });
                        }}
                      >
                        Delete
                      </IonButton>
                    </IonPopover>
                  </IonCard>
                ))}
              </>
            ) : (
              <IonLabel>Loading user data...</IonLabel>
            )}
          </IonContent>
  
          <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Edit Post</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonInput
                value={postContent}
                onIonChange={e => setPostContent(e.detail.value!)}
                placeholder="Edit your post"
                clearInput
              />
            </IonContent>
            <IonFooter className="ion-padding">
              <IonButton expand="block" onClick={savePost}>
                Save
              </IonButton>
              <IonButton expand="block" color="medium" onClick={() => setIsModalOpen(false)}>
                Cancel
              </IonButton>
            </IonFooter>
          </IonModal>
  
          <IonAlert
            isOpen={isAlertOpen}
            onDidDismiss={() => setIsAlertOpen(false)}
            header="Success"
            message="Post updated successfully!"
            buttons={['OK']}
          />
        </IonPage>
      </IonApp>
    );
  };
  
  export default FeedContainer;
  