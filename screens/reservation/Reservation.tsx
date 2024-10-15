import React, {useState} from 'react';
import {Modal} from 'react-native';
import {Text} from '../../theme/theme';

import {useRecoilState} from 'recoil';
import {
  DateSelected,
  SelectCourse,
  SelectMemeberNum,
  SelectTime,
  userReservation,
} from '../../atom/atom';

import {useNavigate} from 'react-router-native';
import {UserReservationType} from '../../interface/interface';
import ReservationDate from '../../components/reservationComponent/ReservationDate';
import ReservationTeeTime from '../../components/reservationComponent/ReservationTeeTime';
import ReservationCourse from '../../components/reservationComponent/ReservationCourse';
import ReservationMember from '../../components/reservationComponent/ReservationMember';
import {
  AlarmView,
  MainView,
  ModalCenterView,
  ModalView,
  ReservationBTN,
  SectionView,
  TitleHeader,
} from '../../components/reservationComponent/ReservationStyle';
const Reservation = () => {
  const [selectedTime, setSelectedTime] = useRecoilState(SelectTime);
  const [selectedDate, setSelectedDate] = useRecoilState(DateSelected);
  const [reservationData, setReservationData] = useRecoilState(userReservation);
  const [memberNum, setMemberNum] = useRecoilState(SelectMemeberNum);
  const [isClick, setIsClick] = useState(false);
  const [selectCourse, setSelectCourse] = useRecoilState(SelectCourse);
  const navigate = useNavigate();

  console.log(reservationData);

  const handleReservationArray = ({
    date,
    course_info,
    tee_info,
    memberNum,
  }: UserReservationType) => {
    setIsClick(!isClick);
    setReservationData({
      date: date,
      course_info: course_info,
      tee_info: tee_info,
      memberNum: memberNum,
    });
  };

  return (
    <MainView>
      <TitleHeader>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>라운딩 예약하기</Text>
      </TitleHeader>
      <SectionView>
        <ReservationDate />
        <ReservationTeeTime />
        <ReservationCourse />
        <ReservationMember />
        <ReservationBTN
          activeOpacity={0.1}
          onPress={() =>
            handleReservationArray({
              date: selectedDate,
              course_info: selectCourse,
              tee_info: selectedTime,
              memberNum: memberNum,
              isCheck: false,
            })
          }>
          <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
            예약하기
          </Text>
        </ReservationBTN>

        <Modal
          transparent={true}
          visible={isClick}
          animationType="slide"
          onRequestClose={() => {
            setIsClick(false);
          }}>
          <ModalCenterView onPress={() => setIsClick(false)}>
            <ModalView
              onTouchStart={e => {
                e.stopPropagation(); // 모달 내부 클릭 시 이벤트 전파 방지
              }}
              style={{
                zIndex: 2,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              {selectedTime && memberNum !== 0 && selectCourse !== '' ? (
                <>
                  <Text>예약완료</Text>
                  <Text>
                    {selectedDate} , {selectedTime}
                  </Text>
                  <Text>코스명 : {selectCourse}</Text>
                  <Text>예약이 완료되었습니다.</Text>
                  <ReservationBTN
                    activeOpacity={0.1}
                    onPress={() => navigate('/')}>
                    <Text
                      style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
                      확인
                    </Text>
                  </ReservationBTN>
                </>
              ) : (
                <>
                  <AlarmView>
                    {!selectedTime && <Text>티타임을 선택해주세요.</Text>}
                    {memberNum === 0 && (
                      <Text>인원을 선택해주세요.(1명이상)</Text>
                    )}
                    {selectCourse === '' && <Text>코스를 선택해주세요.</Text>}
                  </AlarmView>
                  <ReservationBTN
                    activeOpacity={0.1}
                    onPress={() => setIsClick(false)}>
                    <Text
                      style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
                      확인
                    </Text>
                  </ReservationBTN>
                </>
              )}
            </ModalView>
          </ModalCenterView>
        </Modal>
      </SectionView>
    </MainView>
  );
};

export default Reservation;
