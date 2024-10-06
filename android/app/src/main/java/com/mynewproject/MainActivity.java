// package com.mynewproject;

// import android.Manifest; // 권한을 요청하기 위한 클래스
// import android.app.PendingIntent; // PendingIntent를 생성하기 위한 클래스
// import android.content.Intent; // 인텐트를 사용하여 컴포넌트를 시작하는 데 사용되는 클래스
// import android.content.pm.PackageManager; // 패키지 관리자를 사용하여 앱 정보를 가져오는 클래스
// import android.os.Build; // Android OS 버전 정보를 가져오기 위한 클래스
// import android.os.Bundle; // 액티비티 상태 정보를 저장하고 복원하기 위한 클래스
// import android.widget.Toast; // 사용자에게 메시지를 표시하기 위한 클래스
// import androidx.core.app.ActivityCompat; // 권한 요청을 처리하기 위한 클래스
// import androidx.appcompat.app.AppCompatActivity; // 앱 호환성을 위한 액티비티 클래스
// import com.google.android.gms.location.Geofence; // Google Play Location API의 Geofence 클래스
// import com.google.android.gms.location.GeofencingClient; // 지오펜스 클라이언트를 관리하는 클래스
// import com.google.android.gms.location.GeofencingRequest; // 지오펜싱 요청을 나타내는 클래스
// import com.google.android.gms.location.LocationServices; // 위치 서비스에 접근하기 위한 클래스

// import java.util.ArrayList; // 동적 배열을 구현하는 클래스
// import java.util.List; // List 인터페이스를 사용하여 여러 값을 저장할 수 있도록 함

// // 안드로이드에서 Activity를 확장한 클래스 기본적으로 Activity는 안드로이드에서 UI를 보여주고 상호작용을 처리하는 핵심 컴포넌트임
// public class MainActivity extends AppCompatActivity {

//     private static final int MY_PERMISSIONS_REQ_ACCESS_FINE_LOCATION = 100; // 위치 권한 요청 코드
//     private static final int MY_PERMISSIONS_REQ_ACCESS_BACKGROUND_LOCATION = 101; // 백그라운드 위치 권한 요청 코드

//     private GeofencingClient geofencingClient; // 지오펜스 클라이언트 변수
//     private PendingIntent geofencePendingIntent; // 지오펜스 대기 인텐트 변수

//     private List<Geofence> geofenceList = new ArrayList<>(); // 지오펜스 목록을 저장하기 위한 리스트

//     @Override
//     protected void onCreate(Bundle savedInstanceState) {
//         // 지오펜스 등록 메서드
//         super.onCreate(savedInstanceState);
//         geofencingClient = LocationServices.getGeofencingClient(this); // 지오펜스 클라이언트 초기화

//         // 지오펜스 추가
//         geofenceList.add(getGeofence("현대백화점", 37.5085864, 127.0601149, 10.0f));
//         geofenceList.add(getGeofence("삼성역", 37.5094518, 127.063603, 10.0f));

//         checkPermission(); // 권한 확인
//     }

//     @Override
//     public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
//         // 권한 요청 결과 처리
//         switch (requestCode) {
//             case MY_PERMISSIONS_REQ_ACCESS_FINE_LOCATION:
//             case MY_PERMISSIONS_REQ_ACCESS_BACKGROUND_LOCATION:
//                 if (grantResults.length > 0) {
//                     // 모든 권한이 승인되었는지 확인
//                     for (int result : grantResults) {
//                         if (result != PackageManager.PERMISSION_GRANTED) {
//                             checkPermission(); // 권한이 승인되지 않으면 다시 확인
//                             return;
//                         }
//                     }
//                 } else {
//                     checkPermission(); // 권한 요청 결과가 없으면 다시 확인
//                 }
//                 break;
//         }
//     }

//     private void checkPermission() {
//         // 위치 권한을 요청하고, 사용자가 승인했는지 확인하는 메서드
//         // ACCESS_FINE_LOCATION 권한 확인
//         boolean permissionAccessFineLocationApproved = ActivityCompat.checkSelfPermission(
//                 this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED;

//         if (permissionAccessFineLocationApproved) {
//             // Android Q 이상에서는 백그라운드 위치 권한 확인
//             if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
//                 boolean backgroundLocationPermissionApproved = ActivityCompat.checkSelfPermission(
//                         this, Manifest.permission.ACCESS_BACKGROUND_LOCATION) == PackageManager.PERMISSION_GRANTED;

