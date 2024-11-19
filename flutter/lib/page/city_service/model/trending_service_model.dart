import 'package:flutter/material.dart';
import 'package:town_pass/gen/assets.gen.dart';

abstract final class TrendingServiceModel {
  static List<TrendingService> get serviceList {
    return [
      TrendingService(
        title: '找地點',
        icon: Assets.svg.iconLocationSearch.svg(),
        url: 'https://taipei-pass-service.vercel.app/surrounding-service/',
      ),
      TrendingService(
        icon: Assets.svg.iconDashboardReports.svg(),
        title: '市民儀表板',
        url: 'https://dashboard.gov.taipei/',
      ),
      TrendingService(
        icon: Assets.svg.iconLocationSearch.svg(),
        title: '施工資訊',
        url: '',
      ),
      TrendingService(
        icon: Assets.svg.iconBloodDonation.svg(),
        title: '捐血福報',
        url:
            'https://bed2-2401-e180-8891-e41b-59d0-2e04-f04b-a81d.ngrok-free.app',
      ),
      // 在此列表後加入新熱門按鈕
      // add new trending service button here
    ];
  }
}

class TrendingService {
  final Widget icon;
  final String title;
  final String url;

  const TrendingService({
    required this.icon,
    required this.title,
    required this.url,
  });
}
