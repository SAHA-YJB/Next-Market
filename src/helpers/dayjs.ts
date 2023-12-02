// 모듈화
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';

// 플러그인 사용
dayjs.extend(relativeTime);
dayjs.locale('ko');

export function fromNow(time: Date | string) {
  return dayjs(time).fromNow();
}
// A = 오전인지 오후인지 표시
export function formatTime(time: Date | string, format = 'YYYY.MM.DD h:mm A') {
  return dayjs(time).format(format);
}
