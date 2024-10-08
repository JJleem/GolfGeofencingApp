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

import android.app.AlertDialog; // AlertDialog 클래스 추가
import android.content.Intent; // Intent 클래스 추가
import android.net.Uri; // Uri 클래스 추가

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
            // 권한 설정 화면으로 이동
            Intent intent = new Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
            intent.setData(Uri.parse("package:" + getPackageName()));
            startActivity(intent);
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
        geofenceList.add(new Geofence.Builder()
                .setRequestId("GuroLocation")
                .setCircularRegion(37.4865059, 126.8934746, 1000) // 현재 위치에 맞게 설정
                .setExpirationDuration(Geofence.NEVER_EXPIRE)
                .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER | Geofence.GEOFENCE_TRANSITION_EXIT)
                .build());
    }

    private GeofencingRequest getGeofencingRequest() {
        GeofencingRequest.Builder builder = new GeofencingRequest.Builder();
        builder.setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER);
        builder.addGeofences(geofenceList);
        return builder.build();
    }

    // private PendingIntent getGeofencePendingIntent() {
    //     Intent intent = new Intent(this, GeofenceBroadcastReceiver.class);
    //     return PendingIntent.getBroadcast(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    // }
        private PendingIntent getGeofencePendingIntent() {
        Intent intent = new Intent(this, GeofenceBroadcastReceiver.class);
        
        // 로그 추가
        Log.d("GeofencePendingIntent", "Creating PendingIntent");
        
        PendingIntent pendingIntent = PendingIntent.getBroadcast(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        
        if (pendingIntent != null) {
            Log.d("GeofencePendingIntent", "PendingIntent created successfully");
        } else {
            Log.e("GeofencePendingIntent", "Failed to create PendingIntent");
        }
        
        return pendingIntent;
    }

        private void addGeofences() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED &&
            ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_BACKGROUND_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            
            Log.d("Geofencing", "Adding geofences with permissions granted");
            geofencingClient.addGeofences(getGeofencingRequest(), getGeofencePendingIntent())
                .addOnSuccessListener(this, aVoid -> {
                    Toast.makeText(MainActivity.this, "지오펜싱 추가 성공", Toast.LENGTH_SHORT).show();
                    Log.d("GeofencingSize", "Geofence added: " + geofenceList.size());
                                    for (Geofence geofence : geofenceList) {
                    Log.d("GeofencingSize", "Geofence ID: " + geofence.getRequestId());
                    
                }
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
                showPermissionDeniedDialog();
            }
        }
    }

        // 권한 거부 시 팝업창 보여주는 메서드
    private void showPermissionDeniedDialog() {
        new AlertDialog.Builder(this)
            .setTitle("위치 권한 필요")
            .setMessage("위치 권한이 필요합니다. 앱 설정으로 이동하여 권한을 허용해 주세요.")
            .setPositiveButton("설정으로 이동", (dialog, which) -> {
                // 권한 설정 화면으로 이동
                Intent intent = new Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                intent.setData(Uri.parse("package:" + getPackageName()));
                startActivity(intent);
            })
            .setNegativeButton("취소", (dialog, which) -> dialog.dismiss())
            .create()
            .show();
    }
}

