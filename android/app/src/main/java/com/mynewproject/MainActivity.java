// 백그라운드 까지 구현해 놓은 코드
package com.mynewproject;

import android.Manifest;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.widget.Toast;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingClient;
import com.google.android.gms.location.GeofencingRequest;
import com.google.android.gms.location.LocationServices;
import com.facebook.react.ReactActivity;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends ReactActivity {
    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1; // 위치 권한 요청 코드
    private GeofencingClient geofencingClient; // 지오펜싱 클라이언트
    private List<Geofence> geofenceList; // 지오펜스 리스트


    @Override
    protected String getMainComponentName() {
        return "MyNewProject"; // 프로젝트 이름
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // 초기화
        geofencingClient = LocationServices.getGeofencingClient(this);
        geofenceList = new ArrayList<>();

        // 테스트용 지오펜싱 영역 추가
        addTestGeofence();

        requestLocationPermission(); // 위치 권한 요청
    }

        private void requestLocationPermission() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED ||
            ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_BACKGROUND_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.ACCESS_BACKGROUND_LOCATION
            }, LOCATION_PERMISSION_REQUEST_CODE);
        } else {
            startForegroundService(); // 권한이 허용된 경우 포그라운드 서비스 시작
            addGeofences(); // 권한이 허용된 경우 지오펜스 추가
        }
    }


    private void startForegroundService() {
        Intent serviceIntent = new Intent(this, LocationForegroundService.class);
        ContextCompat.startForegroundService(this, serviceIntent);
    }

    private void addTestGeofence() {
        Log.d("Geofence", "Adding test geofence");
        geofenceList.add(new Geofence.Builder()
                .setRequestId("SeoulCityHall")
                .setCircularRegion(37.5665, 126.9780, 100) // 서울시청의 위도와 경도, 반경 100m
                .setExpirationDuration(Geofence.NEVER_EXPIRE)
                .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER | Geofence.GEOFENCE_TRANSITION_EXIT)
                .build());
                Log.d("GeofencingError", "Geofence added: " + geofenceList.size());
    }

    private GeofencingRequest getGeofencingRequest() {
        GeofencingRequest.Builder builder = new GeofencingRequest.Builder();
        builder.setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER);
        builder.addGeofences(geofenceList);
        return builder.build();
    }

    private PendingIntent getGeofencePendingIntent() {
        Intent intent = new Intent(this, GeofenceBroadcastReceiver.class);
        return PendingIntent.getBroadcast(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

        private void addGeofences() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED &&
            ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_BACKGROUND_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            
            Log.d("Geofencing", "Adding geofences with permissions granted");
            geofencingClient.addGeofences(getGeofencingRequest(), getGeofencePendingIntent())
                .addOnSuccessListener(this, aVoid -> {
                    Toast.makeText(MainActivity.this, "지오펜싱 추가 성공", Toast.LENGTH_SHORT).show();
                })
                .addOnFailureListener(this, e -> {
                    String errorMessage = "지오펜싱 추가 실패: " + e.getMessage();
                    Toast.makeText(MainActivity.this, errorMessage, Toast.LENGTH_SHORT).show();
                    Log.e("GeofencingError", errorMessage);
                });
        } else {
            Log.e("GeofencingError", "Permission not granted for adding geofences");
        }
    }




    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                startForegroundService(); // 권한이 허용되면 서비스 시작
                addGeofences(); // 지오펜스 추가
            } else {
                Toast.makeText(this, "위치 권한이 필요합니다.", Toast.LENGTH_SHORT).show();
            }
        }
    }
}