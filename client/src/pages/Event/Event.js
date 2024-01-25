import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config/contansts';
import './Event.scss';
import Pagination from '../../components/Pagination/Pagination.js';

const Event = () => {

  const [events, setEvents] = useState([]); //받아온 이벤트 데이터들
  const [endEvent_id, setEndEvent_id] = useState(0); //DB 다음 데이터 조회할때 어디서부터 읽을지 기준 값
  const [startEvent_id, setStartEvent_id] = useState(0); //DB 이전 데이터 조회할때 어디서부터 읽을지 기준 값
  const [data_limit, setData_limit] = useState(4); //DB조회할때 몇개 읽어 올지 값
  const [limit, setLimit] = useState(2); //한페이지에 몇개 보여줄지 값
  const [page, setPage] = useState(1); //현재 페이지
  const [lastPage, setLastPage] = useState(); //마지막 페이지인지 bool값(다음 버튼 표시용)
  const offset = (page - 1) * limit; // 데이터 시작 번호

  const getEvents = async (PreviousOrNext) => {
    const endPoint = 
      PreviousOrNext && PreviousOrNext=='DESC' ? 
          `?event_id=${startEvent_id}&event_limit=${data_limit}&orderBy=DESC` 
        : 
          `?event_id=${endEvent_id}&event_limit=${data_limit}&orderBy=ASC`
      ;

    const res = await axios.get(`${API_URL}/api/event/page${endPoint}`);
    console.log("불러온 이벤트: ", res.data);
    console.log("불러온 이벤트 개수: ", res.data.result.length);
    // console.log(res.data[res.data.length-1].event_id);
    
    if(res.data.result.length > 0) {
      setEvents(res.data.result);
      setEndEvent_id(res.data.result[res.data.result.length-1].event_id); 
      setStartEvent_id(res.data.result[0].event_id); 
      setLastPage(res.data.lastPage);
    }
    
  }

  useEffect(()=> {
    getEvents();
  },[]);


  // const currentPageEvents = 

  return (
    <div className='event-container-kjh'>
      <h1>이벤트 페이지</h1>
      <div className='event-content-kjh'>
        {events.slice(offset, offset + limit).map((event, index) => (
          <div key={index} className='event-kjh'>
            <div>
              <NavLink to={'/event/'+event.event_id} className='event-img-button-kjh'>
                <img src={API_URL + event.event_img_url} alt="" />
              </NavLink>
            </div>
            <div>
              <NavLink to={'/event/'+event.event_id}>
                <h3 key={index}>{event.event_title}</h3>
              </NavLink>
              <div className='event-date-kjh'>
                <div className='event-date-content-kjh'>
                  <span>기간:&nbsp;</span>
                  <p>{event.event_start_date}{event.event_end_date && ' ~ '+event.event_end_date}</p>
                </div>
                <div className='event-date-content-kjh'>
                  <span>모집정원:&nbsp;</span>
                  <p>{event.event_max_applicants}명</p>
                </div>
                {/* <p>상태: {event.event_status}</p> */}
                {event.event_status == "expired" ? <div className='event-status-kjh false'>마감</div> : <div className='event-status-kjh true'>모집중</div>}
              </div>
            </div>
            <p className='read-count-kjh'>조회수: {event.read_count}</p>
          </div>
        ))} 
      </div>
      <div>
        <Pagination 
          total={events.length}
          limit={limit}
          page={page}
          setPage={setPage}
          getData={getEvents}
          lastPage={lastPage}
          data_limit={data_limit}
        />
      </div>
    </div>
  );
};

export default Event;