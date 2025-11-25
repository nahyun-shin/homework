import React from 'react';
import styled from 'styled-components';
import Box from './Box';

    const Main = styled.main`
      display  :flex ;
      flex-direction: row;
      gap: 10px;
      overflow: auto;
      width: 600px;
      height: 400px;
      flex-wrap: wrap;
      border: 1px solid black;
      border-radius: 4px;
      align-content: start;
    `;
function BoxList({boxList}) {


    return (
        <>
            <Main>
                {
                    boxList?.map((obj, index)=>(
                        <Box key={index} bgColor= {obj.bgColor}></Box>
                    ))
                }
            </Main>
        </>
    );
}

export default BoxList;