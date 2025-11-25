import axios from 'axios'; //http요청을 보내기 위한 라이브러리
import { authStore } from '../store/authStore'; //인증상태(token)등을 관리하는 austand store

const api = axios.create({  //axios.create를 통해 기본 설저잉 적용된 axios 인스턴스를 생성
    headers :{
        'Content-Type': 'application/json' //생성된 인스턴스는 Content-Type을 항상 application/json로 설정
    }                                      //보통 JSON API서버에 요청할 때 사용
})

//요청을 보내기 직전에 실행된느 함수를 인터셉터로 등록
//모든 api요청은 이 인터셉터를 거쳐감
//리퀘스트 전에 인증토큰 있으면 헤더에 추가
api.interceptors.request.use(
    (config)=> {     //config는 요청정보를 담고 있음(url, method, headers 등)
        
        //zustand 를 호출할 때
        const token = authStore.getState().token;  //authStore는 zustand로 만든 인증상태 저장소
                                                    //컴포넌트 내부가 아니기 때문에, 직접 getState()로 상태를 가져옴
                                                    //가져온 상태값에서 token값을 가져옴

        if(token) { //만약 토큰이 존재한다면
            config.headers.Authorization = `Bearer ${token}`; //Authorization 헤더에 Bearer<token> 형태로 추가
                                                                //서버에서 이 토큰을 사용해서 사용자의 인증 상태를 검증
        }
        
        return config; //객체를 수정한 뒤 리턴해야 axios가 요청을 정상적으로 보냄
    }
);

//응답 지연 방지
let isRefreshing= false;

//응답내용을 가로채기
api.interceptors.response.use(
    (response) => response,
        async (error) =>{
            const {response, config} = error;
            console.log(response)
            if(response?.status === 401){
                console.log("로그인 실패");

                //로그인 실패 시 기존 localstorage삭제
                authStore.getState().clearAuth();
                return Promise.reject(error);
            }

            if(response?.status === 406 &&!config._retry){

                if(!isRefreshing){
                    isRefreshing = true;
                    config._retry = true; //무한 방지 플래그
                }
                try{
                    
                    const res = await axios.get('/api/v1/refresh',{withCredentials : true});
                    authStore.getState().setLogin(res.data.content);

                    const token = authStore.getState().token;
                    config.headers.Authorization = `Bearer ${token}`;
                    return api(config);

                }catch(error){
                    console.log('실패');
                    //refresh실패
                    alert('유효하지 않은 토큰입니다. 다시 로그인하세요.');
                    authStore.getState().clearAuth();
                    location.href='/login';

                }finally{
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    
);


export default api;