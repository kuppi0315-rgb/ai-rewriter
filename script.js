function convert() {

  const inputElement = document.getElementById("input");
  const beforeElement = document.getElementById("before");
  const outputElement = document.getElementById("output");
  const loadingElement = document.getElementById("loading");
  const copyBtn = document.getElementById("copyBtn");

  const input = inputElement.value;

  // 空チェック
  if (input.trim() === "") {
    alert("文章を入力してください");
    return;
  }

  // ローディング表示
  loadingElement.style.display = "block";

  // 擬似変換
  setTimeout(function () {

    // 変換前
    beforeElement.innerText = input;

    // 簡易自然化
    let output = input;

    output = output.replace(/非常に/g, "かなり");
    output = output.replace(/利用する/g, "使う");
    output = output.replace(/することができます/g, "できます");

    // 変換後
    outputElement.innerText = output;

    // ローディング消す
    loadingElement.style.display = "none";

    // コピーボタン表示
    copyBtn.style.display = "inline-block";

  }, 500);
}

function copyText() {

  const text = document.getElementById("output").innerText;

  navigator.clipboard.writeText(text);

  alert("コピーしました！");
}
