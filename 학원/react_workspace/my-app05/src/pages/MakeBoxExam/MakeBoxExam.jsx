import React, { useState } from 'react';
import styled from 'styled-components';

const Box= styled.div`
    width :${(props)=>props.$width?`${props.$width}px`: '0px'};
    height :${(props)=>props.$height?`${props.$height}px`: '0px'};
    background-color : ${(props) => props.$color || 'white'};
`

function MakeBoxExam(props) {

    const[data, setData] =useState({width:'',height:'',color:''});
    const [boxData, setboxData]=useState(null);
    
    const handleInput=(e)=>{
        const{id, value}=e.target;
        if(boxData !==null) setboxData(null);
        setData((prev)=>({...prev,[id]:value}));
    }
    
    const makeBoxEvnt =(e)=>{
        e.preventDefault();
        if(!data.width||!data.height||!data.color){
            alert('값을 정확하게 입력하십시오');
            return false;
        }
        setboxData({width:data.width,height:data.height, color:data.color});
    }
    
    return (
        <div>
            <div>
                <label htmlFor="width">넓이 : </label>
                <input type="text" id='width' onChange={handleInput}/>
                <label htmlFor="height">높이 : </label>
                <input type="text" id='height'onChange={handleInput} />
                <label htmlFor="color">색상 : </label>
                <input type="text" id='color'onChange={handleInput} onKeyDown={(e)=>{
                    if(e.key === 'Enter'){
                        makeBoxEvnt(e);
                    }
                }}/>
            </div>
            <div>
                <button type='button'onClick={makeBoxEvnt}>생성</button>
            </div>
            <div>
                결과 :{boxData &&
                 <Box $width={boxData.width}
                 $height={boxData.height}
                 $color={boxData.color}/>
                }
            </div>
        </div>
    );
}

export default MakeBoxExam;