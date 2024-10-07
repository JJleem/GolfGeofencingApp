// 현재 위치를 10초간격으로 계속 불러오는것 까지 구현 -> 폐기 예정
// package com.mynewproject;

// import android.Manifest;
// import android.app.PendingIntent;
// import android.content.Intent;
// import android.content.pm.PackageManager;
// import android.location.Location;
// import android.os.Bundle;
// import android.os.Looper;
// import android.util.Log;
// import android.widget.Toast;

// import androidx.annotation.NonNull;
// import androidx.appcompat.app.AppCompatActivity;
// import androidx.core.app.ActivityCompat;

// import com.google.android.gms.location.Geofence;
// import com.google.android.gms.location.GeofencingClient;
// import com.google.android.gms.location.GeofencingRequest;
// import com.google.android.gms.location.LocationCallback;
// import com.google.android.gms.location.LocationRequest;
// import com.google.android.gms.location.LocationResult;
// import com.google.android.gms.location.LocationServices;
// import com.google.android.gms.location.FusedLocationProviderClient;
// import com.facebook.react.ReactActivity;



// import java.util.ArrayList;
// import java.util.List;

// public class MainActivity extends ReactActivity {
//     private static final int LOCATION_PERMISSION_REQUEST_CODE = 1; // 위치 권한 요청 코드
//     private GeofencingClient geofencingClient; // 지오펜싱 클라이언트
//     private FusedLocationProviderClient fusedLocationClient; // 현재 위치를 제공하는 클라이언트
//     private PendingIntent geofencePendingIntent; // 지오펜스 트리거 시 수행할 PendingIntent
//     private List<Geofence> geofenceList; // 지오펜스 리스트 (여러 지오펜스 저장 가능)

//     @Override
//     protected String getMainComponentName() {
//         return "MyNewProject"; // 프로젝트 이름
//     }

//     @Override
//     protected void onCreate(Bundle savedInstanceState) {
//         super.onCreate(savedInstanceState);
//         // 초기화
//         geofencingClient = LocationServices.getGeofencingClient(this);
//         fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
//         geofenceList = new ArrayList<>();

//         // 테스트용 지오펜싱 영역 추가
//         addTestGeofence();

//         // 위치 권한 요청
//         requestLocationPermission();
//     }

//     // 위치 업데이트를 주기적으로 요청하는 메서드
//     private void startLocationUpdates() {
//         LocationRequest locationRequest = LocationRequest.create();
//         locationRequest.setInterval(10000); // 10초 간격

//         locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY); // GPS 사용

//         // LocationCallback 설정
//         LocationCallback locationCallback = new LocationCallback() {
//             @Override
//             public void onLocationResult(LocationResult locationResult) {
//                 if (locationResult != null ) {
//                     for (Location location : locationResult.getLocations()) {
//                          Log.d("LocationUpdate", "위치 업데이트: " + location.getLatitude() + ", " + location.getLongitude());
//                         // 위치가 업데이트되면 현재 위치를 Toast로 출력
//                         double latitude = location.getLatitude();
//                         double longitude = location.getLongitude();
//                         Toast.makeText(MainActivity.this, "현재 위치: " + latitude + ", " + longitude, Toast.LENGTH_SHORT).show();
//                     }
//                 } else {
//                     // 위치 데이터를 가져오지 못했을 때
//                     Log.e("LocationUpdate", "현재 위치를 찾을 수 없습니다.");
//                     Toast.makeText(MainActivity.this, "현재 위치를 찾을 수 없습니다.", Toast.LENGTH_SHORT).show();
//                 }
//             }
//         };

//         // 위치 업데이트 요청
//         fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, Looper.getMainLooper());
//     }

//     // 위치 권한 요청 메서드
//     private void requestLocationPermission() {
//         if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
//             ActivityCompat.requestPermissions(this, new String[]{
//                     Manifest.permission.ACCESS_FINE_LOCATION,
//                     Manifest.permission.ACCESS_BACKGROUND_LOCATION
//             }, LOCATION_PERMISSION_REQUEST_CODE);
//         } else {
//             addGeofences();
//             startLocationUpdates(); // 위치 업데이트 시작
//         }
//     }

