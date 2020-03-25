export class Room {
  room_id?: number;
  venue_id: number;
  room_name: string;
  room_capability: number;
  rate_for_day: number;
  other_details: string;
  space_request_id?: number;
  event_id: number;
  booking_status: string;
  occupancy: string;
  commercial_or_free: string;
  occupancy_date_from: string;
  occupancy_date_to: string;
}
