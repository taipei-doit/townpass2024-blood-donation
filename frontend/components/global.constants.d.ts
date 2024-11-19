declare var ga: UniversalAnalytics.ga;

declare interface Window {
    dataLayer: object[];
    ga?: UniversalAnalytics.ga;
}