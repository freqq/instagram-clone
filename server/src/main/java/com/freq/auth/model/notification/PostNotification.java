package com.freq.auth.model.notification;

import com.freq.auth.model.audit.UserDateAudit;
import com.freq.auth.model.post.Post;
import com.freq.auth.model.user.User;

import javax.persistence.*;

@Entity
@Table(name = "post_notification")
public class PostNotification extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "notification_creator_id", nullable = false)
    private User notificationCreator;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "notification_receiver_id", nullable = false)
    private User notificationReceiver;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private PostNotificationType notificationType;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    public PostNotification() {
    }

    public PostNotification(User notificationCreator, User notificationReceiver, PostNotificationType notificationType) {
        this.notificationCreator = notificationCreator;
        this.notificationReceiver = notificationReceiver;
        this.notificationType = notificationType;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getNotificationCreator() {
        return notificationCreator;
    }

    public void setNotificationCreator(User notificationCreator) {
        this.notificationCreator = notificationCreator;
    }

    public User getNotificationReceiver() {
        return notificationReceiver;
    }

    public void setNotificationReceiver(User notificationReceiver) {
        this.notificationReceiver = notificationReceiver;
    }

    public PostNotificationType getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(PostNotificationType notificationType) {
        this.notificationType = notificationType;
    }
}
