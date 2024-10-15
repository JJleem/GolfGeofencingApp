import {atom} from 'recoil';

import {
  LocationInfo,
  ReservationInfo,
  UserReservationType,
} from '../interface/interface';
const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식

export const locationState = atom<LocationInfo | null>({
  key: 'locationState',
  default: null,
});

export const reservationInfoState = atom<ReservationInfo | null>({
  key: 'reservationInfo',
  default: null,
});

export const ModalCalendar = atom({
  key: 'modalCalendar',
  default: false,
});

export const DateSelected = atom({
  key: 'selectedDate',
  default: today,
});
export const SelectTime = atom({
  key: 'SelectTeeTime',
  default: '',
});
export const SelectCourse = atom({
  key: 'selectCourse',
  default: '',
});
export const SelectMemeberNum = atom({
  key: 'selectMemberNum',
  default: 0,
});
export const userReservation = atom<UserReservationType | null>({
  key: 'userReservation',
  default: null,
});
