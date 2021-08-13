const containerBox = document.querySelector("#containerBox"),
    contents = containerBox.querySelector("#contents"),
    list = contents.querySelector("#list"),
    inputList = document.querySelector(".inputlist"),
    listForm = inputList.querySelector("#listForm"),
    input = listForm.querySelector("input"); 
// 자바스크립트 주석방법 /*지정*/

const list_LS = "toDos"; /*const,var,let 재할당x*/
let toDos = []; /*지역변수 나머지 전역변수*/
function saveList(){
    localStorage.setItem(list_LS, JSON.stringify(toDos));
} /* 웹스토리지 데이터 저장경로, json를 반환*/

function deleteList(event){
    const btn = event.target; /*이벤트요소 반환*/
    const li = btn.parentNode; /*지우기 버튼을 클릭하면 글이 삭제되는 기능*/
    list.removeChild(li); /*자바스크립트; 문장 마무리*/ /*객체제거*/
    toDos = toDos.filter(function(toDo){  /*새로운 배열로 반환*/
        return toDo.id !== parseInt(li.id);
    });
    saveList();
}
/*to do id를 지정한 것을 넣어주는 함수*/
function showingList(text){
    const li = document.createElement("li");
    const div = document.createElement("div");
    const delbtn = document.createElement("button");
    const listNum = toDos.length+1;
/*변수를 지정. listNum todo 글을 첨부 함수*/
    div.innerText = text;
    delbtn.innerText = "지우기";

    delbtn.addEventListener("click", deleteList);
    list.appendChild(li);
    li.appendChild(div);
    li.appendChild(delbtn);
    li.id = listNum;
    const toDoObj = {
        text: text,
        id: listNum
    };
    toDos.push(toDoObj);
    saveList();
}
/*지우기 클릭하면 글이 삭제되는 함수*/
function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    showingList(currentValue);
    input.value = "";
}
/*이벤트함수*/
function loadList(){
    const loadedList = localStorage.getItem(list_LS);
    if(loadedList !== null){
        const parsedData = JSON.parse(loadedList);
        parsedData.forEach(function(toDo){
            showingList(toDo.text);
        });
    }
}
/*함수 로컬스토리지.getItem("키") : 이 키를 가진 값을 반환*/
function init(){
    loadList();
    listForm.addEventListener("submit", handleSubmit);
}
/*함수*/
init(); /*객체초기자*/