//                 // 백그라운드 위치 권한 요청
//                 if (!backgroundLocationPermissionApproved) {
//                     ActivityCompat.requestPermissions(
//                             this,
//                             new String[]{Manifest.permission.ACCESS_BACKGROUND_LOCATION},
//                             MY_PERMISSIONS_REQ_ACCESS_BACKGROUND_LOCATION
//                     );
//                 }
//             }
//         } else {
//             // ACCESS_FINE_LOCATION 권한 요청
//             ActivityCompat.requestPermissions(
//                     this,
//                     new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
//                     MY_PERMISSIONS_REQ_ACCESS_FINE_LOCATION
//             );
//         }
//     }

//     private Geofence getGeofence(String reqId, double latitude, double longitude, float radius) {
//         // 지오펜스 객체 생성
//         // 특정 위치에 대한 지오펜스를 생성하는 메서드 (원형 모형임 -> 다각형 지오펜스를 원하면 로직을 다시 만들어야함)
//         return new Geofence.Builder()
//                 .setRequestId(reqId)    // 이벤트 발생시 BroadcastReceiver에서 구분할 id
//                 .setCircularRegion(latitude, longitude, radius)    // 위치 및 반경(m)
//                 .setExpirationDuration(Geofence.NEVER_EXPIRE)        // Geofence 만료 시간
//                 .setLoiteringDelay(10000)                            // 머물기 체크 시간
//                 .setTransitionTypes(
//                         Geofence.GEOFENCE_TRANSITION_ENTER                // 진입 감지시
//                                 | Geofence.GEOFENCE_TRANSITION_EXIT    // 이탈 감지시
//                                 | Geofence.GEOFENCE_TRANSITION_DWELL)    // 머물기 감지시
//                 .build(); // 지오펜스 빌드
//     }

//     private GeofencingRequest getGeofencingRequest(List<Geofence> geofenceList) {
//         // 지오펜싱 요청 생성해주는 메서드 -> 리스트 안에 넣기
//         GeofencingRequest.Builder builder = new GeofencingRequest.Builder();
//         builder.setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER); // 초기 트리거 설정
//         builder.addGeofences(geofenceList);    // Google Play Services에 지오펜스 리스트에 추가 추가
//         return builder.build(); // 요청 빌드
//     }

    
//     private void addGeofences() {
//         // 지오펜스 요청 및 대기 인텐트 설정
//         // 지오펜스를 등록하고 성공 실패 여부를 사용자에게 알리는 메서드
//         geofencingClient.addGeofences(getGeofencingRequest(geofenceList), getGeofencePendingIntent())
//                 .addOnSuccessListener(aVoid -> Toast.makeText(this, "Geofences added", Toast.LENGTH_SHORT).show())
//                 .addOnFailureListener(e -> Toast.makeText(this, "Geofences not added", Toast.LENGTH_SHORT).show());
//     }

//     private PendingIntent getGeofencePendingIntent() {
//         // 대기 인텐트 생성
//         if (geofencePendingIntent != null) {
//             return geofencePendingIntent; // 이미 생성된 인텐트가 있다면 반환
//         }

//         Intent intent = new Intent(this, GeofenceBroadcastReceiver.class); // 브로드캐스트 수신기 설정
//         geofencePendingIntent = PendingIntent.getBroadcast(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT); // 대기 인텐트 생성
//         return geofencePendingIntent; // 대기 인텐트 반환
//     }
// }


// package com.mynewproject;

// import android.Manifest;
// import android.content.pm.PackageManager;
// import android.location.Location;
// import android.location.LocationManager;
// import android.os.Bundle;
// import android.widget.Toast;
// import androidx.annotation.NonNull;
// import androidx.appcompat.app.AppCompatActivity;
// import androidx.core.app.ActivityCompat;
// import com.facebook.react.ReactActivity;
// import com.google.android.gms.location.FusedLocationProviderClient;
// import com.google.android.gms.location.LocationServices;
// import com.google.android.gms.tasks.OnSuccessListener;

// public class MainActivity extends ReactActivity {

//     private static final int LOCATION_PERMISSION_REQUEST_CODE = 1;
//     private FusedLocationProviderClient fusedLocationClient;

//     @Override
//     protected String getMainComponentName() {
//         return "MyNewProject"; // 여기서 프로젝트 이름으로 변경
//     }

//     @Override
//     protected void onCreate(Bundle savedInstanceState) {
//         super.onCreate(savedInstanceState);
//         fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);

//         // 위치 권한 요청
//         requestLocationPermission();
//     }

//     private void requestLocationPermission() {
//         // 위치 권한이 없는 경우 요청
//         if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
//             ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, LOCATION_PERMISSION_REQUEST_CODE);
//         } else {
//             // 권한이 이미 있는 경우 현재 위치 가져오기
//             getCurrentLocation();
//         }
//     }

//     private void getCurrentLocation() {
//         LocationManager locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);
        
