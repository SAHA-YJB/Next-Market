export {default} from "next-auth/middleware"

//어드민으로 시작하는 모든 경로는 로그인이 되어야 가능 /:path*
//.env에서도 처리해야함
export const config = {matcher:["/admin/:path*", '/user']}