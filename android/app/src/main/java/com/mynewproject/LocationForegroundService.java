package com.mynewproject;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.location.Location;
import android.os.Build;
import android.os.IBinder;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.FusedLocationProviderClient;

public class LocationForegroundService extends Service {

    private static final int NOTIFICATION_ID = 1;
    private FusedLocationProviderClient fusedLocationClient;

    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannel(); // 알림 채널 생성
        Notification notification = createNotification();
        startForeground(NOTIFICATION_ID, notification);

        // 위치 업데이트 초기화
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        startLocationUpdates();
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel("location_channel",
                    "Location Service Channel",
                    NotificationManager.IMPORTANCE_HIGH);
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }

    private Notification createNotification() {
        return new NotificationCompat.Builder(this, "location_channel")
                .setContentTitle("Location Service")
                .setContentText("Tracking location in the background")
                .setSmallIcon(R.mipmap.ic_launcher) // 알림 아이콘 설정
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .build();
    }

    private void startLocationUpdates() {
        LocationRequest locationRequest = LocationRequest.create();
        locationRequest.setInterval(10000); // 10초 간격
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY); // GPS 사용

        LocationCallback locationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult locationResult) {
                if (locationResult != null) {
                    for (Location location : locationResult.getLocations()) {
                        Log.d("LocationUpdate", "위치 업데이트: " + location.getLatitude() + ", " + location.getLongitude());
                        Toast.makeText(LocationForegroundService.this, "현재 위치: " + location.getLatitude() + ", " + location.getLongitude(), Toast.LENGTH_SHORT).show();
                    }
                } else {
                    Log.e("LocationUpdate", "현재 위치를 찾을 수 없습니다.");
                }
            }
        };

        fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, Looper.getMainLooper());
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
