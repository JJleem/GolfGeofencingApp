// // 사용자가 지오펜스 영역에 진입하거나 이탈할 때 발생하는 이벤트를 처리
// // 이벤트수신, 오류처리,상태확인,사용자알림

// package com.mynewproject;

// import android.content.BroadcastReceiver; // 브로드캐스트 수신을 위한 클래스
// import android.content.Context; // 애플리케이션의 현재 상태를 나타내는 클래스
// import android.content.Intent; // 인텐트를 사용하여 컴포넌트를 시작하는 데 사용되는 클래스
// import android.util.Log; // 로그 기록을 위한 클래스
// import android.widget.Toast; // 사용자에게 메시지를 표시하기 위한 클래스

// import com.google.android.gms.location.Geofence; // Google Play Location API의 Geofence 클래스
// import com.google.android.gms.location.GeofencingEvent; // 지오펜싱 이벤트를 나타내는 클래스
// import com.google.android.gms.location.GeofenceStatusCodes; // 지오펜스 상태 코드를 정의하는 클래스

// import java.util.List; // List 인터페이스를 사용하여 여러 값을 저장할 수 있도록 함

// // BroadcastReceiver 는 안드로이드에서 브로드캐스트 메시지를 수신하고 처리하는 컴포넌트
// public class GeofenceBroadcastReceiver extends BroadcastReceiver {

//     @Override
//     public void onReceive(Context context, Intent intent) {
//         // 인텐트에서 지오펜싱 이벤트를 가져옴
//         // Context context, Intent intent 는 안드로이드 시스템에서 브로드캐스트를 수신할 때 자동으로 전달되는 매개변수
//         // 지오펜스 이벤트를 수신하고, 오류를 처리하는 메서드
//         GeofencingEvent geofencingEvent = GeofencingEvent.fromIntent(intent);

//         // 지오펜싱 이벤트에 오류가 있는지 확인
//         if (geofencingEvent.hasError()) {
//             // 오류가 발생한 경우, 오류 코드에 대한 메시지를 로그에 기록
//             // Log는 안드로이드에서 사용하는 console.log 같은 기능임
//             String errorMessage = GeofenceStatusCodes.getStatusCodeString(geofencingEvent.getErrorCode());
//             Log.e("GeofenceBR", errorMessage);
//             return; // 오류가 발생했으므로 메소드 종료
//         }

//         // 발생한 지오펜스 이벤트의 전환 유형을 가져옴
//         int geofenceTransition = geofencingEvent.getGeofenceTransition();

//         // 진입 또는 이탈 이벤트가 발생했는지 확인
//         if (geofenceTransition == Geofence.GEOFENCE_TRANSITION_ENTER ||
//             geofenceTransition == Geofence.GEOFENCE_TRANSITION_EXIT) {

//             // 트리거된 지오펜스를 가져옴. 하나의 이벤트에서 여러 지오펜스가 트리거될 수 있음
//             List<Geofence> triggeringGeofences = geofencingEvent.getTriggeringGeofences();

//             String transitionMsg; // 전환 메시지를 저장할 변수
//             // 전환 유형에 따라 메시지를 설정
//             if (geofenceTransition == Geofence.GEOFENCE_TRANSITION_ENTER) {
//                 transitionMsg = "Enter"; // 진입 시 메시지
//             } else if (geofenceTransition == Geofence.GEOFENCE_TRANSITION_EXIT) {
//                 transitionMsg = "Exit"; // 이탈 시 메시지
//             } else {
//                 transitionMsg = "-"; // 알 수 없는 전환
//             }

//             // 트리거된 각 지오펜스에 대해 토스트 메시지를 표시
//             // Toast = 안드로이드에서 짧은 기간 동안 사용자에게 메시지를 보여주기 위한 기능
//             for (Geofence geofence : triggeringGeofences) {
//                 Toast.makeText(context, geofence.getRequestId() + " - " + transitionMsg, Toast.LENGTH_LONG).show();
//             }

//         } else {
//             // 알 수 없는 전환 유형이 발생했을 때
//             Toast.makeText(context, "Unknown", Toast.LENGTH_LONG).show();
//         }
//     }
// }
