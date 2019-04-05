package com.freq.auth.repository.notification;

import com.freq.auth.model.notification.PostNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostNotificationRepository extends JpaRepository<PostNotification, Long> {
    List<PostNotification> findAllByNotificationReceiverId(Long userId);

    @Query("SELECT o FROM PostNotification o WHERE o.notificationCreator.id= :notificationCreatorId AND o.notificationReceiver.id = :notificationReceiverId")
    Optional<PostNotification> findByNotificationCreatorIdAndNotificatorReceiverId(@Param("notificationCreatorId") Long notificationCreatorId, @Param("notificationReceiverId") Long notificationReceiverId);
}
