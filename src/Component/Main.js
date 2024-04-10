import React, { useEffect } from 'react';
import swal from 'sweetalert';

const Main = () => {
    let times=0;
    var pre_ans=[];
    localStorage.setItem("pre_ans",JSON.stringify(pre_ans))
    useEffect(()=>{
        setTimeout(() => {
            const element = document.getElementById("grettings");
            element.innerText = ""
            const alert = document.getElementById("alert");
            swal("Are you ready to conduct the experiment? If Yes, then press the 'Start' button", {
                buttons: {
                  cancel: "Cancel",
                  Start: "Start",
                },
              })
              .then((value) => {
                switch (value) {
                  case "Start":
                    startprocess();
                    break;
                  default:
                    swal("Got away safely!");
                }
              });
        }, 1000);
    },[])

    function getRandomUppercaseChar() {
        var r = Math.floor(Math.random() * 26);
        return String.fromCharCode(65 + r);
    }
    
    function randomIntFromInterval(min,max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
    const change_character=()=>{
        const element = document.getElementById("grettings");
        var i=0;
        var j=randomIntFromInterval(4,6);
        var k=0;
        var flag=0;
        var answer="";
        var answer_color=""
        const process_real=setInterval(() => {
            if(i==j){
                if(k<2){
                    element.style.color="white"
                }
                j=randomIntFromInterval(4,6);
                i=0;
                k++;
                if(k==2){
                    answer_color=randomIntFromInterval(0,3)==0?"red":randomIntFromInterval(0,3)==1?"green":randomIntFromInterval(0,3)==2?"yellow":"blue";
                    element.style.color=answer_color
                    element.innerText=randomIntFromInterval(0,9);
                    answer=element.innerText;
                    flag=1;
                }
            }
            else{
                element.style.color="black";
            }
            if(flag==0){
                element.innerText=getRandomUppercaseChar();
            }
            else{
                flag=0;
            }
            if(k==3){
                stop_process(answer,answer_color);
            }
            i++
        }, 160);


        const stop_process=(ans,ans_color)=>
        {
            var answer=parseInt(ans)
            clearInterval(process_real);
            const element= document.getElementById("grettings");
            var position=randomIntFromInterval(1,4)
            element.style.fontSize="15px"
            element.style.textAlign="left"
            element.innerHTML=`Which digit was presented in the task? <br/> 
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="ques1" id="flexRadioDefault1" value=${position==1?answer:(answer>5?answer-2:answer+3)} >
                                    <label class="form-check-label" for="flexRadioDefault1">
                                    ${(position==1)?answer:(answer>5?answer-2:answer+3)}
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="ques1" id="flexRadioDefault2" value=${position==2?answer:(answer>5?answer-4:answer+6)} >
                                    <label class="form-check-label" for="flexRadioDefault2">
                                    ${position==2?answer:(answer>5?answer-4:answer+6)}
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="ques1" id="flexRadioDefault3" value=${position==3?answer:(answer>5?answer-1:answer+3)} >
                                    <label class="form-check-label" for="flexRadioDefault2">
                                    ${position==3?answer:(answer>5?answer-1:answer+3)}
                                    </label>
                                </div>
                                
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="ques1" id="flexRadioDefault4" value=${position==4?answer:(answer>5?answer-3:answer+2)} >
                                    <label class="form-check-label" for="flexRadioDefault2">
                                    ${position==4?answer:(answer>5?answer-3:answer+2)}
                                    </label>
                                </div>
                                <br/>
                                <button id="next_ques"> next question <button>`

           
            document.getElementById("next_ques").onclick=()=>{
                nextQuestion(ans_color,answer)
            }
        }
    }
    const store_answer=(answer,ans_color,given_answer)=>{
        var given_ans_color="";
        var ele = document.getElementsByName('ques2');

        for (var i = 0; i < ele.length; i++) {
            if (ele[i].checked)
                given_ans_color= ele[i].value;
        }
        pre_ans=JSON.parse(localStorage.getItem("pre_ans"))
        // console.log(pre_ans);
        var current_ans={answer,ans_color,given_answer,given_ans_color}
        pre_ans.push(current_ans)
        localStorage.setItem('pre_ans',JSON.stringify(pre_ans));
        
        if(times<30){
            startprocess();
        }
        else{
            downloadFile(pre_ans);
        }
        times++;
    }
    const downloadFile=pre_ans=>{
        var XLSX = require('xlsx');
        const worksheet = XLSX.utils.json_to_sheet(pre_ans);    
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "result");
        XLSX.writeFile(workbook, "Results.xlsx", { compression: true });

    }
    
    const nextQuestion=(ans_color,answer)=>{
        var given_answer="";
        var ele = document.getElementsByName('ques1');

        for (var i = 0; i < ele.length; i++) {
            if (ele[i].checked)
                given_answer= ele[i].value;
        }
        
        // console.log(given_answer,ans_color,answer);
        
        const element= document.getElementById("grettings");
        element.innerHTML=`Which colour the digit was-<br/> 
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="ques2" id="flexRadioDefault1" value="Red" >
                                <label class="form-check-label" for="flexRadioDefault1">Red</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="ques2" id="flexRadioDefault2" value="Green">
                                <label class="form-check-label" for="flexRadioDefault2">
                                Green
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="ques2" id="flexRadioDefault3" value="Blue">
                                <label class="form-check-label" for="flexRadioDefault2">
                                Blue
                                </label>
                            </div>
                            
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="ques2" id="flexRadioDefault4" value="Yellow">
                                <label class="form-check-label" for="flexRadioDefault2">
                                Yellow
                                </label>
                            </div>
                            <br/>
                            <button id="save"> Submit <button>`
            document.getElementById('save').onclick=()=>store_answer(answer,ans_color,given_answer)               
                
    }
    
    const startprocess=()=>{
        const element = document.getElementById("grettings");
        element.innerText="+"                                   // + sign and create image box 
        element.style.width="400px";    
        element.style.height="400px";
        element.style.background="gray";
        element.style.margin="140px 0px 0px 550px";
        element.style.padding="150px 30px";
        element.style.fontSize="38px";
        element.style.textAlign="center";
        setTimeout(() => {
            change_character()                                  // change the character    
        }, 500);
    }
    
    return (
        <div>
            <div id="board">
                <div id="grettings" style = {{"marginTop":"40vh","fontSize":"38px"}}>Welcome to the experiment</div>
                
            </div>
        </div>
    );
};

export default Main;