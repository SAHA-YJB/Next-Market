// 모듈화
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

// 플러그인 사용
dayjs.extend(relativeTime);
dayjs.locale('ko');

export function fromNow(time: Date | string) {
  return dayjs(time).fromNow();
}

export function format(time: Date | string, format = 'YYYY.MM.DD h:mm A') {
  return dayjs(time).format(format);
}
