import 'package:town_pass/gen/assets.gen.dart';
import 'package:town_pass/service/account_service.dart';
import 'package:town_pass/service/device_service.dart';
import 'package:town_pass/service/geo_locator_service.dart';
import 'package:town_pass/service/package_service.dart';
import 'package:town_pass/util/tp_colors.dart';
import 'package:town_pass/util/tp_route.dart';
import 'package:town_pass/service/shared_preferences_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:get/get.dart';

import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:timezone/data/latest.dart' as tz;
import 'package:timezone/timezone.dart' as tz;

final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
    FlutterLocalNotificationsPlugin();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // FlutterNativeSplash.preserve(
  //   widgetsBinding: WidgetsFlutterBinding.ensureInitialized(),
  // );

  await initServices();

  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
    ),
  );

  runApp(const MyApp());
}

Future<void> initServices() async {
  // Initialize notification service
  await initNotificationService();

  await Get.putAsync<AccountService>(() async => await AccountService().init());
  await Get.putAsync<DeviceService>(() async => await DeviceService().init());
  await Get.putAsync<PackageService>(() async => await PackageService().init());
  await Get.putAsync<SharedPreferencesService>(
      () async => await SharedPreferencesService().init());
  await Get.putAsync<GeoLocatorService>(
      () async => await GeoLocatorService().init());

  // Schedule the daily notification at 8:00 AM
  await scheduleDailyNotification();
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'City Pass',
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: TPColors.grayscale50,
        bottomNavigationBarTheme: const BottomNavigationBarThemeData(
          backgroundColor: TPColors.white,
        ),
        colorScheme: ColorScheme.fromSeed(seedColor: TPColors.primary500),
        appBarTheme: const AppBarTheme(
          centerTitle: true,
          elevation: 0.0,
          iconTheme: IconThemeData(size: 56),
          actionsIconTheme: IconThemeData(size: 56),
        ),
        actionIconTheme: ActionIconThemeData(
          backButtonIconBuilder: (_) =>
              Assets.svg.iconLeftArrow.svg(width: 24, height: 24),
        ),
      ),
      debugShowCheckedModeBanner: false,
      initialRoute: TPRoute.holder,
      getPages: TPRoute.page,
    );
  }
}

Future<void> initNotificationService() async {
  const AndroidInitializationSettings initializationSettingsAndroid =
      AndroidInitializationSettings('app_icon');

  final DarwinInitializationSettings initializationSettingsIOS =
      DarwinInitializationSettings(
    onDidReceiveLocalNotification: (id, title, body, payload) async {
      // Handle notification tapped when app is in foreground
      // log payload

      print('!!!onDidReceiveLocalNotification');
    },
  );

  final InitializationSettings initializationSettings = InitializationSettings(
    android: initializationSettingsAndroid,
    iOS: initializationSettingsIOS,
  );

  await flutterLocalNotificationsPlugin.initialize(initializationSettings);
  tz.initializeTimeZones();
  // flutterLocalNotificationsPlugin.initialize(initializationSettings,
  // onDidReceiveNotificationResponse: onDidReceiveNotificationResponse);
}

Future<void> scheduleDailyNotification() async {
  await flutterLocalNotificationsPlugin.zonedSchedule(
    0,
    '捐血救人，愛心接力！',
    '距離您上次捐血已超過 2 個月，現在可以再次捐血了！附近就有捐血站，快來一起貢獻一份愛心吧！',
    _nextInstanceIn5Seconds(),
    const NotificationDetails(
      android: AndroidNotificationDetails(
          'your_channel_id', 'your_channel_name',
          importance: Importance.max, priority: Priority.high),
      iOS: DarwinNotificationDetails(
          presentAlert: true,
          presentBadge: true,
          presentSound: true,
          sound: 'sound.aiff',
          badgeNumber: 1,
          attachments: [],
          threadIdentifier: 'thread_id',
          categoryIdentifier: "category_id",
          interruptionLevel: InterruptionLevel.active),
    ),
    uiLocalNotificationDateInterpretation:
        UILocalNotificationDateInterpretation.wallClockTime,
    matchDateTimeComponents: DateTimeComponents.time,
  );
}

// tz.TZDateTime _nextInstanceOf8AM() {
//   final tz.TZDateTime now = tz.TZDateTime.now(tz.local);
//   tz.TZDateTime scheduledDate =
//       tz.TZDateTime(tz.local, now.year, now.month, now.day, 21, 15);
//   if (scheduledDate.isBefore(now)) {
//     scheduledDate = scheduledDate.add(const Duration(days: 1));
//   }
//   return scheduledDate;
// }

tz.TZDateTime _nextInstanceIn5Seconds() {
  final tz.TZDateTime now = tz.TZDateTime.now(tz.local);
  // 加上 5 秒
  final tz.TZDateTime scheduledDate = now.add(const Duration(seconds: 5));
  return scheduledDate;
}

//  void onDidReceiveLocalNotification(
//      int id, String? title, String? body, String? payload) async {
//    // display a dialog with the notification details, tap ok to go to another page
//    showDialog(
//      context: context,
//      builder: (BuildContext context) => CupertinoAlertDialog(
//        title: Text(title ?? ''),
//        content: Text(body ?? ''),
//      ),
//    );
//  }