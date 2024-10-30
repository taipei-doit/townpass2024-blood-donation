export interface Content {
    pages:    PageProps[];
    sections: Sections;
}

export type Donationcenters = {
    "center_id": number; // 1
    "name": string; // "Central Blood Donation Center",
    "type": "center" | "mobile";
    "address": string; // "123 Main St, Taipei",
    "latitude": number;
    "longitude": number;
    "open_hours": string; // 營業時間
    "start_time": string; // 捐血車起始期間
    "end_time": string; // 捐血車結束期間
    "phone_number": string; // 聯絡電話
    "info": string; // 捐血禮品
}