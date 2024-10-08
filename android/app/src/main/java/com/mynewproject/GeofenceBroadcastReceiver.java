// package com.mynewproject;

// import android.content.BroadcastReceiver;
// import android.content.Context;
// import android.content.Intent;
// import android.util.Log;
// import android.widget.Toast;
// import com.google.android.gms.location.Geofence;
// import com.google.android.gms.location.GeofencingEvent;
// import java.util.List;

// public class GeofenceBroadcastReceiver extends BroadcastReceiver {


// @Override
// public void onReceive(Context context, Intent intent) {
//     Log.d("Geofencing", "Received intent: " + intent);
//     // GeofencingEvent를 가져옵니다.
//     GeofencingEvent geofencingEvent = GeofencingEvent.fromIntent(intent);
    
//     // GeofencingEvent가 null인지 확인
//     if (geofencingEvent == null) {
//         Log.e("Geofencing", "GeofencingEvent is null");
//         return;
//     }

//     if (geofencingEvent.hasError()) {
//         String errorMessage = String.valueOf(geofencingEvent.getErrorCode());
//         Log.e("Geofencing", "Geofencing error: " + errorMessage);
//         return;
//     }

//     // 지오펜싱 트리거 타입 확인 (ENTER, EXIT 등)
//     int geofenceTransition = geofencingEvent.getGeofenceTransition();

//     // 지오펜싱이 ENTER 또는 EXIT일 경우에만 처리
//     if (geofenceTransition == Geofence.GEOFENCE_TRANSITION_ENTER ||
//         geofenceTransition == Geofence.GEOFENCE_TRANSITION_EXIT) {

//         // 트리거된 지오펜스들 가져오기
//         List<Geofence> triggeringGeofences = geofencingEvent.getTriggeringGeofences();

//         // 각 지오펜스에 대해 처리
//         for (Geofence geofence : triggeringGeofences) {
//             String requestId = geofence.getRequestId();

//             // 진입인지 이탈인지 확인 후 메시지 출력
//             if (geofenceTransition == Geofence.GEOFENCE_TRANSITION_ENTER) {
//                 Toast.makeText(context, "지오펜스 진입: " + requestId, Toast.LENGTH_LONG).show();
//                 Log.i("Geofencing", "지오펜스 진입: " + requestId);
//             } else if (geofenceTransition == Geofence.GEOFENCE_TRANSITION_EXIT) {
//                 Toast.makeText(context, "지오펜스 이탈: " + requestId, Toast.LENGTH_LONG).show();
//                 Log.i("Geofencing", "지오펜스 이탈: " + requestId);
//             }
//         }
//     } else {
//         Log.e("Geofencing", "잘못된 지오펜스 트리거");
//     }
// }

// }



package com.mynewproject;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;
import com.google.android.gms.location.GeofencingEvent;
import com.google.android.gms.location.Geofence;
import android.util.Log; // Log 클래스 추가

public class GeofenceBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent == null) {
            Log.e("GeofenceReceiver", "Received Intent is null");
            return;
        }

        // GeofencingEvent 생성
        GeofencingEvent geofencingEvent = GeofencingEvent.fromIntent(intent);

        if (geofencingEvent != null) {
            // 오류 코드 확인
            if (geofencingEvent.hasError()) {
                Log.e("GeofencingError", "GeofencingEvent에 오류가 있습니다: " + geofencingEvent.getErrorCode());
                return;
            } else {
                Log.d("GeofenceReceiver", "GeofencingEvent에 오류가 없습니다.");
            }

            int geofenceTransition = geofencingEvent.getGeofenceTransition();
            String geofenceRequestId = geofencingEvent.getTriggeringGeofences().get(0).getRequestId();

            // 진입 또는 이탈 이벤트 처리
            if (geofenceTransition == Geofence.GEOFENCE_TRANSITION_ENTER) {
                Log.d("GeofenceReceiver", "진입 이벤트 감지: " + geofenceRequestId);
                Toast.makeText(context, geofenceRequestId + "에 진입했습니다.", Toast.LENGTH_SHORT).show();
            } else if (geofenceTransition == Geofence.GEOFENCE_TRANSITION_EXIT) {
                Log.d("GeofenceReceiver", "이탈 이벤트 감지: " + geofenceRequestId);
                Toast.makeText(context, geofenceRequestId + "에서 이탈했습니다.", Toast.LENGTH_SHORT).show();
            } else {
                Log.e("GeofencingError", "알 수 없는 전환: " + geofenceTransition);
            }
        } else {
            Log.e("GeofenceReceiver", "Geofencing event is null");
        }
    }
}
