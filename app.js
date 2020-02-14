/* 
- canvas의 속성값 -
clientX, Y : 윈도우 전체의 범위 내에서 마우스 위치값을 나타내는 것
path는 선이다.
*/

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;


//canvas 사이즈를 지정해줘야 한다. 조작할 부분의 크기를 알려주려고
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 처음 하얀 배경을 저장하면 배경이 투명해서 초기화하는 것
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR; // 색상이나 스타일을 라인에 사용할 수 있음
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // 라인의 두께
//ctx.fillStyle = "green";
//ctx.fillRect(50,60,70,80); // x, y, 가로길이, 세로길이 : x, y는 시작점 // 그리는 게 마지막



let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath(); //선을 만들기 시작(보이지는 않음)
        ctx.moveTo(x, y); //선이 시작될 좌표를 설정
    } else {
        ctx.lineTo(x, y); // 선이 끝나는 좌표를 설정. 연속적으로 사용할 시, 시작 위치는 이전 선의 좌표로 자동 설정됨.
        ctx.stroke(); // 선을 긋는다.
        //ctx.closePath(); // 시작점을 고정시킨다.
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }  
}

function handleCM(event) {
    event.preventDefault(); // 캔버스 안에서 오른쪽 클릭 메뉴가 안 나오도록 하는 것
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image; // 이미지 링크 설정
    link.download = "PaintJS[EXPORT]"; // 다운로드 이미지 이름
    link.click();
}
if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove); // 캔버스 움직일 때 정보제공
    canvas.addEventListener("mousedown", startPainting); // 캔버스에 마우스를 클릭했을 때 발생하는 이벤트
    canvas.addEventListener("mouseup", stopPainting); // 마우스 클릭을 끝낼 때(그림 그리기 종료)
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

// foreach 안에 있는 color라는 이름은 각각의 아이템들의 명칭을 임의로 지정해 준 것일 뿐으로 "potato"같이 아무이름이나 지정해도 됨
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range) {
    range.addEventListener("input", handleRangeChange); // range는 input에 반응함
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}