//         // 위치 서비스가 활성화 되어 있는지 확인
//         if (!locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
//             Toast.makeText(this, "GPS가 꺼져 있습니다. 위치 서비스를 활성화해주세요.", Toast.LENGTH_SHORT).show();
//             return;
//         }

//         fusedLocationClient.getLastLocation()
//             .addOnSuccessListener(this, new OnSuccessListener<Location>() {
//                 @Override
//                 public void onSuccess(Location location) {
//                     // 현재 위치를 가져왔을 때
//                     if (location != null) {
//                         double latitude = location.getLatitude();
//                         double longitude = location.getLongitude();
//                         Toast.makeText(MainActivity.this, "현재 위치: " + latitude + ", " + longitude, Toast.LENGTH_SHORT).show();
//                     } else {
//                         Toast.makeText(MainActivity.this, "위치를 찾을 수 없습니다.", Toast.LENGTH_SHORT).show();
//                     }
//                 }
//             });
//     }

//     @Override
//     public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
//         super.onRequestPermissionsResult(requestCode, permissions, grantResults);
//         if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
//             if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
//                 // 권한이 승인된 경우 현재 위치 가져오기
//                 getCurrentLocation();
//             } else {
//                 // 권한이 거부된 경우 사용자에게 알림
//                 Toast.makeText(this, "위치 권한이 필요합니다. 권한을 승인해주세요.", Toast.LENGTH_SHORT).show();
//             }
//         }
//     }
// }


package com.mynewproject;

import android.Manifest;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingClient;
import com.google.android.gms.location.GeofencingRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import java.util.ArrayList;
import java.util.List;
import com.facebook.react.ReactActivity;
import android.util.Log;




public class MainActivity extends ReactActivity {

    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1; // 위치 권한 요청 코드
    private GeofencingClient geofencingClient; // 지오펜싱 클라이언트
    private FusedLocationProviderClient fusedLocationClient; // 현재 위치를 제공하는 클라이언트
    private PendingIntent geofencePendingIntent; // 지오펜스 트리거 시 수행할 PendingIntent
    private List<Geofence> geofenceList; // 지오펜스 리스트 (여러 지오펜스 저장 가능)
    

    @Override
    protected String getMainComponentName() {
         return "MyNewProject"; // 여기서 프로젝트 이름으로 변경
     }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // GeofencingClient 초기화: 지오펜싱 관련 작업을 처리하는 클라이언트
        geofencingClient = LocationServices.getGeofencingClient(this);

