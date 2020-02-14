/* 
- canvas�� �Ӽ��� -
clientX, Y : ������ ��ü�� ���� ������ ���콺 ��ġ���� ��Ÿ���� ��
path�� ���̴�.
*/

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;


//canvas ����� ��������� �Ѵ�. ������ �κ��� ũ�⸦ �˷��ַ���
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// ó�� �Ͼ� ����� �����ϸ� ����� �����ؼ� �ʱ�ȭ�ϴ� ��
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR; // �����̳� ��Ÿ���� ���ο� ����� �� ����
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // ������ �β�
//ctx.fillStyle = "green";
//ctx.fillRect(50,60,70,80); // x, y, ���α���, ���α��� : x, y�� ������ // �׸��� �� ������



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
        ctx.beginPath(); //���� ����� ����(�������� ����)
        ctx.moveTo(x, y); //���� ���۵� ��ǥ�� ����
    } else {
        ctx.lineTo(x, y); // ���� ������ ��ǥ�� ����. ���������� ����� ��, ���� ��ġ�� ���� ���� ��ǥ�� �ڵ� ������.
        ctx.stroke(); // ���� �ߴ´�.
        //ctx.closePath(); // �������� ������Ų��.
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
    event.preventDefault(); // ĵ���� �ȿ��� ������ Ŭ�� �޴��� �� �������� �ϴ� ��
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image; // �̹��� ��ũ ����
    link.download = "PaintJS[EXPORT]"; // �ٿ�ε� �̹��� �̸�
    link.click();
}
if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove); // ĵ���� ������ �� ��������
    canvas.addEventListener("mousedown", startPainting); // ĵ������ ���콺�� Ŭ������ �� �߻��ϴ� �̺�Ʈ
    canvas.addEventListener("mouseup", stopPainting); // ���콺 Ŭ���� ���� ��(�׸� �׸��� ����)
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

// foreach �ȿ� �ִ� color��� �̸��� ������ �����۵��� ��Ī�� ���Ƿ� ������ �� ���� ������ "potato"���� �ƹ��̸��̳� �����ص� ��
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range) {
    range.addEventListener("input", handleRangeChange); // range�� input�� ������
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}