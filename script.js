function convert() {

  // 入力取得
  const input = document.getElementById("input").value;

  // 空チェック
  if (input.trim() === "") {
    alert("文章を入力してください");
    return;
  }

  // ローディング表示
  document.getElementById("loading").style.display = "block";

  // 少し待って変換っぽくする
  setTimeout(() => {

    // 変換前表示
    document.getElementById("before").innerText = input;

    // 簡易自然化
    let output = input;

    output = output.replaceAll("非常に", "かなり");
    output = output.replaceAll("利用する", "使う");
    output = output.replaceAll("することができます", "できます");

    // 変換後表示
    document.getElementById("output").innerText = output;

    // ローディング非表示
    document.getElementById("loading").style.display = "none";

    // コピーボタン表示
    document.getElementById("copyBtn").style.display = "inline-block";

  }, 500);
}

// コピー機能
function copyText() {

  const text = document.getElementById("output").innerText;

  navigator.clipboard.writeText(text);

  alert("コピーしました！");
}