        // FusedLocationProviderClient 초기화: 현재 위치 데이터를 얻기 위한 클라이언트
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);

        // 지오펜싱 리스트 초기화
        geofenceList = new ArrayList<>();

        // 테스트용 지오펜싱 영역 추가 (예: 서울시청 좌표, 반경 100m)
        addTestGeofence();

        // 위치 권한 요청 (권한이 없으면 요청을, 있으면 바로 지오펜싱 추가)
        requestLocationPermission();

        // 현재 위치를 가져오기
        getCurrentLocation();
    }


    // 위치 권한 요청 메서드: ACCESS_FINE_LOCATION 권한이 있는지 확인 후, 없으면 권한을 요청합니다.
    private void requestLocationPermission() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // 권한을 요청합니다.
            ActivityCompat.requestPermissions(this, new String[]{
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_BACKGROUND_LOCATION
            }, LOCATION_PERMISSION_REQUEST_CODE);
        } else {
            // 권한이 이미 있으면 지오펜싱을 추가합니다.
            addGeofences();
        }
    }

    // 현재 위치를 가져오는 메서드: 권한이 있으면 마지막으로 알려진 위치 데이터를 가져옵니다.
    private void getCurrentLocation() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED || 
            ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_BACKGROUND_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            
            // FusedLocationProviderClient로 현재 위치를 가져옵니다.
            fusedLocationClient.getLastLocation()
                .addOnSuccessListener(this, location -> {
                    // 위치 데이터를 성공적으로 가져왔을 때
                    if (location != null) {
                        // 위도와 경도를 가져와서 화면에 출력
                        double latitude = location.getLatitude();
                        double longitude = location.getLongitude();
                        Toast.makeText(MainActivity.this, "현재 위치: " + latitude + ", " + longitude, Toast.LENGTH_LONG).show();
                    } else {
                        // 위치 데이터를 가져오지 못했을 때
                        Toast.makeText(MainActivity.this, "위치를 찾을 수 없습니다.", Toast.LENGTH_SHORT).show();
                    }
                });
        }
    }

    // 테스트용 지오펜싱 추가 메서드: 좌표를 가져다 지오펜싱으로 설정, 반경을 100m로 설정
        private void addTestGeofence() {
        // 서울시청 지오펜스 추가
        geofenceList.add(new Geofence.Builder()
            .setRequestId("SeoulCityHall")
            .setCircularRegion(37.5665, 126.9780, 100)  // 위도, 경도, 반경 (미터)
            .setExpirationDuration(Geofence.NEVER_EXPIRE) // 지오펜싱의 유효 기간 (무기한)
            .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER | Geofence.GEOFENCE_TRANSITION_EXIT) // 진입/이탈 이벤트 트리거 설정
            .build());

        // 해운대 지오펜스 추가
        geofenceList.add(new Geofence.Builder()
            .setRequestId("Haeundae")
            .setCircularRegion(35.1587, 129.1602, 100)  // 해운대 위도, 경도, 반경 (미터)
            .setExpirationDuration(Geofence.NEVER_EXPIRE) // 지오펜싱의 유효 기간 (무기한)
            .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER | Geofence.GEOFENCE_TRANSITION_EXIT) // 진입/이탈 이벤트 트리거 설정
            .build());

        // 부산역 지오펜스 추가
        geofenceList.add(new Geofence.Builder()
            .setRequestId("BusanStation")
            .setCircularRegion(35.1155, 129.0409, 100)  // 부산역 위도, 경도, 반경 (미터)
            .setExpirationDuration(Geofence.NEVER_EXPIRE) // 지오펜싱의 유효 기간 (무기한)
            .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER | Geofence.GEOFENCE_TRANSITION_EXIT) // 진입/이탈 이벤트 트리거 설정
            .build());

        // 지오펜스 갯수 출력
        Log.d("Geofencing", "지오펜스 갯수: " + geofenceList.size());
    }


    // GeofencingRequest 생성: 지오펜싱 리스트를 요청 객체로 변환하는 메서드
    private GeofencingRequest getGeofencingRequest() {
        GeofencingRequest.Builder builder = new GeofencingRequest.Builder();
        builder.setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER); // 진입 이벤트 초기화 시점 설정
        builder.addGeofences(geofenceList); // 지오펜싱 리스트 추가
        return builder.build(); // 요청 객체 반환
    }

    // 지오펜싱 이벤트 발생 시 실행할 PendingIntent 생성
    private PendingIntent getGeofencePendingIntent() {
        if (geofencePendingIntent != null) {
            return geofencePendingIntent; // 이미 PendingIntent가 있으면 반환
        }
        // 지오펜싱 이벤트 수신을 위한 인텐트 생성
        Intent intent = new Intent(this, GeofenceBroadcastReceiver.class);
        // PendingIntent를 생성하여 브로드캐스트 리시버로 전달
        geofencePendingIntent = PendingIntent.getBroadcast(this, 0, intent, 
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE); // FLAG_IMMUTABLE 추가
        return geofencePendingIntent;
    }


    // 지오펜싱 추가 메서드: 권한이 있을 경우 지정된 지오펜싱을 등록합니다.
    private void addGeofences() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            // GeofencingClient를 통해 지오펜싱 추가
            geofencingClient.addGeofences(getGeofencingRequest(), getGeofencePendingIntent())
                .addOnSuccessListener(this, aVoid -> {
                    // 지오펜싱이 성공적으로 추가되면 메시지 출력
                    Toast.makeText(MainActivity.this, "지오펜싱 추가 성공", Toast.LENGTH_SHORT).show();
                })
                .addOnFailureListener(this, e -> {
                    // 지오펜싱 추가 실패 시 메시지 출력
                    // Toast.makeText(MainActivity.this, "지오펜싱 추가 실패", Toast.LENGTH_SHORT).show();
                    String errorMessage = "지오펜싱 추가 실패: " + e.getMessage(); // 에러 메시지 가져오기
                    Toast.makeText(MainActivity.this, errorMessage, Toast.LENGTH_SHORT).show(); // 에러 메시지 Toast로 표시
                    Log.e("Geofencing", "Geofence addition failed: " + e.getMessage(), e);

                });
        }
    }

    // 위치 권한 요청 결과를 처리하는 메서드
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0) {
                boolean locationPermissionGranted = grantResults[0] == PackageManager.PERMISSION_GRANTED;
                boolean backgroundLocationPermissionGranted = grantResults.length > 1 && grantResults[1] == PackageManager.PERMISSION_GRANTED;

                if (locationPermissionGranted && backgroundLocationPermissionGranted) {
                    addGeofences();
                    getCurrentLocation();
                } else {
                    Toast.makeText(this, "위치 권한이 필요합니다.", Toast.LENGTH_SHORT).show();
                }
            }
        }
    }
}