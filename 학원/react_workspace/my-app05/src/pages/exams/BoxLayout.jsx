import React, { useState } from 'react';
import ButtonComp from './ButtonComp';
import BoxList from './BoxList';

function BoxLayout(props) {

    const [boxList, setBoxList]=useState([]);

    const addBox =() => {
        const color =makeColor();
        const box = {
            bgColor :color
        }

        const newBoxList = [...boxList, box];
        setBoxList(newBoxList);
        // 아래와 같은 방식으로도 사용가능
        // setBoxList((prev) => [...prev, box]);

    }
    const delBox=()=>{
        boxList.pop();
        const newBoxList = [...boxList];
        setBoxList(newBoxList);
    }

    function makeColor(){
        const colors=[];
        colors.push('#');
        for(let i=0; i<3; i++){
            let color = Math.floor(Math.random()*256).toString(16);
            if(color.length === 1){
                color = '0'+color;

            }
            colors.push(color);

        }
        return colors.join('');
    }

    return (
        <div>
            <BoxList boxList={boxList}/>
            <ButtonComp addBox={addBox} delBox={delBox}/>
        </div>
    );
}


    

export default BoxLayout;