//     // 테스트용 지오펜싱 추가 메서드
//     private void addTestGeofence() {
//         geofenceList.add(new Geofence.Builder()
//             .setRequestId("SeoulCityHall")
//             .setCircularRegion(37.5665, 126.9780, 100)
//             .setExpirationDuration(Geofence.NEVER_EXPIRE)
//             .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER | Geofence.GEOFENCE_TRANSITION_EXIT)
//             .build());
//          Log.d("Geofencing", "지오펜스 갯수: " + geofenceList.size());
//     }

//     // GeofencingRequest 생성
//     private GeofencingRequest getGeofencingRequest() {
//         GeofencingRequest.Builder builder = new GeofencingRequest.Builder();
//         builder.setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER);
//         builder.addGeofences(geofenceList);
//         return builder.build();
//     }

//     // PendingIntent 생성
//     private PendingIntent getGeofencePendingIntent() {
//         if (geofencePendingIntent != null) {
//             return geofencePendingIntent;
//         }
//         Intent intent = new Intent(this, GeofenceBroadcastReceiver.class);
//         geofencePendingIntent = PendingIntent.getBroadcast(this, 0, intent,
//                 PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
//         return geofencePendingIntent;
//     }

//     // 지오펜싱 추가 메서드
//     private void addGeofences() {
//         if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
//             geofencingClient.addGeofences(getGeofencingRequest(), getGeofencePendingIntent())
//                 .addOnSuccessListener(this, aVoid -> {
//                     Toast.makeText(MainActivity.this, "지오펜싱 추가 성공", Toast.LENGTH_SHORT).show();
//                     startLocationUpdates(); // 지오펜싱 추가 후 위치 업데이트 시작
//                 })
//                 .addOnFailureListener(this, e -> {
//                     String errorMessage = "지오펜싱 추가 실패: " + e.getMessage();
//                     Toast.makeText(MainActivity.this, errorMessage, Toast.LENGTH_SHORT).show();
//                     Log.e("Geofencing", "Geofence addition failed: " + e.getMessage(), e);
//                 });
//         }
//     }

//     // 위치 권한 요청 결과 처리
//     @Override
//     public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
//         super.onRequestPermissionsResult(requestCode, permissions, grantResults);
//         if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
//             if (grantResults.length > 0) {
//                 boolean locationPermissionGranted = grantResults[0] == PackageManager.PERMISSION_GRANTED;
//                 boolean backgroundLocationPermissionGranted = grantResults.length > 1 && grantResults[1] == PackageManager.PERMISSION_GRANTED;

//                 if (locationPermissionGranted && backgroundLocationPermissionGranted) {
//                     addGeofences();
//                     startLocationUpdates(); // 권한 부여 후 위치 업데이트 시작
//                 } else {
//                     Toast.makeText(this, "위치 권한이 필요합니다.", Toast.LENGTH_SHORT).show();
//                 }
//             }
//         }
//     }
// }


// 백그라운드 까지 구현해 놓은 코드
package com.mynewproject;

import android.Manifest;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.widget.Toast;

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
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.ACCESS_BACKGROUND_LOCATION,
                    Manifest.permission.FOREGROUND_SERVICE_LOCATION 
            }, LOCATION_PERMISSION_REQUEST_CODE);
        } else {
            startForegroundService(); // 권한이 허용된 경우 포그라운드 서비스 시작
            addGeofences(); // 지오펜스 추가
        }
    }

    private void startForegroundService() {
        Intent serviceIntent = new Intent(this, LocationForegroundService.class);
        ContextCompat.startForegroundService(this, serviceIntent);
    }

    private void addTestGeofence() {
        geofenceList.add(new Geofence.Builder()
                .setRequestId("SeoulCityHall")
                .setCircularRegion(37.5665, 126.9780, 100) // 서울시청의 위도와 경도, 반경 100m
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

    private PendingIntent getGeofencePendingIntent() {
        Intent intent = new Intent(this, GeofenceBroadcastReceiver.class);
        return PendingIntent.getBroadcast(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    private void addGeofences() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            geofencingClient.addGeofences(getGeofencingRequest(), getGeofencePendingIntent())
                    .addOnSuccessListener(this, aVoid -> {
                        Toast.makeText(MainActivity.this, "지오펜싱 추가 성공", Toast.LENGTH_SHORT).show();
                    })
                    .addOnFailureListener(this, e -> {
                        String errorMessage = "지오펜싱 추가 실패: " + e.getMessage();
                        Toast.makeText(MainActivity.this, errorMessage, Toast.LENGTH_SHORT).show();
                    });
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


