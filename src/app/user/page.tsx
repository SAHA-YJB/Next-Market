import getCurrentUser from '../actions/getCurrentUser';

const UserPage = async () => {
  // 그냥 쓰는방법getServerSession
  // const session = await getServerSession(authOptions);

  // 모듈화로 쓰는 방법
  const userData = await getCurrentUser();
  console.log('userData', userData);

  return <div>로그인 된 유저만 볼 수 있는 페이지</div>;
};

export default UserPage;
