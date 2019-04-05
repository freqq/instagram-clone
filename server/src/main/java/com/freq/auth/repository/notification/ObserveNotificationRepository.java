package com.freq.auth.repository.notification;

import com.freq.auth.model.notification.ObserveNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ObserveNotificationRepository extends JpaRepository<ObserveNotification, Long> {
    List<ObserveNotification> findAllByNotificationReceiverId(Long userId);

    @Query("SELECT o FROM ObserveNotification o WHERE o.notificationCreator.id= :notificationCreatorId AND o.notificationReceiver.id = :notificationReceiverId")
    Optional<ObserveNotification> findByNotificationCreatorIdAndNotificatorReceiverId(@Param("notificationCreatorId") Long notificationCreatorId, @Param("notificationReceiverId") Long notificationReceiverId);
}
