package com.freq.auth.model;

import com.freq.auth.model.audit.UserDateAudit;
import com.freq.auth.model.user.User;

import javax.persistence.*;

@Entity
@Table(name = "observe_notifications", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "notification_creator_id",
                "notification_receiver_id"
        })
})
public class ObserveNotification extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "notification_creator_id", nullable = false)
    private User notificationCreator;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "notification_receiver_id", nullable = false)
    private User notificationReceiver;

    public ObserveNotification() {}

    public ObserveNotification(User notificationCreator, User notificationReceiver) {
        this.notificationCreator = notificationCreator;
        this.notificationReceiver = notificationReceiver;
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
}
