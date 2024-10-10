import {atom} from 'recoil';

import {LocationInfo, ReservationInfo} from '../interface/interface';

export const locationState = atom<LocationInfo | null>({
  key: 'locationState',
  default: null,
});

export const reservationInfoState = atom<ReservationInfo | null>({
  key: 'reservationInfo',
  default: null,
});
