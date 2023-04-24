
function PickAPlace() {
  document.getElementById('pickAPlaceButton').setAttribute('disabled',true);
  a = 0
  const storeNodes = []
  document.querySelectorAll('[data-telemetry-id="store.name"]').forEach(node=> storeNodes.push(node.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode));
  const randomStoreIndex = Math.floor(Math.random() * storeNodes.length);
  const randomStore = storeNodes[randomStoreIndex];

  const spinner = document.createElement("ul");
  const spinnerOptions = document.createElement("div");
  spinnerOptions.id = "wheel";
  storeNodes.forEach((store, index) => {
    const storeRowLI = document.createElement("li");
    const storeRow = document.createElement("div");
    const storeRowWheelAttr = document.createAttribute("data-store-row-wheel");
    storeRowWheelAttr.value = `${index}`;
    storeRow.innerText = store.childNodes[1].childNodes[1].children[0].children[0].children[1].innerText
    storeRowLI.setAttributeNode(storeRowWheelAttr);
    storeRowLI.appendChild(storeRow)
    spinnerOptions.appendChild(storeRowLI)
  })

  spinner.appendChild(spinnerOptions);
  spinnerDot = document.createElement('div');
  const spinnerDotAttr = document.createAttribute("class");
  spinnerDotAttr.value = 'dot';
  spinnerDot.setAttributeNode(spinnerDotAttr);


  resultHeader = document.createElement('h2');
  const resultHeaderAttrs = document.createAttribute("id");
  resultHeaderAttrs.value = 'resultHeader';
  resultHeader.setAttributeNode(resultHeaderAttrs);

  spinnerOptions.appendChild(spinnerDot);
  spinnerOptions.appendChild(resultHeader);
  const body = document.getElementsByTagName('body')[0];
  body.insertBefore(spinner, body.firstChild);

  rows = document.querySelectorAll('[data-store-row-wheel]')
  rows.forEach((node, index) => {
    degreeRotation = (360/rows.length)*index
    node.style.transform = `translateY(-50%) rotate(${degreeRotation}deg) `
    const WIDTH = 300
    sectionHeight = Math.tan((180/rows.length)*(Math.PI/180))*WIDTH*2
    
    node.style.height = `${sectionHeight}px`
  });
  setTimeout( function() {
    resultHeader.innerText = randomStore.childNodes[1].childNodes[1].children[0].children[0].children[1].innerText;
    winnerSlice = document.querySelector(`[data-store-row-wheel='${randomStoreIndex}'`);
    winnerSlice.style.backgroundColor = 'gold';
    resultHeader.style.display = 'block';
  }, 4000)

  setTimeout( function() { randomStore.childNodes[0].click(); }, 5500);
}
var head  = document.getElementsByTagName('head')[0];
var style  = document.createElement('style');
style.innerText = "body {margin: 0;} .highlight {background-color: gold; position:absolute;} ul {list-style-type: none;} li {color:black;width: 300px;transform-origin: center right;position: absolute;right: 50%;top:50%;margin: auto;/* height: fit-content; */display: inline;clip-path: polygon(0% 0%, 100% 50%, 0% 100%);}li > div {position: absolute;top: 50%;left: 15px;transform: translateY(-50%);}.dot {background-color: black;width: 20px;height: 20px;border-radius: 50%;position: absolute;inset: 0;margin: auto;}#resultHeader {display: none; padding: 10px; background-color: #f7f7f7;width: fit-content;height: fit-content;border: 1px solid #e7e7e7; border-radius: 5px;position: absolute;inset: 0;margin: auto;}#wheel {z-index: 1000; border: 1px solid #e7e7e7; border-radius: 50%;position: fixed;inset: 0;margin: auto;/* -webkit-animation: rotating 2s linear infinite; */animation: rotate 4s ease-out;background-color: #f7f7f7;width: 620px;height: 620px;overflow: hidden;}@keyframes rotate{to{ transform: rotate(360deg); }}li:nth-child(3n) {background-color: lightblue;}li:nth-child(3n + 1) {width: calc('300px' + '10px'*n);background-color: lightgoldenrodyellow;}li:nth-child(3n + 2) {background-color: lightgreen;} .highlight {background-color: gold; position:absolute;}"
head.appendChild(style);

pickAPlaceButtonString = '<button id="pickAPlaceButton" shape="Pill" size="12" kind="BUTTON/PRIMARY" aria-pressed="false" type="button" class="styles__StyledButtonRoot-sc-1ldytso-0 hPKmJd"><span kind="BUTTON/PRIMARY" class="Inset__StyledInset-sc-1phi2ey-0 ipbHIR styles__ContentWrapper-sc-1ldytso-2 hasZAr"><span class="InlineChildren__StyledInlineChildren-sc-6r2tfo-0 gviwpu"><span class="styles__MainContentContainer-sc-1ldytso-3 qvNNS"><span overflow="truncate" display="block" class="styles__TextElement-sc-3qedjx-0 ciJJYj"><div class="InlineChildren__StyledInlineChildren-sc-6r2tfo-0 eDRbSc">Pick For Me</div></span></span></span></span></button>';
const pickAPlaceButton = document.createElement("div");
pickAPlaceButton.innerHTML = pickAPlaceButtonString;
pickAPlaceButton.firstChild.onclick = PickAPlace;
filtersRow = document.querySelector('[data-anchor-id="LegoHomePageFilter"]');
filtersRow.insertBefore(pickAPlaceButton,filtersRow.firstChild)
